require('mongoose');

var UserSelector = require('../selectors/user.js');
var RoomSelector = require('../selectors/room.js');
var RoomUserSelector = require('../selectors/roomUser.js');

module.exports = function (vk, message, user_id) {
	return UserSelector.getUserById(user_id).then((user) => {
		if (!/\/room [0-9]+/.test(message)) {
			vk.api.messages.send({
				user_id,
				message: '[System] Неверное использование команды, попробуйте /room {room_number}'
			});
		}
		else if (!user) {
			vk.api.messages.send({
				user_id,
				message: '[System] Вы не зарегестрированы, отправьте команду /register {ваш_ник}'
			});
			return;
		}
		else {
			let roomNumber = message.split(' ')[1];

			// RoomSelector.getRoom(roomNumber).then((room) => {
			// 	if()
			RoomUserSelector.setConnection(user_id, roomNumber).then(
				() => {
					vk.api.messages.send({
						user_id,
						message: '[System] Вы перешли в комнату ' + roomNumber
					});
				}
			);
			// });
		}
	});
}
