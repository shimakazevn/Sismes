*start
[macro name=model_reset]

[VRoid_layer_hide layerID="VRoid"]
[VRoid_viewport_hide layerID="VRoid" viewportID="viewport1"]
[VRoid_model_move modelID="model1" x=0 y=0 z=0 rotX=0 rotY=0 rotZ=0]
[VRoid_stop_animation modelID="model1"]

[VRoid_emo modelID="model1" emoID="Tops2_Show" emoval=1 diff=false]
[VRoid_exclude_emo modelID="model1" emoID="Tops2_Show"]

[VRoid_mesh modelID="model1" name="Body_Tops"  visible=true]
[VRoid_mesh modelID="model1" name="Body_Tops2" visible=false]

[VRoid_material modelID=model1 materialName="N00_004_01_Tops_01_CLOTH (Instance)" visible=true]
[VRoid_material modelID=model1 materialName="N00_004_01_Tops_02_CLOTH (Instance)" visible=true]
[VRoid_material modelID=model1 materialName="N00_010_01_Onepiece_00_CLOTH (Instance)" visible=true]

[VRoid_config modelID="model1" waitingAnimationVal=15]
[VRoid_blink_config modelID="model1" enable=true speed=1 stroke=0.8]
[VRoid_obj3D_hide objID="objID1"]

[VRoid_springBone_reset modelID="model1"]

[endmacro]

[return]
