import User from '../../../db/models/user';

export default (vk) => async (message, user_id, user) => {
	if (!/\/register [^\> ]+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /register {nickname}'
		});
		return;
	}

	if (user) {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже были зарегестрированы, просто введите /start'
		});
		return;
	}

	const nickname = message.split(' ')[1];
	const userForDb = new User({
		vk_id: user_id,
		nickname,
		isOnline: false,
		currentRoom: null
	});

	await userForDb.save();

	console.log('REGISTRED USER', userForDb);

	vk.api.messages.send({
		user_id,
		message: '[System] Вы зарегестрированы с ником ' + nickname + '! Для логина введите /start'
	});
}
