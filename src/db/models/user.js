import mongoose, { Schema, Error } from 'mongoose';

import Room from './room';

const UserSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true
		},
		vk_id: {
			type: String,
			unique: true,
			required: true,
			index: true,
		},
		nickname: {
			type: String,
			unique: true,
			required: true,
		},
		isOnline: {
			type: Boolean,
		},
		currentRoom:
			{
				type: Number,
				ref: 'Room',
			},
	}
);

UserSchema.pre('save', async function (next) {
	var doc = this;
	if (doc.isNew) {
		doc.id = await getNextSeq(doc.db.db, doc.collection.name);
		next();
	}
});

const getNextSeq = async function (db, name, callback) {
	const { value } = await db.collection('counters').findAndModify(
		{ _id: name },
		{ _id: -1 },
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true });

	return value.seq;
};

class UserClass {

	static async getUsersAmount() {
		return await this.count();
	}

	static async getUserByVkId(vk_id) {

		console.log('getUserByVkId', vk_id)
		const user = await this.findOne({
			vk_id
		}).exec();

		console.log('getUserByVkIduser', user)

		return await this.findOne({
			vk_id
		}).exec();
	}

	async setOnline() {
		console.log('SET ONLINE', this);

		await this.update({
			$set: {
				isOnline: true
			}
		})
	}

	async setOffline() {
		await this.update({
			$set: {
				isOnline: false
			}
		})
	}

	async leaveRoom() {
		await Room.update(
			{
				id: this.currentRoom
			},
			{
				$pull: {
					usersIds: this.vk_id
				}
			}
		);

		await this.update({
			$set: {
				currentRoom: null
			}
		});
	}

	async moveToRoom(number) {

		console.log('MOVE TO ROOM', number)

		await Room.update(
			{
				id: number
			},
			{
				$push: {
					usersIds: this.vk_id
				}
			}
		);
		await this.update({
			$set: {
				currentRoom: number
			}
		});
	}
}

UserSchema.loadClass(UserClass);

delete mongoose.connection.models.User;
export default mongoose.model('User', UserSchema);
