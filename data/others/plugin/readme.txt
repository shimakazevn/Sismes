==================================================================
ティラノスクリプト向けVRoidプラグイン  Ver 3.7.5  2025/12/17

   制作 （猫）milkcat
     HP  https://milkcat.jp/
Twitter  https://twitter.com/nekomilkcat
==================================================================

ティラノスクリプトV6（V600）以降で動作します。

開発環境にティラノスクリプトV6以上、ティラノビルダーV3以上が必須です。


このプラグインを導入することで.vrmが拡張子の
3Dモデルをティラノスクリプト上で動作させることが可能です。

VRM0.x、VRM1.0に対応。

3Dの知識がなくても、タグによるコード実装で3Dモデルを扱えます。


※便宜上VRoidプラグインと表記していますが、
VRMファイルであればVRoid Studio以外で作成したVRMファイル全般を取り扱えます。


■導入方法

・プラグインの配置
　このテキストと同じフォルダにある「vrm」フォルダを
　使用するプロジェクトフォルダの「data/others/plugin」
　にコピーしてください。
　(「data/others/plugin/vrm/init.ks」　となるように配置してください。)

　first.ks、またはその直後に読み込むksファイルなど、
　（ティラノビルダーの場合は[data/scenario/system/tyrano.ks]の１行目を推奨）
　ゲーム起動時に必ず通過するシナリオファイルで

[plugin name="vrm"]

　と記述すると下記のタグが使用可能になります。

・レイヤー表示関係

[VRoid_layer_new]           旧互換タグ：[VRoid_new]
[VRoid_layer_show]
[VRoid_layer_hide]
[VRoid_layer_move]
[VRoid_layer_dispose]
[VRoid_layer_config]

[VRoid_subLayer_new]           ※VRoid_subLayer系のタグは現在実験的な機能として実装しています。
[VRoid_subLayer_show]            VRoid_subLayerは現在のThree.js r176 ＋ three-vrm.js v3.4.1 の環境にて
[VRoid_subLayer_hide]            VRMの描画に特定の不具合が発生する為、その不具合に対する回避コードが組まれている状態です。
[VRoid_subLayer_move]            その回避の為の処理が非常に重たいため、パフォーマンスに影響が出る可能性があります。
[VRoid_subLayer_dispose]         （VRoid_subLayerを使用すると使用していないときより4～5倍ほど処理が重くなる可能性があります）

[VRoid_light_new]
[VRoid_light_add]
[VRoid_light_delete]
[VRoid_light_dispose]
[VRoid_light_move]          旧互換タグ：[VRoid_light]
[VRoid_shadow]

[VRoid_camera_new]
[VRoid_camera_change]
[VRoid_camera_dispose]
[VRoid_camera_move]

[VRoid_mosaicLayer_config]


・モデル操作関係

[VRoid_load]
[VRoid_open]
[VRoid_add]
[VRoid_delete]
[VRoid_show]
[VRoid_hide]
[VRoid_dispose]
[VRoid_config]              旧互換タグ：[VRoid_model_config]
[VRoid_move]                旧互換タグ：[VRoid_model_move]
[VRoid_pose]
[VRoid_emo]
[VRoid_lookAt]


・演出関係

[VRoid_monitorInLayer_new]
[VRoid_monitorInLayer_show]
[VRoid_monitorInLayer_hide]
[VRoid_monitorInLayer_dispose]
[VRoid_monitorInLayer_move]

[VRoid_fog_add]
[VRoid_fog_delete]
[VRoid_fog_move]

[VRoid_effect_preload]
[VRoid_effect]
[VRoid_effect_delete]

[VRoid_wind]
[VRoid_stop_wind]


・おさわり関係
[VRoid_osawari_add]
[VRoid_osawari_config]
[VRoid_osawari_delete]


・マテリアル、テクスチャー関係

[VRoid_material]
[VRoid_change_texture]
[VRoid_change_color]


・モーション再生関係

[VRoid_animation]
[VRoid_stop_animation]


・目パチ口パク関係

[VRoid_lip_config]
[VRoid_blink_config]


