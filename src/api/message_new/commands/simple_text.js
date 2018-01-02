import Room from '../../../db/models/room';
export default (vk) => async (message, user_id, user) => {

	if (!user.isOnline) {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы не онлайн, отправьте команду /start'
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

	await user.sendMessageToAllInRoom(`${user.nickname}: ${message}`, vk, /*withWarning*/ true );
}
