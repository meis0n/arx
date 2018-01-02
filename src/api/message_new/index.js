import {isCommand} from '../../lib/util';
import {applyCommand, simpleText} from './commands';

export default  (vk) => async (req, res) => {
    const message = req.body.object.body;

    if(isCommand(message)){
        await applyCommand(vk)(req.body);
    }
    else{
        await simpleText(vk)(req.body);
    }
    
    res.status(200);
    res.end('ok');
}