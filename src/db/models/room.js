
// var mongoose = require('mongoose');

// module.exports = mongoose.model('Room', {
// 	_id: {
// 		type: Number,
// 		min: 1,
// 		max: 9999
// 	},
// 	adminsIds: Array,
// 	title: String,
// 	moderatorIds: Array
// });

import mongoose, { Schema, Error } from 'mongoose';

const RoomSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true
		},
		title: {
			type: String,
			unique: true,
			required: true,
		},
		adminsIds: [
			{
				type: Number,
				ref: 'User',
            }
        ],
		moderatorIds: [
			{
				type: Number,
				ref: 'User',
            }
        ],
        usersIds: [
			{
				type: Number,
				ref: 'User',
            }
        ]
	}
);

RoomSchema.pre('save', async function (next) {
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

class RoomClass {
	static async getByNumber(id) {
		return await this.findOne({
			id
		}).exec();
	}
}

RoomSchema.loadClass(RoomClass);

delete mongoose.connection.models.Room;
export default mongoose.model('Room', RoomSchema);
