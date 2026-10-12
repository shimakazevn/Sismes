/**
 * HOME - Web Audio Engine & Steganography Audio Decoder
 * =======================================================
 * - Web Audio Autoplay Unlocker
 * - Bit-Exact Stego PNG Decoder (Giải mã nhị phân trực tiếp, không biến dạng byte)
 * - Multi-Channel Audio Mixer & Anti-Pop Declick Envelope (0ms độ trễ)
 */

(function() {
    'use strict';

    let audioCtx = null;
    let isUnlocked = false;
    const audioBufferCache = new Map();
    const audioPromiseCache = new Map();

    let activeBgmSource = null;
    let activeBgmGainNode = null;
    let lastBgmScenarioVol = 0.8;
    const activeSeMap = new Map(); // bufIdx -> { source, gainNode, isVoice, numVol }
    const MASTER_BGM_SCALE = 0.65;
    const MASTER_SE_SCALE = 0.85;

    // ─── Toàn cục Multipliers (Đồng bộ vĩnh viễn trên toàn hệ thống) ──────────
    let globalBgmMultiplier = 0.8;
    let globalSeMultiplier = 0.8;
    let globalVoiceMultiplier = 0.8;

    try {
        const savedAudioCfg = JSON.parse(localStorage.getItem('home_audio_global_cfg') || '{}');
        if (savedAudioCfg.bgm !== undefined) globalBgmMultiplier = Math.max(0, Math.min(100, parseFloat(savedAudioCfg.bgm))) / 100.0;
        if (savedAudioCfg.se !== undefined) globalSeMultiplier = Math.max(0, Math.min(100, parseFloat(savedAudioCfg.se))) / 100.0;
        if (savedAudioCfg.voice !== undefined) globalVoiceMultiplier = Math.max(0, Math.min(100, parseFloat(savedAudioCfg.voice))) / 100.0;
    } catch(e) {}

    function isVoiceAudio(urlOrStorage) {
        if (!urlOrStorage || typeof urlOrStorage !== 'string') return false;
        const s = urlOrStorage.toLowerCase();
        return s.includes('/voice') || s.includes('voice_') || 
               s.includes('/tubomi/') || s.includes('/nagi/') || s.includes('/rinko/') ||
               s.startsWith('tubomi/') || s.startsWith('nagi/') || s.startsWith('rinko/') ||
               s.startsWith('voice/');
    }

    function getAudioContext() {
        if (!audioCtx || audioCtx.state === 'closed') {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
                if (window.Howler) Howler.ctx = audioCtx;
            }
        }
        return audioCtx;
    }

    let currentBgmInfo = null;

    function unlockAudioContext() {
        const ctx = getAudioContext();
        if (!ctx) return;
        if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
            ctx.resume().then(() => {
                isUnlocked = true;
                if (currentBgmInfo && (!activeBgmSource || ctx.state === 'interrupted')) {
                    if (!document.hidden) {
                        playBGM(currentBgmInfo.url, currentBgmInfo.loop, currentBgmInfo.rawVol, currentBgmInfo.buf);
                    }
                }
            }).catch(() => {});
        } else if (ctx.state === 'running') {
            isUnlocked = true;
        }
    }

    // ─── Lifecycle & Gesture Listeners ─────────────────────────────────────────
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            unlockAudioContext();
        }
    });
    window.addEventListener('pageshow', () => {
        unlockAudioContext();
    });
    window.addEventListener('focus', () => {
        unlockAudioContext();
    });
    ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'].forEach(evt => {
        window.addEventListener(evt, unlockAudioContext, { passive: true });
    });

    // ─── Giải mã Bit-Exact Pure JS PNG Stego ──────────────────────────────────
    async function extractStegoAudioBytes(arrayBuffer) {
        const buf = new Uint8Array(arrayBuffer);
        let offset = 8;
        const idatParts = [];
        let width = 0, height = 0;

        while (offset < buf.length) {
            const view = new DataView(buf.buffer, buf.byteOffset + offset, 8);
            const len = view.getUint32(0);
            const type = String.fromCharCode(buf[offset + 4], buf[offset + 5], buf[offset + 6], buf[offset + 7]);
            if (type === 'IHDR') {
                const ihdrView = new DataView(buf.buffer, buf.byteOffset + offset + 8, 8);
                width = ihdrView.getUint32(0);
                height = ihdrView.getUint32(4);
            } else if (type === 'IDAT') {
                idatParts.push(buf.subarray(offset + 8, offset + 8 + len));
            }
            offset += 8 + len + 4;
        }

        if (idatParts.length === 0 || width === 0 || height === 0) {
            throw new Error('Invalid PNG chunks in Stego Audio');
        }

        let totalLen = 0;
        for (let i = 0; i < idatParts.length; i++) totalLen += idatParts[i].length;
        const idat = new Uint8Array(totalLen);
        let p = 0;
        for (let i = 0; i < idatParts.length; i++) {
            idat.set(idatParts[i], p);
            p += idatParts[i].length;
        }

        // Decompress raw deflate payload
        const rawDeflate = idat.subarray(2, idat.length - 4);
        const ds = new DecompressionStream('deflate-raw');
        const writer = ds.writable.getWriter();
        writer.write(rawDeflate);
        writer.close();

        const reader = ds.readable.getReader();
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
        }

        let decLen = 0;
        for (let i = 0; i < chunks.length; i++) decLen += chunks[i].length;
        const decompressed = new Uint8Array(decLen);
        p = 0;
        for (let i = 0; i < chunks.length; i++) {
            decompressed.set(chunks[i], p);
            p += chunks[i].length;
        }

        const stride = width * 3;
        const rawPixels = new Uint8Array(width * height * 3);
        let prevRow = new Uint8Array(stride);

        function paeth(a, b, c) {
            const pa = Math.abs(b - c);
            const pb = Math.abs(a - c);
            const pc = Math.abs(a + b - 2 * c);
            if (pa <= pb && pa <= pc) return a;
            if (pb <= pc) return b;
            return c;
        }

        let srcPos = 0;
        let dstPos = 0;
        for (let y = 0; y < height; y++) {
            const filter = decompressed[srcPos++];
            const row = rawPixels.subarray(dstPos, dstPos + stride);

            if (filter === 0) { // None
                for (let x = 0; x < stride; x++) row[x] = decompressed[srcPos++];
            } else if (filter === 1) { // Sub
                for (let x = 0; x < stride; x++) {
                    const left = (x >= 3) ? row[x - 3] : 0;
                    row[x] = (decompressed[srcPos++] + left) & 0xff;
                }
            } else if (filter === 2) { // Up
                for (let x = 0; x < stride; x++) {
                    const up = prevRow[x];
                    row[x] = (decompressed[srcPos++] + up) & 0xff;
                }
            } else if (filter === 3) { // Average
                for (let x = 0; x < stride; x++) {
                    const left = (x >= 3) ? row[x - 3] : 0;
                    const up = prevRow[x];
                    row[x] = (decompressed[srcPos++] + Math.floor((left + up) / 2)) & 0xff;
                }
            } else if (filter === 4) { // Paeth
                for (let x = 0; x < stride; x++) {
                    const left = (x >= 3) ? row[x - 3] : 0;
                    const up = prevRow[x];
                    const upLeft = (x >= 3) ? prevRow[x - 3] : 0;
                    row[x] = (decompressed[srcPos++] + paeth(left, up, upLeft)) & 0xff;
                }
            }
            prevRow.set(row);
            dstPos += stride;
        }

        // 12-byte header: [0..3] magic b'AUDO', [4..7] dataLength (uint32 big-endian), [8..11] reserved
        const magic = String.fromCharCode(rawPixels[0], rawPixels[1], rawPixels[2], rawPixels[3]);
        let dataLength = 0;
        let headerOffset = 0;

        if (magic === 'AUDO' || magic === 'VIDO' || magic === 'BINA') {
            dataLength = (rawPixels[4] << 24) | (rawPixels[5] << 16) | (rawPixels[6] << 8) | rawPixels[7];
            headerOffset = 12;
        } else {
            // Fallback for legacy 4-byte length header
            dataLength = (rawPixels[0] << 24) | (rawPixels[1] << 16) | (rawPixels[2] << 8) | rawPixels[3];
            headerOffset = 4;
        }

        if (dataLength <= 0 || dataLength > rawPixels.length - headerOffset) {
            throw new Error(`Invalid embedded audio length: ${dataLength} (magic: ${magic})`);
        }

        return rawPixels.slice(headerOffset, headerOffset + dataLength);
    }

    async function decodeAudioFromUrl(url) {
        const cacheKey = url.split('?')[0];
        if (audioBufferCache.has(cacheKey)) {
            return audioBufferCache.get(cacheKey);
        }
        if (audioPromiseCache.has(cacheKey)) {
            return audioPromiseCache.get(cacheKey);
        }

        const decodePromise = (async () => {
            try {
                const resp = await fetch(url);
                if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching ${url}`);
                const arrayBuffer = await resp.arrayBuffer();
                
                let bufferToDecode;
                const u8 = new Uint8Array(arrayBuffer, 0, Math.min(4, arrayBuffer.byteLength));
                if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4E && u8[3] === 0x47) {
                    // PNG stego: decode embedded audio bytes
                    const audioBytes = await extractStegoAudioBytes(arrayBuffer);
                    bufferToDecode = audioBytes.buffer.slice(audioBytes.byteOffset, audioBytes.byteOffset + audioBytes.byteLength);
                } else {
                    // Direct audio file (MP3/OGG): use buffer as-is
                    bufferToDecode = arrayBuffer;
                }
                
                const ctx = getAudioContext();
                let decodedBuffer;
                try {
                    decodedBuffer = await ctx.decodeAudioData(bufferToDecode.slice(0));
                } catch(decodeErr) {
                    decodedBuffer = await new Promise((resolve, reject) => {
                        ctx.decodeAudioData(bufferToDecode.slice(0), resolve, reject);
                    });
                }

                // Anti-Pop fadeout cuối file
                try {
                    const fadeSamples = Math.min(1024, decodedBuffer.length);
                    for (let ch = 0; ch < decodedBuffer.numberOfChannels; ch++) {
                        const channelData = decodedBuffer.getChannelData(ch);
                        const len = channelData.length;
                        for (let i = 0; i < fadeSamples; i++) {
                            const idx = len - fadeSamples + i;
                            channelData[idx] *= (1.0 - (i / fadeSamples));
                        }
                    }
                } catch(e) {}

                audioBufferCache.set(cacheKey, decodedBuffer);
                return decodedBuffer;
            } finally {
                audioPromiseCache.delete(cacheKey);
            }
        })();

        audioPromiseCache.set(cacheKey, decodePromise);
        return decodePromise;
    }

    // ─── Play BGM (Áp dụng đồng bộ Global BGM Multiplier trên mọi kịch bản) ───
    async function playBGM(url, loop = true, rawVol = 100, buf = "0") {
        try {
            currentBgmInfo = { url, loop, rawVol, buf };
            const ctx = getAudioContext();
            if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
                try { ctx.resume().catch(() => {}); } catch(e) {}
            }

            if (activeBgmSource) {
                try { activeBgmSource.stop(); } catch(e) {}
                activeBgmSource = null;
            }

            const audioBuffer = await decodeAudioFromUrl(url);
            const source = ctx.createBufferSource();
            const gainNode = ctx.createGain();

            source.buffer = audioBuffer;
            source.loop = (loop !== false && loop !== "false");

            let numVol = parseFloat(rawVol);
            if (isNaN(numVol)) numVol = 80;
            if (numVol > 1.0) numVol = numVol / 100.0;
            lastBgmScenarioVol = numVol;

            const finalVol = Math.max(0, Math.min(1.0, numVol * globalBgmMultiplier * MASTER_BGM_SCALE));
            gainNode.gain.setValueAtTime(finalVol, ctx.currentTime);

            source.connect(gainNode);
            gainNode.connect(ctx.destination);

            source.start(0);
            activeBgmSource = source;
            activeBgmGainNode = gainNode;

            source.onended = () => {
                if (activeBgmSource === source) {
                    activeBgmSource = null;
                    activeBgmGainNode = null;
                    if (currentBgmInfo && !document.hidden && currentBgmInfo.loop !== false && currentBgmInfo.loop !== "false") {
                        setTimeout(() => {
                            if (currentBgmInfo && !activeBgmSource && !document.hidden) {
                                playBGM(currentBgmInfo.url, currentBgmInfo.loop, currentBgmInfo.rawVol, currentBgmInfo.buf);
                            }
                        }, 100);
                    }
                }
            };
        } catch(err) {
            console.warn('[Web Audio Engine] BGM play error:', err);
        }
    }

    function stopBGM(fadeMs = 1500) {
        currentBgmInfo = null;
        if (activeBgmGainNode && activeBgmSource) {
            const ctx = getAudioContext();
            const fadeSec = fadeMs / 1000.0;
            activeBgmGainNode.gain.setValueAtTime(activeBgmGainNode.gain.value, ctx.currentTime);
            activeBgmGainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + fadeSec);
            setTimeout(() => {
                if (activeBgmSource) {
                    try { activeBgmSource.stop(); } catch(e) {}
                    activeBgmSource = null;
                    activeBgmGainNode = null;
                }
            }, fadeMs);
        }
    }

    // ─── Play SE / Voice (Tự động nhận diện Voice vs SE & Áp dụng Multiplier) ──
    async function playSE(url, rawVol = 100, buf = "0", onEndedCb = null) {
        try {
            const ctx = getAudioContext();
            if (ctx.state === 'suspended' || ctx.state === 'interrupted') {
                try { ctx.resume().catch(() => {}); } catch(e) {}
            }

            const bufStr = String(buf || "0");

            // Ngắt êm âm thanh trước trên cùng kênh buffer
            if (activeSeMap.has(bufStr)) {
                const prev = activeSeMap.get(bufStr);
                if (prev.gainNode && prev.source) {
                    prev.gainNode.gain.setValueAtTime(prev.gainNode.gain.value, ctx.currentTime);
                    prev.gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.006);
                    setTimeout(() => { try { prev.source.stop(); } catch(e) {} }, 8);
                }
                activeSeMap.delete(bufStr);
            }

            const audioBuffer = await decodeAudioFromUrl(url);
            const source = ctx.createBufferSource();
            const gainNode = ctx.createGain();
            const filterNode = ctx.createBiquadFilter();
            filterNode.type = 'lowpass';
            filterNode.frequency.value = 12000;

            source.buffer = audioBuffer;
            source.loop = false;

            let numVol = parseFloat(rawVol);
            if (isNaN(numVol)) numVol = 80;
            if (numVol > 1.0) numVol = numVol / 100.0;

            const isVoice = isVoiceAudio(url);
            const currentMult = isVoice ? globalVoiceMultiplier : globalSeMultiplier;
            let finalVol = Math.max(0, Math.min(1.0, numVol * currentMult * MASTER_SE_SCALE));
            if (url.includes('sistem_starton.mp3')) finalVol *= 0.35;

            // Attack ramp 4ms chống click cơ học
            gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, finalVol), ctx.currentTime + 0.004);

            source.connect(gainNode);
            gainNode.connect(filterNode);
            filterNode.connect(ctx.destination);

            source.start(0);
            activeSeMap.set(bufStr, { source, gainNode, isVoice, numVol });

            source.onended = () => {
                if (activeSeMap.get(bufStr)?.source === source) {
                    activeSeMap.delete(bufStr);
                }
                if (typeof onEndedCb === 'function') onEndedCb();
            };
        } catch(err) {
            console.warn('[Web Audio Engine] SE play error:', err);
            if (typeof onEndedCb === 'function') onEndedCb();
        }
    }

    // ─── Decode Binary / Video Blob from URL ──────────────────────────────────
    const blobUrlCache = new Map();
    async function loadBinaryBlobUrl(url, mimeType = 'video/mp4') {
        if (!url) return null;
        if (blobUrlCache.has(url)) return blobUrlCache.get(url);

        try {
            const resp = await fetch(url);
            const arrayBuf = await resp.arrayBuffer();
            const u8 = new Uint8Array(arrayBuf);
            let rawBytes;
            // Check if PNG stego signature (0x89 0x50 0x4E 0x47)
            if (u8[0] === 0x89 && u8[1] === 0x50 && u8[2] === 0x4E && u8[3] === 0x47) {
                rawBytes = await extractStegoAudioBytes(arrayBuf);
            } else {
                rawBytes = arrayBuf;
            }
            const blob = new Blob([rawBytes], { type: mimeType });
            const blobUrl = URL.createObjectURL(blob);
            blobUrlCache.set(url, blobUrl);
            return blobUrl;
        } catch(err) {
            console.error('[Web Audio Engine] Lỗi giải mã Binary/Video Blob:', err);
            return null;
        }
    }

    // Expose toàn cục
    window.HOME_AudioEngine = {
        getAudioContext,
        unlockAudioContext,
        decodeAudioFromUrl,
        extractStegoBytes: extractStegoAudioBytes,
        loadBinaryBlobUrl,
        playBGM,
        stopBGM,
        playSE,
        isVoiceAudio,
        stopSE: (buf = "0") => {
            const bufStr = String(buf || "0");
            if (activeSeMap.has(bufStr)) {
                const item = activeSeMap.get(bufStr);
                if (item.source) {
                    try { item.source.stop(); } catch(e) {}
                }
                activeSeMap.delete(bufStr);
            }
        },
        setBgmVolume: (vol) => {
            const parsed = parseFloat(vol);
            const v = isNaN(parsed) ? 80 : Math.max(0, Math.min(100, parsed));
            globalBgmMultiplier = v / 100.0;
            try {
                const cur = JSON.parse(localStorage.getItem('home_audio_global_cfg') || '{}');
                cur.bgm = v;
                localStorage.setItem('home_audio_global_cfg', JSON.stringify(cur));
            } catch(e) {}
            if (activeBgmGainNode && getAudioContext()) {
                const ctx = getAudioContext();
                const finalVol = Math.max(0, Math.min(1.0, lastBgmScenarioVol * globalBgmMultiplier * MASTER_BGM_SCALE));
                activeBgmGainNode.gain.setValueAtTime(activeBgmGainNode.gain.value, ctx.currentTime);
                activeBgmGainNode.gain.linearRampToValueAtTime(finalVol, ctx.currentTime + 0.05);
            }
        },
        setSeVolume: (vol) => {
            const parsed = parseFloat(vol);
            const v = isNaN(parsed) ? 80 : Math.max(0, Math.min(100, parsed));
            globalSeMultiplier = v / 100.0;
            try {
                const cur = JSON.parse(localStorage.getItem('home_audio_global_cfg') || '{}');
                cur.se = v;
                localStorage.setItem('home_audio_global_cfg', JSON.stringify(cur));
            } catch(e) {}
            if (getAudioContext()) {
                const ctx = getAudioContext();
                activeSeMap.forEach(item => {
                    if (item.gainNode && !item.isVoice) {
                        const finalVol = Math.max(0, Math.min(1.0, (item.numVol || 0.8) * globalSeMultiplier * MASTER_SE_SCALE));
                        item.gainNode.gain.setValueAtTime(finalVol, ctx.currentTime);
                    }
                });
            }
        },
        setVoiceVolume: (vol) => {
            const parsed = parseFloat(vol);
            const v = isNaN(parsed) ? 80 : Math.max(0, Math.min(100, parsed));
            globalVoiceMultiplier = v / 100.0;
            try {
                const cur = JSON.parse(localStorage.getItem('home_audio_global_cfg') || '{}');
                cur.voice = v;
                localStorage.setItem('home_audio_global_cfg', JSON.stringify(cur));
            } catch(e) {}
            if (getAudioContext()) {
                const ctx = getAudioContext();
                activeSeMap.forEach(item => {
                    if (item.gainNode && item.isVoice) {
                        const finalVol = Math.max(0, Math.min(1.0, (item.numVol || 0.8) * globalVoiceMultiplier * MASTER_SE_SCALE));
                        item.gainNode.gain.setValueAtTime(finalVol, ctx.currentTime);
                    }
                });
            }
        },
        getVolumeState: () => ({
            bgm: Math.round(globalBgmMultiplier * 100),
            se: Math.round(globalSeMultiplier * 100),
            voice: Math.round(globalVoiceMultiplier * 100)
        }),
        getGlobalBgmMultiplier: () => globalBgmMultiplier,
        getGlobalSeMultiplier: () => globalSeMultiplier,
        getGlobalVoiceMultiplier: () => globalVoiceMultiplier
    };

    console.log('[Web Audio Engine] ✅ Đã khởi tạo hoàn tất Web Audio & Stego Engine.');
})();
