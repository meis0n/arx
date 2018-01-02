import resource from 'resource-router-middleware';
// import facets from '../models/facets';

export default (req, res) => {
	res.send(process.env.ARX_RESPONSE);
}