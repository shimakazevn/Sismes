/**
 * Sismes - Kịch bản Scenario Injector
 * =====================================
 * Tự động đọc file dịch `scenario_extract.json` và thay thế văn bản tiếng Việt
 * vào các file .ks trong thư mục `data/scenario/`.
 * 
 * Cách dùng:
 * 1. Chỉnh sửa cột "translated" trong file `scenario_extract.json`
 * 2. Chạy lệnh: node tools/inject_scenario.js
 */

const fs = require('fs');
const path = require('path');

const scenarioDir = path.join(__dirname, '../data/scenario');
const extractFile = path.join(__dirname, 'scenario_extract.json');

if (!fs.existsSync(extractFile)) {
    console.error('❌ Không tìm thấy file scenario_extract.json trong thư mục tools/');
    process.exit(1);
}

const scenarioData = JSON.parse(fs.readFileSync(extractFile, 'utf8'));
let totalReplaced = 0;

for (const [fileName, entries] of Object.entries(scenarioData)) {
    const filePath = path.join(scenarioDir, fileName);
    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Bỏ qua file không tồn tại: ${fileName}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let fileModified = false;

    for (const entry of entries) {
        if (entry.translated && entry.translated.trim() !== '') {
            if (content.includes(entry.raw)) {
                content = content.replace(entry.raw, entry.translated);
                totalReplaced++;
                fileModified = true;
            }
        }
    }

    if (fileModified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Đã cập nhật bản dịch cho: ${fileName}`);
    }
}

console.log(`\n🎉 Hoàn tất! Đã inject ${totalReplaced} dòng kịch bản.`);
