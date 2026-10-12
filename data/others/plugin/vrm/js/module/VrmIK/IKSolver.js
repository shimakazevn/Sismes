import * as THREE from 'three';

/*
	IKSolver.js

	CCD IK（Cyclic Coordinate Descent）を実装しています。

	ikChain.goal のワールド座標を目標として、
	effector を根元方面へ順に回転していきます。
*/

const _goalPosition = new THREE.Vector3();
const _joint2GoalVector = new THREE.Vector3();
const _effectorPosition = new THREE.Vector3();
const _joint2EffectorVector = new THREE.Vector3();
const _jointPosition = new THREE.Vector3();
const _jointQuaternionInverse = new THREE.Quaternion();
const _jointScale = new THREE.Vector3();
const _axis = new THREE.Vector3();
const _vector = new THREE.Vector3();
const _quarternion = new THREE.Quaternion();

/**
 * IK を解く
 * @param {Object} ikChain   - { goal, effector, joints }
 * @param {number} iteration - 反復数
 */
export function solve(ikChain, iteration, delta, time = 1000) {
	
	// ゴールのワールド位置
	ikChain.goal.getWorldPosition(_goalPosition);

	// 時間ベース係数（1000msでフル適用）
	const timeScale = (delta !== undefined)
		? Math.min(delta / time, 1)
		: 1;

	for (let i = iteration; i > 0; i--) {

		let didConverge = true;

		ikChain.joints.forEach((joint) => {

			joint.bone.matrixWorld.decompose(_jointPosition, _jointQuaternionInverse, _jointScale);

			_jointQuaternionInverse.invert();

			ikChain.effector.getWorldPosition(_effectorPosition);

			_joint2EffectorVector.subVectors(_effectorPosition, _jointPosition);
			_joint2EffectorVector.applyQuaternion(_jointQuaternionInverse);
			_joint2EffectorVector.normalize();

			_joint2GoalVector.subVectors(_goalPosition, _jointPosition);
			_joint2GoalVector.applyQuaternion(_jointQuaternionInverse);
			_joint2GoalVector.normalize();

			let deltaAngle = _joint2GoalVector.dot(_joint2EffectorVector);

			if (deltaAngle > 1.0) {
				deltaAngle = 1.0;
			} else if (deltaAngle < -1.0) {
				deltaAngle = -1.0;
			}

			deltaAngle = Math.acos(deltaAngle);

			if (deltaAngle >= 1e-5) {

				// ★時間スケーリング適用
				deltaAngle *= timeScale;

				_axis.crossVectors(_joint2EffectorVector, _joint2GoalVector);
				_axis.normalize();

				_quarternion.setFromAxisAngle(_axis, deltaAngle);

				joint.bone.quaternion.multiply(_quarternion);

				const euler = joint.bone.rotation;

				euler.x = Math.max(joint.rotationMin.x, Math.min(joint.rotationMax.x, euler.x));
				euler.y = Math.max(joint.rotationMin.y, Math.min(joint.rotationMax.y, euler.y));
				euler.z = Math.max(joint.rotationMin.z, Math.min(joint.rotationMax.z, euler.z));

				euler.order = joint.order;

				joint.bone.updateMatrixWorld(true);

				didConverge = false;

			}
		});

		if (didConverge) break;
	}
}