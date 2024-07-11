export default function ls(args, addOutput) {
    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const rootDirectory = fileSystem['/'];

    if (args.length > 0) {
        if (args[0] === 'space') {
            let totalSize = 0;
            for (const file in rootDirectory.content) {
                if (rootDirectory.content[file].type === 'file') {
                    totalSize += new Blob([rootDirectory.content[file].content]).size;
                }
            }
            const totalSizeKB = (totalSize / 1024).toFixed(2);

            if (args.length === 1) {
                const limitKB = localStorage.getItem('storageLimitKB');
                if (limitKB) {
                    addOutput(`Total space used: ${totalSizeKB} KB of ${limitKB} KB`);
                } else {
                    addOutput(`Total space used: ${totalSizeKB} KB`);
                }
            } else if (args.length === 3 && args[1] === '-l') {
                const limitKB = parseFloat(args[2]);
                if (!isNaN(limitKB)) {
                    localStorage.setItem('storageLimitKB', limitKB);
                    addOutput(`Storage limit set to ${limitKB} KB`);
                } else {
                    addOutput('Usage: ls space -l [amountinkb]');
                }
            } else if (args.length === 3 && args[1] === '-l' && args[2] === '-r') {
                localStorage.removeItem('storageLimitKB');
                addOutput('Storage limit removed');
            } else {
                addOutput('Usage: ls space [-l [amountinkb] | -l -r]');
            }
            return '';
        } else {
            addOutput('Usage: ls space [-l [amountinkb] | -l -r]');
            return '';
        }
    }

    const items = Object.keys(rootDirectory.content);
    if (items.length === 0) {
        return 'Directory is empty';
    } else {
        return items.join('\n');
    }
}