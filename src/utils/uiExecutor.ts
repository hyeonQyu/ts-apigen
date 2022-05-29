const { exec } = require('child_process');

export namespace UiExecutor {
    export function runHtmlUi() {
        exec(`${getCommandLine()} ${process.cwd()}/dist/ui/index.html`);
    }

    function getCommandLine(): string {
        switch (process.platform) {
            case 'darwin':
                return 'open';
            case 'win32':
                return 'start';
            default:
                return 'xdg-open';
        }
    }
}
