import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import dotenv from 'dotenv';
import VK from 'vk-io';
import 'babel-polyfill';

dotenv.config();

const vk = new VK();
vk.setToken(process.env.VK_TOKEN);

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json());

// connect to db
initializeDb( connection => {

	// internal middleware
	app.use(middleware({ config, connection }));

	// api router
	app.use('/', api(vk));

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
