import User from '../../../db/models/user';
import start from './start.js';

import register from './register.js';
import { request } from 'https';
// import nickname from './nickname.js';
// import create_room from './create_room';
// import room from './room';
// import simple_text from './simple_text';

// import command_not_found from './command_not_found';
// import simple_text from './simple_text';

const allCommands = {
    '/start': start,
    // '/chat': start,
    '/register': register,
    // '/nickname': nickname,
    // '/room': room,
    // '/createroom': create_room,
};

export const applyCommand = (vk) => async (requestBody) => {
    const message = requestBody.object.body;
    const vk_id = requestBody.object.user_id;
    const command = message.split(' ')[0]; //  Something like "/xxxxxxxx" is here;
    let user = await User.getUserByVkId(vk_id);

    if (!user && command !== '/register') {
        vk.api.messages.send({
            user_id,
            message: '[System] Вы не зарегестрированы, отправьте команду /register {ваш_ник}'
        });
        return;
    }

    if (allCommands[command]) {
        await allCommands[command](vk)(message, vk_id, user);
    }
    else {
        // await command_not_found(requestBody);
    }
}

export const simpleText = (vk) => async (requestBody) => {
    await simple_text(requestBody);
}