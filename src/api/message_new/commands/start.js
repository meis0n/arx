export default (vk) => async (message, user_id, user) => {
	if (!user.isOnline) {
		await user.setOnline();

		vk.api.messages.send({
			user_id,
			message: '[System] Добро пожаловать!' + user.currentRoom ? 'Вы находитесь в комнате ' + user.currentRoom : 'Вы еще выбрали комнату, используйте команду /rooms'
		});
	}
	else {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже онлайн. Наслаждайтесь, ' + user.nickname + '!' + (!user.currentRoom ? ' Но Вы еще выбрали комнату, используйте команду /rooms' : '')
		});
	}
}
