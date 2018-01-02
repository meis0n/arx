require('mongoose');
var Room = require('../Schemas/userSchema.js');
var UserSelector = require('../selectors/user.js');
var RoomSelector = require('../selectors/room.js');

module.exports = function (vk, message, user_id) {
	return UserSelector.getUserById(user_id).then((user) => {
		if (!/\/createroom [^\> ]+/.test(message)) {
			vk.api.messages.send({
				user_id,
				message: '[System] Неверное использование команды, попробуйте /createroom {room_title}'
			});
			return;
		}
		else if (!user) {
			vk.api.messages.send({
				user_id,
				message: '[System] Вы не зарегестрированы, отправьте команду /register {ваш_ник}'
			});
			return new Promise();
		}
		else {
			let roomTitle = message.split(' ')[1]
			RoomSelector.createRoom(user_id, roomTitle)
				.then((room) => {
					vk.api.messages.send({
						user_id,
						message: '[System] Комната ' + roomTitle + ' создана. Её номер: ' + room._id + '.'
					});
				});
		}
	});
}
