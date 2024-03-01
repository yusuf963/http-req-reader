import { Request } from 'express';

export type RequestInfoParams = {
	req: Request;
	customRequestHeader?: string[];
};

export type RequestInfo = {
	timestamp: string;
	customRequestHeaders: object;
	languages: string[];
	protocol: string;
	method: string;
	hostname: string;
	url: string;
	queryParams: import('qs').ParsedQs;
	headers: import('http').IncomingHttpHeaders;
	cookies: object;
	ip: string;
	referrer: string;
	browser: string;
	userAgent: string;
	os: string;
};
