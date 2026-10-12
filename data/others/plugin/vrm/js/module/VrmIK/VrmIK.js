import * as THREE from 'three';
import { defaultIKConfig } from './DefaultConfig.js';
import * as IKSolver from './IKSolver.js';

/**
 VrmIK.js

 * VRM 用 IK ラッパー
 * defaultIKConfig を使い、VRM から IK チェーンを生成するモジュール
 */
export class VrmIK {

	/**
	 * @param {import('@pixiv/three-vrm').VRM} vrm
	 * @param {IKSolver.IKConfig} ikConfig
	 */
	constructor(vrm, ikConfig = defaultIKConfig) {

		this._chains = ikConfig.chainConfigs.map((chainConfig) => {
			return this._createIKChain(vrm, chainConfig);
		});

		// 反復回数
		this._iteration = ikConfig.iteration || 1;

	}

	/**
	 * IK チェーン配列を返す
	 */
	get ikChains() {
		return this._chains;
	}

	/**
	 * IK を解く（毎フレーム呼ぶ）
	 */
	solve(delta, time) {
		if (this._disposed) return;

		this._chains.forEach(chain => {
			let iteration = this._iteration

			//deltaがあるときはiterationを1回にする
			if (!delta === undefined) iteration = 1

			IKSolver.solve(chain, iteration, delta, time);
		});
	}
	/**
	 * IKChain を VRM + 設定から作る
	 * @param {import('@pixiv/three-vrm').VRM} vrm
	 * @param {IKSolver.ChainConfig} chainConfig
	 * @returns {IKSolver.IKChain}
	 */
	_createIKChain(vrm, chainConfig) {

		// target（操作する用の Object3D）
		const goal = new THREE.Object3D();

		// effector（末端の VRM ボーン）
		const effector = vrm.humanoid.getNormalizedBoneNode(chainConfig.effectorBoneName);

		// joints（各関節）
		const joints = chainConfig.jointConfigs.map((jointConfig) => {
			return this._createJoint(vrm, jointConfig);
		});


		// 初期位置を effector のワールド位置へコピー
		if (vrm.meta?.metaVersion != 1) {
			const mirroredPos = new THREE.Vector3().copy(effector.getWorldPosition(new THREE.Vector3()));
			mirroredPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI);
			goal.position.copy(mirroredPos);
		} else {
			effector.getWorldPosition(goal.position);
		}

		// シーンに追加（ギズモ等で移動制御するため）
		vrm.scene.add(goal);

		return {
			goal: goal,
			effector: effector,
			joints: joints,
			boneName: chainConfig.effectorBoneName,
		};
	}

	/**
	 * 単一の Joint を作成
	 *   順序や回転制限を DefaultConfig から継承する
	 * @param {import('@pixiv/three-vrm').VRM} vrm
	 * @param {IKSolver.JointConfig} jointConfig
	 * @returns {IKSolver.Joint}
	 */
	_createJoint(vrm, jointConfig) {

		return {
			bone: vrm.humanoid.getNormalizedBoneNode(jointConfig.boneName),
			order: jointConfig.order,
			rotationMin: jointConfig.rotationMin,
			rotationMax: jointConfig.rotationMax,
		};

	}

	/**
	 * 追加したオブジェクトをすべて破棄
	 */
	dispose() {

		if (this._disposed) return;

		// goal を scene から削除
		this._chains.forEach(chain => {

			if (chain.goal) {

				if (chain.goal.parent) {
					chain.goal.parent.remove(chain.goal);
				}

				// 念のため children も破棄
				chain.goal.traverse((obj) => {

					if (obj.geometry) {
						try { obj.geometry.dispose(); } catch {}
					}

					if (obj.material) {
						const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
						materials.forEach(mat => {
							try { mat.dispose(); } catch {}
						});
					}

				});
			}

			// 参照切り
			chain.goal = null;
			chain.effector = null;

			if (chain.joints) {
				chain.joints.forEach(j => {
					j.bone = null;
				});
			}

			chain.joints = null;

		});

		// 配列自体も破棄
		this._chains.length = 0;
		this._chains = null;

		this._vrm = null;

		this._disposed = true;
	}

}
