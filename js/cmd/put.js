export default async function put(args, addOutput) {
    if (args.length < 2 && args[0] !== '-v' && !(args[0] === '-r' && args[1] === '-a')) {
        return 'Usage: put [-a|-r|-v|-r -a] [filename] [text]';
    }

    const action = args[0];
    const fileName = args[1];
    const text = args.slice(2).join(' ');

    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const rootDirectory = fileSystem['/'];

    if (!rootDirectory.content[fileName]) {
        return `Error: ${fileName} does not exist`;
    }

    const file = rootDirectory.content[fileName];

    async function enforceStorageLimit() {
        const limitKB = parseFloat(localStorage.getItem('storageLimitKB'));
        if (isNaN(limitKB)) return;

        let totalSize = 0;
        const fileSizes = {};

        for (const file in rootDirectory.content) {
            if (rootDirectory.content[file].type === 'file') {
                const fileSize = new Blob([rootDirectory.content[file].content]).size;
                totalSize += fileSize;
                fileSizes[file] = fileSize;
            }
        }

        while (totalSize / 1024 > limitKB) {
            const oldestFile = Object.keys(fileSizes).sort((a, b) => fileSizes[a] - fileSizes[b])[0];
            totalSize -= fileSizes[oldestFile];
            delete rootDirectory.content[oldestFile];
            delete fileSizes[oldestFile];
        }

        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
    }

    if (action === '-a') {
        file.content += text;
        await enforceStorageLimit();
        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
        return `Text added to ${fileName}`;
    } else if (action === '-r') {
        if (args[1] === '-a') {
            file.content = '';
            localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
            return `All text removed from ${fileName}`;
        } else {
            file.content = file.content.replace(text, '');
            await enforceStorageLimit();
            localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
            return `Text removed from ${fileName}`;
        }
    } else if (action === '-v') {
        return file.content || `${fileName} is empty`;
    } else {
        return `Usage: put [-a|-r|-v|-r -a] [filename] [text]`;
    }
}