export default async function unicode(args, addOutput) {
    if (args.length === 0) {
        return 'Usage: unicode [javascript] | unicode [filename].js';
    }

    const code = args.join(' ');
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const rootDirectory = fileSystem['/'];

    if (code.endsWith('.js') && rootDirectory.content[code]) {
        // Execute the content of the file
        const fileContent = rootDirectory.content[code].content;
        try {
            const result = eval(fileContent);
            if (result !== undefined) {
                addOutput(result.toString());
            } else {
                addOutput('Command executed');
            }
        } catch (error) {
            addOutput(`Error: ${error.message}`);
        }
    } else {
        // Execute the provided JavaScript code
        try {
            const result = eval(code);
            if (result !== undefined) {
                addOutput(result.toString());
            } else {
                addOutput('Command executed');
            }
        } catch (error) {
            addOutput(`Error: ${error.message}`);
        }
    }
}