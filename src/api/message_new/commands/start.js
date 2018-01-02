require('mongoose');
// var User = require('../../Schemas/user.js');
import User from '../../../models/user';
// var RoomUser = require('../Schemas/roomUserSchema.js');
var UserSelector = require('../selectors/user.js');

module.exports = function (vk, message, user_id) {
	return UserSelector.getUserById(user_id).then((user) => {
		if (!user) {
			vk.api.messages.send({
				user_id,
				message: '[System] Вы не зарегестрированы, отправьте команду /register {ваш_ник}'
			});
			return;
		}
		else {
			if (!user.isOnline) {
				User.update(
					{
						_id: user_id
					},
					{
						$set: {
							isOnline: true
						}
					})
					.then(() => {
						vk.api.messages.send({
							user_id,
							message: '[System] Добро пожаловать!' + user.currentRoom ? 'Вы находитесь в комнате ' + user.currentRoom : 'Вы еще выбрали комнату, используйте команду /rooms'
						});
					});
			}
			else {
				vk.api.messages.send({
					user_id,
					message: '[System] Вы уже онлайн. Наслаждайтесь, ' + user.nickname +'!' + ( !user.currentRoom ? ' Но Вы еще выбрали комнату, используйте команду /rooms' : '')
				});
			}
		}
	});
}
