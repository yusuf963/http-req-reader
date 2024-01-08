import { RequestInfo, RequestInfoParams } from './types';
export function paresCustomRequestId({
	req,
	customRequestIdHeader,
}: RequestInfoParams) {
	if (!customRequestIdHeader) return '';
	const result = {};
	result[customRequestIdHeader] = req.headers[customRequestIdHeader] || '';
	return result;
}

export function requestInfo({ req, customRequestIdHeader }: RequestInfoParams): RequestInfo {
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
	const customRequestId = paresCustomRequestId({ req, customRequestIdHeader });
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
