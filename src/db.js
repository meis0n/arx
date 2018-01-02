import mongoose from 'mongoose' 

export default callback => {
	
	mongoose.Promise = global.Promise;
	mongoose.connect(process.env.DB_URL);

	console.log('DB CONNECTED');
	
	callback();
}
