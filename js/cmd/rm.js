export default function rm(args) {
    if (args.length !== 1) {
        return 'Usage: rm [filename]';
    }

    const fileName = args[0];
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem'));
    const rootDirectory = fileSystem['/'];

    if (!rootDirectory.content[fileName]) {
        return `Error: ${fileName} does not exist`;
    }

    delete rootDirectory.content[fileName];

    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
    return `${fileName} removed.`;
}