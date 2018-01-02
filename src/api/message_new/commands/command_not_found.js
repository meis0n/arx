export default (vk) => async (message, user_id, user) => {
	vk.api.messages.send({
		user_id,
		message: '[System] Неизвестная команда, для того, чтобы увидеть помощь, введите /help.'
	});
}
