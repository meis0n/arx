import Room from '../../../db/models/room';
import { roomTitleLengthMIN, roomTitleLengthMAX } from '../../../config.js'

export default (vk) => async (message, user_id, user) => {
	if (!/\/createroom( [^\> ]+)+/.test(message)) {
		vk.api.messages.send({
			user_id,
			message: '[System] Неверное использование команды, попробуйте /createroom {room_title}'
		});
		return;
	}

	const roomTitle = message.split(' ').slice(1).join(' ');

	if (roomTitle.length < roomTitleLengthMIN || roomTitle.length > roomTitleLengthMAX) {
		vk.api.messages.send({
			user_id,
			message: `[System] Название комнаты должно быть длиннее ${roomTitleLengthMIN - 1} символов и короче ${roomTitleLengthMAX + 1}.`
		});
		return;
	}

	const roomForDb = new Room({
		adminsIds: user.vk_id,
		title: roomTitle
	});

	await roomForDb.save();

	console.log('ADDED NEW ROOM', {
		roomForDb,
		user
	});

	vk.api.messages.send({
		user_id,
		message: `[System] Комната "${roomTitle}" создана. Её номер: "${roomForDb.id}".`
	});
}
