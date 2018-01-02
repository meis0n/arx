
// module.exports = mongoose.model('User', {
// 		nickname: String,
// 		_id: Number,
// 		isOnline: Boolean
// 	});
import autoIncrement from 'mongoose-autoincrement';
import mongoose, { Schema, Error } from 'mongoose';

// import Room from './room';

const UserSchema = new Schema(
	{
		id: {
			type: Number,
			unique: true,
			index: true
		},
		vk_id: {
			type: String,
			unique: true,
			required: true,
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
				type: Schema.ObjectId,
				ref: 'Room',
			},
	},
	//   {
	// 	toObject: {
	// 	  transform: (doc, ret) => {
	// 		ret.id = ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
	// 		delete ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
	// 	  },
	// 	},
	// 	toJSON: {
	// 	  transform: (doc, ret) => {
	// 		ret.id = ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
	// 		delete ret._id; // eslint-disable-line  no-underscore-dangle, no-param-reassign
	// 	  },
	// 	},
	//   },
);

UserSchema.pre('save', function (next) {
	var doc = this;
	if (doc.isNew) {
		doc.id = getNextSeq(doc.db.db, doc.collection.name, function (err, seq) {
			if (err) next(err);
			doc.id = seq;
			next();
		});
	}
});

var getNextSeq = function (db, name, callback) {
	db.collection('counters').findAndModify(
		{ _id: name },
		{ _id: -1 },
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true },
		function (err, ret) {
			if (err) callback(err);
			callback(null, ret.value.seq);
		});
};

class UserClass {
	//   get id() {
	// 		return this._id; // eslint-disable-line no-underscore-dangle
	//   }

	//   comparePassword(v) {
	// 	return bcrypt.compareSync(v, this.password);
	//   }

	static async getUsersAmount() {
		return await this.count();
	}
	// static async createUser(vk_id, nickname) {
	// 	const user = new User({
	// 		vk_id,
	// 		nickname,
	// 		isOnline: false,
	// 		currentRoom: null
	// 	});
	// 	try {
	// 		await user.save();
	// 	}
	// 	catch (err) {
	// 		throw Error('Error while creating user')
	// 	}
	// }

	//   static getFullProfile(query) {
	// 	return this.findOne(query).populate({
	// 	  path: 'favoriteVideos',
	// 	  populate: { path: 'author' },
	// 	});
	//   }

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

	//   async removeFromFavorite(videoId) {
	// 	await this.update(
	// 	  {
	// 		$pull: {
	// 		  favoriteVideos: videoId,
	// 		},
	// 	  },
	// 	  {
	// 		safe: true,
	// 	  },
	// 	);
	// 	return Video.findById(videoId);
	//   }

	//   async claim(videoId) {
	// 	return Video.findByIdAndUpdate(
	// 	  videoId,
	// 	  {
	// 		$addToSet: {
	// 		  claimedBy: this.id,
	// 		},
	// 	  },
	// 	  {
	// 		safe: true,
	// 		new: true,
	// 	  },
	// 	);
	//   }

	//   async like(videoId) {
	// 	return Video.findByIdAndUpdate(
	// 	  videoId,
	// 	  {
	// 		$addToSet: {
	// 		  likedBy: this.id,
	// 		},
	// 		$pull: {
	// 		  dislikedBy: this.id,
	// 		},
	// 	  },
	// 	  {
	// 		safe: true,
	// 		new: true,
	// 	  },
	// 	);
	//   }

	//   async dislike(videoId) {
	// 	return Video.findByIdAndUpdate(
	// 	  videoId,
	// 	  {
	// 		$addToSet: {
	// 		  dislikedBy: this.id,
	// 		},
	// 		$pull: {
	// 		  likedBy: this.id,
	// 		},
	// 	  },
	// 	  {
	// 		safe: true,
	// 		new: true,
	// 	  },
	// 	);
	//   }
}

// mongoose.plugin(autoIncrement);
UserSchema.loadClass(UserClass);

delete mongoose.connection.models.User;
export default mongoose.model('User', UserSchema);
