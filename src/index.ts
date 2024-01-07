import express from 'express';

const app = express();

function paresRequestId({ req, customRequestIdHeader }) {
	const result = {};
	result[customRequestIdHeader] = req.headers[customRequestIdHeader] || '';
	return result;
}

function requestInfo({ req, customRequestIdHeader }) {
	const ip = req.ip || req.connection.remoteAddress;
	const userAgent = req.get('user-agent');
	const browser = userAgent.split(' ')[0];
	const timestamp = new Date().toLocaleString();
	const url = req.url;
	const queryParams = req.query;
	const method = req.method;
	const referrer = req.get('referrer') || req.get('referer');
	const hostname = req.hostname;
	const protocol = req.protocol;
	const cookies = req.cookies;
	const headers = req.headers;
	const languages = req.acceptsLanguages();
	const customRequestId = paresRequestId({ req, customRequestIdHeader });
	const os =
		req.get('sec-ch-ua-platform') + ' ' + req.get('user-agent').split(' ')[1];
	// const geolocation = geoip.lookup(ip);

	return {
		timestamp,
		customRequestId,
		languages,
		protocol,
		method,
		hostname,
		url,
		queryParams,
		headers,
		cookies,
		ip,
		referrer,
		browser,
		userAgent,
		os,
		// geolocation,
	};
}

// Example route using the requestInfo function
// app.get("/", (req, res) => {
//   const info = requestInfo(req);
//   res.json(info);
// });

app.get('/', (req, res) => {
	req.headers['x-req-id'] = 'tgdgh8764hgwghfftThg-098';
	const info = requestInfo({ req, customRequestIdHeader: 'x-req-id' });
	console.log('INFO:--->', info);
	// Simulate content negotiation based on Accept-Language header
	const acceptLanguage = req.headers['accept-language'] || 'en';

	if (acceptLanguage.includes('es')) {
		res.send('<p>Hola</p>');
	} else {
		res.send('<p>Hello</p>');
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
