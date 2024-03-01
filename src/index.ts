import { RequestInfo, RequestInfoParams } from './types';
export function paresCustomRequestId({
	req,
	customRequestHeader,
}: RequestInfoParams) {
	if (!customRequestHeader || customRequestHeader.length === 0)
		return 'No custom request header passed in';
	const result = {};
	for (const header of customRequestHeader) {
		result[header] = req.headers[header];
	}
	return result;
}

export function requestInfo({
	req,
	customRequestHeader,
}: RequestInfoParams): RequestInfo {
	const url = req.url;
	const cookies = req.cookies;
	const method = req.method;
	const hostname = req.hostname;
	const protocol = req.protocol;
	const queryParams = req.query;
	const userAgent = req.get('user-agent');
	const browser = userAgent.split(' ')[0];
	const headers = req.headers;
	const languages = req.acceptsLanguages();
	const timestamp = new Date().toLocaleString();
	const referrer = req.get('referrer') || req.get('referer');
	const customRequestHeaders = paresCustomRequestId({
		req,
		customRequestHeader,
	});
	const ip = req.ip || req.connection.remoteAddress; // socket or connection, but connect is depricated
	const os =
		req.get('sec-ch-ua-platform') + ' ' + req.get('user-agent').split(' ')[1];
	// const geolocation = geoip.lookup(ip);

	return {
		timestamp,
		customRequestHeaders,
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
