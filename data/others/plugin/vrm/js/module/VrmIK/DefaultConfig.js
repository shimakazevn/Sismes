import { Vector3 } from 'three';
import { VRMHumanBoneName } from '@pixiv/three-vrm';

/**
 DefaultConfig.js

 * IK のデフォルト設定
 * 各 IK チェーンと joint の制限（rotationMin / rotationMax / order）を定義
 */

/*
example
{
	iteration:number,   // 反復回数
	chainConfigs:[	  // IKチェイン 
		{
			jointConfigs:[  // 手先から根本
				{},		 // Effectorの親
							// ||
							// V
				{		   // RootBone
					boneName:  VRMHumanBoneName.Hoge,
					order: 'XYZ',   // 回転順序
					rotationMin: new Vector3(-Math.PI,0,0)	// 最小 回転角制限  -Pi ~ Pi
					rotationMax: new Vector3(Math.PI,0,0)	// 最大 回転角制限  -Pi ~ Pi
				}		  
			],
			effecotrBoneName:,
		},
	]
}
*/

export const defaultIKConfig = {
	iteration: 1,
	chainConfigs: [
		// Hip -> Head
		{
			jointConfigs: [

				//UpperChest追加。+-30度を可動域に
				{
					boneName: VRMHumanBoneName.UpperChest,
					order: 'XYZ',
					rotationMin: new Vector3(-Math.PI / 6, -Math.PI / 6, -Math.PI / 6),
					rotationMax: new Vector3(Math.PI / 6, Math.PI / 6, Math.PI / 6),
				},
				//Math.PI / 1.125で160度制限に変更
				{
					boneName: VRMHumanBoneName.Chest,
					order: 'XYZ',
					rotationMin: new Vector3(-Math.PI / 1.125, -Math.PI / 1.125, -Math.PI / 1.125),
					rotationMax: new Vector3(Math.PI / 1.125, Math.PI / 1.125, Math.PI / 1.125),
				},
				{
					boneName: VRMHumanBoneName.Spine,
					order: 'XYZ',
					rotationMin: new Vector3(-Math.PI / 1.125, -Math.PI / 1.125, -Math.PI / 1.125),
					rotationMax: new Vector3(Math.PI / 1.125, Math.PI / 1.125, Math.PI / 1.125),
				},
				/*
				//hipsまでは伝わらないようにした
				{
					boneName: VRMHumanBoneName.Hips,
					order: 'XYZ',
					rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
					rotationMax: new Vector3(Math.PI, Math.PI, Math.PI),
				},
				*/
			],
			effectorBoneName: VRMHumanBoneName.Neck,
		},
		// Left Shoulder -> Hand
		{
			jointConfigs: [{
				boneName: VRMHumanBoneName.LeftLowerArm,
				order: "YZX",
				rotationMin: new Vector3(0, -Math.PI, 0),
				rotationMax: new Vector3(0, -(.1 / 180) * Math.PI, 0)
			}, {
				boneName: VRMHumanBoneName.LeftUpperArm,
				order: "ZXY",
				rotationMin: new Vector3(-Math.PI / 2, -Math.PI, -Math.PI),
				rotationMax: new Vector3(Math.PI / 2, Math.PI, Math.PI)
			}, {
				boneName: VRMHumanBoneName.LeftShoulder,
				order: "ZXY",
				rotationMin: new Vector3(0, -(45 / 180) * Math.PI, -(45 / 180) * Math.PI),
				rotationMax: new Vector3(0, 45 / 180 * Math.PI, 0)
			}],
			effectorBoneName: VRMHumanBoneName.LeftHand

		},
		// Right Shoulder -> Hand
		{
			jointConfigs: [{
				boneName: VRMHumanBoneName.RightLowerArm,
				order: "YZX",
				rotationMin: new Vector3(0, -Math.PI, 0),
				rotationMax: new Vector3(0, -(.1 / 180) * Math.PI, 0)
			}, {
				boneName: VRMHumanBoneName.RightUpperArm,
				order: "ZXY",
				rotationMin: new Vector3(-Math.PI / 2, -Math.PI, -Math.PI),
				rotationMax: new Vector3(Math.PI / 2, Math.PI, Math.PI)
			}, {
				boneName: VRMHumanBoneName.RightShoulder,
				order: "ZXY",
				rotationMin: new Vector3(0, -(45 / 180) * Math.PI, 0),
				rotationMax: new Vector3(0, 45 / 180 * Math.PI, 45 / 180 * Math.PI)
			}],
			effectorBoneName: VRMHumanBoneName.RightHand
		},
		// Left Leg
		{
			jointConfigs: [{
				boneName: VRMHumanBoneName.LeftLowerLeg,
				order: "XYZ",
				rotationMin: new Vector3(-Math.PI, 0, 0),
				rotationMax: new Vector3(0, 0, 0)
			}, {
				boneName: VRMHumanBoneName.LeftUpperLeg,
				order: "XYZ",
				rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
				rotationMax: new Vector3(Math.PI, Math.PI, Math.PI)
			}],
			effectorBoneName: VRMHumanBoneName.LeftFoot

		},
		// Right Leg
		{
			jointConfigs: [{
				boneName: VRMHumanBoneName.RightLowerLeg,
				order: "XYZ",
				rotationMin: new Vector3(-Math.PI, 0, 0),
				rotationMax: new Vector3(0, 0, 0)
			}, {
				boneName: VRMHumanBoneName.RightUpperLeg,
				order: "XYZ",
				rotationMin: new Vector3(-Math.PI, -Math.PI, -Math.PI),
				rotationMax: new Vector3(Math.PI, Math.PI, Math.PI)
			}],
			effectorBoneName: VRMHumanBoneName.RightFoot

		},
	]
};