・画像、3Dデータ表示関係

[VRoid_background_load]
[VRoid_background_visible]
[VRoid_background_dispose]
[VRoid_background_move]

[VRoid_img_add]
[VRoid_img_delete]
[VRoid_img_show]
[VRoid_img_hide]
[VRoid_img_move]

[VRoid_obj3D_load]
[VRoid_obj3D_add]
[VRoid_obj3D_delete]
[VRoid_obj3D_dispose]
[VRoid_obj3D_show]
[VRoid_obj3D_hide]
[VRoid_obj3D_move]

[VRoid_mosaic_add]
[VRoid_mosaic_delete]
[VRoid_mosaic_show]
[VRoid_mosaic_hide]
[VRoid_mosaic_move]

[VRoid_mirror_add]
[VRoid_mirror_delete]
[VRoid_mirror_show]
[VRoid_mirror_hide]
[VRoid_mirror_move]


・追加ファイル関係

[VRoid_import_blinkSetting]
[VRoid_import_emotion]
[VRoid_import_pose]
[VRoid_import_animation]
[VRoid_import_anim_emo_timeline]


・デバッグ関係

[VRoid_capture]
[VRoid_emo_maker]
[VRoid_materialChecker]
[VRoid_camera_test]


※オプション
このプラグインを使用すると、
セーブデータの読み込み時やsleepgameからの復帰時に
VRoidの読み込みが完了するまでローディング画面が表示されます。
ローディング画面を無効にしたい場合は、
プラグイン読み込み時に下記のように記述してください。

[plugin name="vrm" displayLoading="false"]

displayLoadingを"false"に指定すると、ローディング画面を無効にできます。

ロード画面自体をカスタマイズしたい場合は
vrm/js/ex_tyrano.js
を編集してください。（上級者向け）


使用可能なタグが非常に多いため、
まずは下記のサンプルシナリオを触って導入することを推奨いたします。


■ビルダーでの使用について

本プラグインのビルダーでの使用は非推奨としたうえで、
このテキストと同じフォルダにある「by_builder」の中の
「readme_builder.txt」を参照の上、自己責任でお使いください。



■サンプルシナリオ使用方法

１．プラグインの配置
　このテキストと同じフォルダにある「vrm」フォルダを
　使用するプロジェクトフォルダの「data/others/plugin」
　にコピーしてください。
　(「data/others/plugin/vrm/init.ks」　となるように配置してください。)

２．シナリオの上書き
　sample_scenarioフォルダの中の「first.ks」と「scene1.ks」を
　「data/scenario」フォルダの中に上書きしてください。


以上でサンプルゲームが起動します。


　サンプルシナリオ「V3追加機能デモ」について、
　3Dデータを下記のアドレスからダウンロードする必要があります。
　
　３Dモデル「一般的マイク」
　https://booth.pm/ja/items/5619126
　
　サイバーステージ　glbファイル版
　https://booth.pm/ja/items/3964661

　ダウンロードしたファイルを展開し、
　mic.glb、CyberStage_AB.glb、CyberStage_D.glbを
　data/others/plugin/vrm/_obj3D
　の中に配置してください。
　
　以上で「V3追加機能デモ」が動作します。


■同梱のVRMファイルについて

再配布・モデル改変が可能なライセンスの
ニコニ立体ちゃん( AliciaSolid.vrm )を若干改変して
サンプル動作用に同梱しております。
（※見た目の改変なし。内部データのみの改変してあります。）

そのまま使用してゲームを開発する際は、
配布元のライセンスをご確認ください。

https://3d.nicovideo.jp/works/td32797


■技術情報

本プラグインではティラノスクリプト本体の下記の機能を上書きしています。

tyrano.plugin.kag.menu.loadGameData
tyrano.plugin.kag.tag.playbgm.play


■使用ライブラリ

・Three-vrm関連

three-vrm.js v3.4.1
three-vrm-animation.js  v3.4.1
loadMixamoAnimation.js
mixamoVRMRigMap.js
https://github.com/pixiv/three-vrm


