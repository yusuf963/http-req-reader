Usage

```
// in your file

const { requestInfo } = require('http-req-reader'); // concise syntax, or
import { requestInfo } from 'http-req-reader';

...
// preferebly right after request object available
 console.log(requestInfo({req, customRequestIdHeader:'x-my-req-id-header'}))

```
