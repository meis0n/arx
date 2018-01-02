import resource from 'resource-router-middleware';
import newMessage from './message_new';
import confirmation from './confirmation'
// import facets from '../models/facets';

export default (vk) => (req, res) => {
	switch (req.body.type){
		case 'message_new': {
			return newMessage(vk)(req, res);
		}
		case 'confirmation': {
			return confirmation(vk)(req, res);
		}
	}
}