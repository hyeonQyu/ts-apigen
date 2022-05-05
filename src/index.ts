import { SwaggerProcessor } from '@utils/swaggerProcessor';
import { SwaggerJson } from '@defines/swaggerJson';
import { ApigenConfig } from '@config/apigenConfig';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

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

(async () => {
    try {
        const { data } = await axios.get(ApigenConfig.config.apiDocsUri);

        SwaggerProcessor.generateCode(data as SwaggerJson);
    } catch (e) {
        console.error('에러', e);
    }
})();
