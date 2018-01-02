require('mongoose');

var UserSelector = require('../selectors/user.js');
var RoomUserSelector = require('../selectors/roomUser.js');

module.exports = function (vk, message, user_id) {
	return UserSelector.getUserById(user_id).then((user) => {
		if (!user) {
			vk.api.messages.send({
				user_id,
				message: '[System] Вы не зарегестрированы, отправьте команду /register {ваш_ник}'
			});
			return;
		}
		if (!user.isOnline) {
			vk.api.messages.send({
				user_id,
				message: '[System] Вы не онлайн, отправьте команду /start'
			});
			return;
		}
		else {
			RoomUserSelector.getHeighborhoods(user_id).then(
				(users) => {
					var author = users.find(x => x._id === user_id);

					users.filter(user => user.isOnline)
						.forEach(user => vk.api.messages.send({
							user_id: user._id,
							message: author.nickname + ': ' + message
						}));
				});
		}
	});
}
