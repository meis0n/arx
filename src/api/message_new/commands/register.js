import User from '../../../db/models/user';

console.log('REGISTER', User);

export default (vk) => async (requestBody) => {
	const user_id = requestBody.object.user_id;
	const message = requestBody.object.body;

	const user = await User.getUserByVkId(user_id);

	if (!/\/register [^\> ]+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /register {nickname}'
		});
	}
	else if (user) {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже были зарегестрированы, просто введите /start'
		});
	}
	else {
		const nickname = message.split(' ')[1];
		const user = new User({
			vk_id: user_id,
			nickname,
			isOnline: false,
			currentRoom: null
		});

		await user.save();

		vk.api.messages.send({
				user_id,
				message: '[System] Вы зарегестрированы с ником ' + nickname + '! Для логина введите /start'
			});
	}
}
