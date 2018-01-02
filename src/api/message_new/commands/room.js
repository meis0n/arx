
import User from '../../../db/models/user';
import Room from '../../../db/models/room';

export default (vk) => async (message, user_id, user) => {
	if (!/\/room [0-9]+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /room {room_number}.'
		});
		return;
	}

	const roomNumber = message.split(' ')[1];
	const room = await Room.getByNumber(roomNumber);

	if (!room) {
		vk.api.messages.send({
			user_id,
			message: '[System] Комнаты с таким номером не существует.'
		});
		return;
	}


	if (room && user.currentRoom === room.id) {
		vk.api.messages.send({
			user_id,
			message: '[System] Вы уже в этой комнате.'
		});
		return;
	}

	let oldRoom;

	if (user.currentRoom) {
		oldRoom = await Room.getByNumber(user.currentRoom);

		await user.leaveRoom();

		oldRoom.usersIds.forEach(uid => {
			vk.api.messages.send({
				user_id: uid,
				message: `[System] Пользователь ${user.nickname} покидает комнату и переходит в комнату #${room.id} "${room.title}".`
			});
		});
	}

	console.log('GTO ', roomNumber);

	await user.moveToRoom(roomNumber);

	vk.api.messages.send({
		user_id,
		message: `[System] Вы перешли в комнату ${roomNumber} "${room.title}".`
	});

	room.usersIds.forEach(uid => {
		vk.api.messages.send({
			user_id: uid,
			message: `[System] Пользователь ${user.nickname} переходит в эту комнату${oldRoom? ` из комнаты #${oldRoom.id} "${oldRoom.title}"` : '.'}`
		});
	});
}
