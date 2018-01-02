export default (vk) => async (message, user_id, user) => {
	if (user.isOnline) {
		await user.setOffline();

		vk.api.messages.send({
			user_id,
			message:  `[System] Удачи, ${user.nickname}!`
        });
        
        await user.sendMessageToAllInRoom(`[System] Пользователь ${user.nickname} выходит из чата.`, vk);
	}
	else {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже оффлайн.'
		});
	}
}
