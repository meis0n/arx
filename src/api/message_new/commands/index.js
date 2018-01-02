// import start from './start.js';
import register from './register.js';
// import nickname from './nickname.js';
// import create_room from './create_room';
// import room from './room';
// import simple_text from './simple_text';

// import command_not_found from './command_not_found';
// import simple_text from './simple_text';

const allCommands = {
    // '/start': start,
    // '/chat': start,
    '/register': register,
    // '/nickname': nickname,
    // '/room': room,
    // '/createroom': create_room,
};

export  const applyCommand = (vk) => async (requestBody) =>{
    const command = requestBody.object.body.split(' ')[0]; //  Something like "/xxxxxxxx" is here;

    if(allCommands[command]){
        await allCommands[command](vk)(requestBody);
    }
    else{
        // await command_not_found(requestBody);
    }
}

export const simpleText = (vk) => async (requestBody) =>{
    await simple_text(requestBody);
}