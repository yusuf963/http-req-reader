import fs from 'fs';
import { stringify } from 'flatted';

export function storeReqToJsonFile(req, filePath) {
	try {
		const reqJson = stringify(req, null, 2);
		fs.writeFileSync(filePath, reqJson);
		console.log('Request object stored successfully.');
	} catch (error) {
		console.error('Error storing request object:', error.message);
	}
}
