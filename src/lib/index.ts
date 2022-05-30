import { UiExecutor } from './utils/uiExecutor';
import { Controller } from './apis/controller';
import { AppOption } from './defines/appOption';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { program } = require('commander');

module.exports = {
    run(defaultOption: AppOption) {
        program
            .option('-p, --port <port>', 'port number of generator')
            .option('-e, --env <port>', 'production or development')
            .action(() => {
                const options: AppOption = program.opts();
                const { port = defaultOption.port, env = defaultOption.env } = options;

                app.use(cors());
                app.use(bodyParser.json({ limit: '50mb' }));
                app.use(
                    bodyParser.urlencoded({
                        extended: true,
                        limit: '50mb',
                    }),
                );
                app.use(bodyParser.json());

                app.listen(port, () => {
                    console.log(`express server started with port ${port}`);
                });

                Controller.response(app);

                if (env === 'production') {
                    UiExecutor.runHtmlUi();
                }
            })
            .parse(process.argv);
    },
};