・Three.js r176
https://github.com/mrdoob/three.js


■利用規約

・本プラグインは有料ライセンスです
・本プラグインの改変は自由です
・本プラグインの再配布やカスタマイズしての再配布は一切禁じます
・商用、年齢制限作品の利用可です
・
・下記のクレジット表記をお願いします（URLは任意）
　（猫）milkcat　https://milkcat.jp/
　　もしくは
　ねこの　（https://x.com/nekomilkcat）

　　ローマ字表記への変更など、良識の範囲内で行っていただいて構いません。


■免責事項

本プラグインを使用したことにより生じた如何なる
損害及び損失に対し、制作者は一切責任を負いません。


■更新履歴

2025/12/17    Ver3.7.5  [VRoid_osawari_sync]を追加
                        ひとつのボーンに対して複数のボーンを同期させることが可能に

                        CONTEXT_LOST_WEBGL発生時のリストアコードの調整


2025/12/08    Ver3.7.4  ポーズ編集にX mirror機能を追加
                        指編集機能の値の範囲をマイナス方向にも設定できるように拡張

                        emoMakerの開始と終了時にゲームデータへの読み込みと書き込みを行うように機能を追加


2025/12/05    Ver3.7.3  [VRoid_load]のhelperにfalseを指定した際の問題の修正


2025/12/04    Ver3.7.2  [VRoid_load]にhelperパラメーターを追加
                        テストカメラ使用時にVRMの各種helperの表示・非表示ができる機能を追加
                        リアルタイムでコライダーやスプリングボーンの動きを可視化可能に
                        
                        モザイク処理の調整


2025/12/02    Ver3.7.1  おさわり機能設定時のボーン検索の最適化


2025/12/01    Ver3.7.0  ドラッグ、またはスワイプ操作で任意のボーンを移動するおさわり機能の追加
                        各種パラメーターの取得や移動合計値などの取得も可能
                        [VRoid_osawari_add][VRoid_osawari_config][VRoid_osawari_delete]の追加

                        CONTEXT_LOST_WEBGL発生時にレンダラーのリストアを試みるコードの実装

                        [VRoid_animation]タグのresetHipsパラメーターの調整


2025/11/14    Ver3.6.3  マテリアルにモザイクを掛けた際に境界に黒い線がはいる問題の修正


2025/11/12    Ver3.6.2  [VRoid_layer_config]タグを追加
                        設定済みのレイヤーの画質やFPSの設定変更などが動的に可能

                        セーブデータ復元時にモザイクの掛かったテクスチャーが崩れる問題の修正
                        モザイク関係のratioパラメーターの初期値を0.5から0.2へ変更

                        その他軽微な不具合修正


2025/11/11    Ver3.6.1  モザイク関係の処理の最適化
                        [VRoid_mosaicLayer_config]タグにratioパラメーターを追加

                        [VRoid_pose]及び[VRoid_emo]タグのse_storageパラメーターをカンマ区切りで複数指定した場合、
                        そのなかのひとつをランダムで再生する機能を追加

                        ティラノスタジオ及びティラノビルダーからプレビューした際のリロードボタン多用時のメモリリーク対策


2025/11/07    Ver3.6.0  マテリアル単位でモザイクを掛ける機能を追加
                        [VRoid_mosaicLayer_config]タグを追加
                        [VRoid_layer_new]にmosaicパラメーターを追加
                        [VRoid_material]にmosaic、materialNameパラメーターを追加
                        
                        [VRoid_pose]及び[VRoid_emo]タグ実行時にplayseが行えるようになる機能を追加
                        se_storage、se_buf、se_loop、se_sprite_time、se_clear、se_volume、se_html5パラメーターを追加
                        これにより[VRoid_import_anim_emo_timeline]を設定した際に、
                        任意のアニメーションのタイミングで表情と同時にSEを鳴らすことでアニメーションとSEの同期がとりやすくなります
                        
                        非ウインドウアクティブ時にレンダリングが完全に機能しなくなる環境の対策

                        ブリンク時に不正な値が発生する可能性のある問題の修正


