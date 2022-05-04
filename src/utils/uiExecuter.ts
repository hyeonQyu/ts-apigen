const { exec } = require('child_process');

const getCommandLine = (): string => {
    switch (process.platform) {
        case 'darwin':
            return 'open';
        case 'win32':
            return 'start';
        default:
            return 'xdg-open';
    }
};

module.exports = {
    runHtmlUi() {
        exec(`${getCommandLine()} ./ui/dist.html`);
    },
};
