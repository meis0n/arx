require('mongoose');
var User = require('../Schemas/userSchema.js');
var UserSelector = require('../selectors/user.js');

module.exports = function (vk, message, user_id) {
	return UserSelector.getUserById(user_id).then((user) => {
		if (!/\/nickname [^\> ]+/.test(message)) {
			vk.api.messages.send({
				user_id,
				message: '[System] Неверное использование команды, попробуйте /nickname {nickname}'
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
			let nickname = message.split(' ')[1]
			User.update(
				{
					vk_id: user_id
				},
				{
					$set: {
						nickname: nickname
					}
				})
				.then(() => {
					vk.api.messages.send({
						user_id,
						message: '[System] Ваш никнейм изменен на ' + nickname + '.'
					});
				});
		}
	});
}
