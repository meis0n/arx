export default (vk) => async (message, user_id, user) => {
	if (user.isOnline) {
		await user.setOffline();
		const messageForSending = `[System] Удачи, ${user.nickname}!`;

		vk.api.messages.send({
			user_id,
			message: messageForSending
		});
	}
	else {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже оффлайн.'
		});
	}
}
