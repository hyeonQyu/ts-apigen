import { SwaggerJson } from './defines/SwaggerJson';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateCode } = require('./utils/swaggerProcessor');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
    }),
);
app.use(bodyParser.json());

app.listen(6200, () => {
    console.log('express server started with port 6200');
});

const axios = require('axios');

(async () => {
    try {
        const { data } = await axios.get('http://localhost:8080/v2/api-docs');

        generateCode(data as SwaggerJson);
    } catch (e) {
        console.error('에러', e);
    }
})();
