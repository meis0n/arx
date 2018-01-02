import Room from '../../../db/models/room';

export default (vk) => async (message, user_id, user) => {
	if (!/\/createroom [^\> ]+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /createroom {room_title}'
		});
		return;
	}
	else {
		let roomTitle = message.split(' ')[1];

		const roomForDb = new Room({
			adminsIds: user.id,
			title: roomTitle
		});

		await roomForDb.save();

		console.log('ADDED NEW ROOM', {
			roomForDb,
			user
		});

		vk.api.messages.send({
			user_id,
			message: '[System] Комната ' + roomTitle + ' создана. Её номер: ' + roomForDb.id + '.'
		});
	}
}
