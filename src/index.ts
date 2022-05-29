import { UiExecutor } from './utils/uiExecutor';
import { Controller } from './apis/controller';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

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

Controller.response(app);

if (process.env.NODE_ENV !== 'development') {
    UiExecutor.runHtmlUi();
}
