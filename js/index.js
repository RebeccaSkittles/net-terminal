document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    let commandHistory = [];
    let historyIndex = -1;

    runStartupCommands();

    input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const commandLine = input.value.trim();
            if (commandLine !== '') {
                addOutput(`$ ${commandLine}`);
                commandHistory.push(commandLine);
                historyIndex = commandHistory.length;
                await executeCommand(commandLine);
                input.value = '';
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            handleTabCompletion();
        } else if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex -= 1;
                input.value = commandHistory[historyIndex];
            }
            event.preventDefault();
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex += 1;
                input.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
            event.preventDefault();
        }
    });

    function addOutput(text) {
        const line = document.createElement('div');
        line.textContent = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    async function executeCommand(commandLine) {
        const [command, ...args] = commandLine.split(' ');

        try {
            const module = await import(`./cmd/${command}.js`);
            const response = await module.default(args, addOutput);
            if (response) {
                addOutput(response);
            }
        } catch (cmdError) {
            console.error(`Error executing command: ${command}`, cmdError);
            // If command not found, try to load from apt
            try {
                const appModule = await import(`./apt/com.netterminal.${command}.js`);
                const response = await appModule.default(args, addOutput);
                if (response) {
                    addOutput(response);
                }
            } catch (appError) {
                console.error(`Error executing app: ${command}`, appError);
                addOutput(`Command or app not found: ${command}`);
            }
        }
    }

    function handleTabCompletion() {
        const commandLine = input.value.trim();
        const [command, ...args] = commandLine.split(' ');

        const availableCommands = ['help', 'clear', 'storage', 'ls', 'mkfi', 'rm', 'put', 'unicode', 'net', 'apt'];
        const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
        const rootDirectory = fileSystem['/'];
        const availableFiles = Object.keys(rootDirectory.content);

        if (args.length === 0) {
            const matches = availableCommands.filter(cmd => cmd.startsWith(command));
            if (matches.length === 1) {
                input.value = matches[0] + ' ';
            } else if (matches.length > 1) {
                addOutput(matches.join(' '));
            }
        } else {
            const lastArg = args[args.length - 1];
            const matches = availableFiles.filter(file => file.startsWith(lastArg));
            if (matches.length === 1) {
                args[args.length - 1] = matches[0];
                input.value = command + ' ' + args.join(' ');
            } else if (matches.length > 1) {
                addOutput(matches.join(' '));
            }
        }
    }

    async function runStartupCommands() {
        await executeCommand('storage');
    }
});