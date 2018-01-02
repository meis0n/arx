import User from '../../../db/models/user'

export default (vk) => async (message, user_id, user) => {
	if (!/\/nickname( [^\> ]+)+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /nickname {nickname}'
		});
		return;
	}

	const nickname = message.split(' ').slice(1).join(' ');
	await user.update(
		{
			$set: {
				nickname: nickname
			}
		});

	vk.api.messages.send({
		user_id,
		message: '[System] Ваш никнейм изменен на ' + nickname + '.'
	});
}
