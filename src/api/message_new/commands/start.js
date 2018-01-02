export default (vk) => async (message, user_id, user) => {
	if (!user.isOnline) {
		await user.setOnline();
		const messageForSending = `[System] Добро пожаловать! ${user.currentRoom ? `Вы находитесь в комнате ' + ${user.currentRoom}` : 'Вы еще не выбрали комнату, используйте команду /rooms'}`

		vk.api.messages.send({
			user_id,
			message: messageForSending
		});

        await user.sendMessageToAllInRoom(`[System] Пользователь ${user.nickname} входит в чат.`, vk);
	}
	else {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже онлайн. Наслаждайтесь, ' + user.nickname + '!' + (!user.currentRoom ? ' Но Вы еще выбрали комнату, используйте команду /rooms' : '')
		});
	}
}