2025/11/03    Ver3.5.7  [VRoid_obj3D_add]タグでモデルにアタッチしたデータが復元できない問題の修正


2025/10/31    Ver3.5.6  透過マテリアルのレンダリングを調整
                        [VRoid_load]タグにrenderOrder、alphaToCoverage、premultipliedAlphaパラメーターを追加


2025/10/24    Ver3.5.5  実験的な機能としてVRoid_subLayer系のタグを追加
                        現在はライブラリの相性により非常に処理の重い実装となっています

                        モデルの揺れ物に関するshakeパラメーターによる内部制御をより厳密に調整


2025/10/07    Ver3.5.0  画面全体だけではなく、任意の大きさと位置にVRoidレイヤーの作成が可能になる機能追加
                        [VRoid_layer_new]タグにwidth、height、top、leftパラメーターを追加
                        [VRoid_layer_move]タグを追加（VRoid_layer_newのtopとleftに対応）


2025/10/05    Ver3.4.1  特殊な条件のメッシュからシェイプキーが読み取れない問題の修正
                        サムネイルデータを持たないモデルで動作しない問題の修正


2025/10/03    Ver3.4.0  テストカメラにアニメーションプレビュー機能を実装
                        [VRoid_animation]タグのresetHipsパラメーター関連の不具合を修正
                        emoTimelineファイル内のtimeパラメーターにVRoid_animationタグで指定したrateのスケーリングを適用するように変更


2025/09/26    Ver3.3.2  [VRoid_animation]タグにfadeLoopとresetHipsパラメーターを追加。typeパラメーターの廃止。vrmaとfbxは自動判別されるように
                        [VRoid_stop_animation]タグにkeepパラメーターを追加
                        連続でVRoid_animationを実行した際や、ループ時にアニメーションを補完するように機能追加
                        keepパラメーターを使用した際もVRoid_configのwaitingAnimationが実行されるように機能追加


2025/09/17    Ver3.3.1  [VRoid_img_add]及び[VRoid_obj3D_add]タグにrenderOrderパラメーターを追加


2025/09/11    Ver3.3.0  HDRI（高ダイナミックレンジ画像）の背景表示に対応。（.hdr及び.exrをサポート）
                        新規タグ、VRoid_background_load、VRoid_background_visible、VRoid_background_dispose、VRoid_background_moveの追加
                        
                        反射させるオブジェクトを生成するミラー機能を追加
                        新規タグ、VRoid_mirror_add、VRoid_mirror_delete、VRoid_mirror_show、VRoid_mirror_hide、VRoid_mirror_moveの追加
                        
                        [VRoid_obj3D_load]タグで「.obj」と「.3ds」の読み込みを新たにサポート
                        FBXファイルを読み込んだ際のTGAファイルのサポートを追加
                        
                        [VRoid_camera_move]タグにfovとnearとfarパラメーターを追加。視野角や描画範囲を動的に変更が可能に
                        
                        [VRoid_img_add]及び[VRoid_img_move]タグにopacityパラメーターを追加。透過度の設定と動的な変更が可能に
                        
                        [VRoid_mosaic_move]タグにpixelとbrightnessパラメーターを追加。モザイクの粗さと明るさを動的に変更が可能に
                        
                        move系タグの動作の最適化と、使用頻度の高いコードの最適化
                        
                        [VRoid_obj3D_show]及び[VRoid_obj3D_hide]が正常に動作しない問題の修正
                        
                        リファレンスの[VRoid_obj3D_move]の記載漏れを修正


2025/09/08    Ver3.2.2  テストカメラ機能のポーズ編集機能にて、VRM1.0を使用時にimport、exportが正常に行われない問題の修正

                        [VRoid_obj3D]タグのforceLightの不具合を修正

                        [VRoid_img]タグ及び[VRoid_obj3D]タグの透過処理の変更


2025/09/05    Ver3.2.1  [VRoid_obj3D_load]タグでforceMaterial及びforceLightが正常に動作しないオブジェクト構造のファイルに対応

                        [VRoid_shadow]タグにrangeRatioパラメーターを追加。影の表示範囲を調整可能に

                        [VRoid_wind]の仕様変更と処理の最適化。モデルの元の重力設定を反映。forceWindパラメーターを追加


