export default function mkfi(args) {
    if (args.length === 3 && args[0] === '-r') {
        return renameFile(args[1], args[2]);
    } else if (args.length === 1) {
        return createFile(args[0]);
    } else {
        return 'Usage: mkfi [filename] | mkfi -r [oldFilename] [newFilename]';
    }
}

function createFile(fileName) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const rootDirectory = fileSystem['/'];

    if (rootDirectory.content[fileName]) {
        return `Error: File ${fileName} already exists`;
    }

    rootDirectory.content[fileName] = {
        type: 'file',
        content: ''
    };

    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
    return `File ${fileName} created.`;
}

function renameFile(oldFileName, newFileName) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const rootDirectory = fileSystem['/'];

    if (!rootDirectory.content[oldFileName]) {
        return `Error: ${oldFileName} does not exist`;
    }

    if (rootDirectory.content[newFileName]) {
        return `Error: ${newFileName} already exists`;
    }

    rootDirectory.content[newFileName] = rootDirectory.content[oldFileName];
    delete rootDirectory.content[oldFileName];

    localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
    return `File ${oldFileName} renamed to ${newFileName}`;
}