import express from 'express';
import { requestInfo } from '../src/index';
const app = express();
// app.use((req, res, next) => {
// 	//storeReqToJsonFile(req, 'request-2.json');
// 	next();
// });

app.get('/', (req, res) => {
    const reqInfo = requestInfo({ req, customRequestIdHeader: 'x-custom-req-id-header' });
    console.log(reqInfo);
    req.headers['x-req-id'] = 'tgdgh8764hgwghfftThg-098';
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