2025/08/20    Ver3.2.0  モザイク機能の追加
                        新規タグ、VRoid_mosaic_add、VRoid_mosaic_delete、VRoid_mosaic_show、VRoid_obj3D_hide、VRoid_obj3D_moveの追加

                        [VRoid_obj3D_load]タグにforceMaterialパラメーターを追加。読み込んだオブジェクトのマテリアルの種類を強制的に変更可能
                        forceLightパラメーターがセーブされない問題の修正

                        [VRoid_obj3D_delete]タグでnextOrderが二重発行されていた問題の修正

                        カメラテスト機能でVRM0.0のrotYが反転した状態で出力される問題の修正


2025/08/16    Ver3.1.0  [VRoid_shadow]タグにradiusとvalパラメーターを追加


2025/08/08    Ver3.0.2  [VRoid_emo]タグのリファレンス修正
                        サンプルで誤ったnameパラメーターを使用している記載があったため
                        正しいemoパラメーターに修正


2025/06/29    Ver3.0.1  VRoid_import_animationでFBX再生の不具合を修正


2025/06/27    Ver3.0.0  Three.jsのアップデート　r158 → r176
                        three-vrmのアップデート　v3.3.7 → v3.4.1
                        
                        開発環境の変更　ティラノスタジオV5 → ティラノスタジオV6

                        下記タグの名称変更
                        VRoid_new　→　VRoid_layer_new
                        VRoid_light　→　VRoid_light_move
                        VRoid_model_config　→　VRoid_config
                        VRoid_model_move　→　VRoid_move
                        
                        　※非推奨ですが互換の為変更前タグでも動作可能です
                        
                        
                        VRoid_layer_newの仕様変更
                        カメラとライトを複数管理できるようになったため
                        VRoid_layer_newからはそれらのパラメーターを廃止
                        samplesパラメーターをantialiasパラメーターに統合し、samplesを廃止
                        maxFPS、vsyncパラメーターを追加
                        
                        
                        VRoid_disposeの仕様変更
                        V2までのVRoid_disposeはVRoid_layer_disposeに変更され
                        VRoid_disposeはモデルの破棄タグになりました
                        
                        VRoid_lookAtの仕様変更
                        モデルから見たx軸とy軸で管理できるようになりました
                        
                        
                        VRoid_lookAtCameraを廃止し、VRoid_lookAtに統合しました
                        
                        
                        VRoid_layer_disposeにallパラメーターを追加
                        
                        VRoid_addにattachModelIDとattachBoneNameパラメーターを追加
                        
                        VRoid_effectでbokeh使用時のパラメーターにmodelIDを追加
                        
                        VRoid_camera_testにオブジェクトの移動・回転などを確認できる機能の追加
                        
                        scaleX, scaleY, scaleZのパラメーターを持つタグにてscaleを指定することで一括で処理できるように機能追加
                        
                        
                        下記新規タグの追加
                        
                        VRoid_light_new
                        VRoid_light_add
                        VRoid_light_delete
                        VRoid_light_dispose
                        VRoid_light_move
                        
                        VRoid_shadow
                        
                        VRoid_camera_new
                        VRoid_camera_change
                        VRoid_camera_dispose
                        
                        VRoid_open
                        
                        VRoid_monitorInLayer_new
                        VRoid_monitorInLayer_show
                        VRoid_monitorInLayer_hide
                        VRoid_monitorInLayer_dispose
                        VRoid_monitorInLayer_move
                        
                        VRoid_fog_add
                        VRoid_fog_delete
                        VRoid_fog_move
                        
                        VRoid_obj3D_load
                        VRoid_obj3D_add
                        VRoid_obj3D_delete
                        VRoid_obj3D_dispose
                        VRoid_obj3D_show
                        VRoid_obj3D_hide
                        VRoid_obj3D_move

                        sample_poseフォルダーの削除（必要な場合はV2以前のデータをダウンロードしてください）
