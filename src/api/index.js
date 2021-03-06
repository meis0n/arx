import { version } from '../../package.json';
import { Router } from 'express';
import commands from './commands';

export default (vk) => {
	let api = Router();

	// perhaps expose some API metadata at the root
	// api.get('/', commands({ config, db }));

	api.post('/', commands(vk));

	return api;
}
