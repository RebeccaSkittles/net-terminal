export default async function net(args, addOutput) {
    if (args.length !== 1 || (args[0] !== '-d' && args[0] !== '-i')) {
        return 'Usage: net -d [URL] | net -i';
    }

    async function enforceStorageLimit(fileSystem) {
        const limitKB = parseFloat(localStorage.getItem('storageLimitKB'));
        if (isNaN(limitKB)) return;

        let totalSize = 0;
        const rootDirectory = fileSystem['/'];
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

    if (args[0] === '-d') {
        const url = args[1];
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to download: ${response.statusText}`);
            }
            const data = await response.text();

            const urlParts = url.split('/');
            const fileName = urlParts[urlParts.length - 1] || 'downloaded_file.txt';

            const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
            const rootDirectory = fileSystem['/'];

            if (rootDirectory.content[fileName]) {
                return `Error: File ${fileName} already exists`;
            }

            rootDirectory.content[fileName] = {
                type: 'file',
                content: data
            };

            await enforceStorageLimit(fileSystem);

            localStorage.setItem('fileSystem', JSON.stringify(fileSystem));

            addOutput(`Downloaded data saved as ${fileName}`);
        } catch (error) {
            addOutput(`Error: ${error.message}`);
        }
    } else if (args[0] === '-i') {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = async () => {
                const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
                const rootDirectory = fileSystem['/'];

                if (rootDirectory.content[file.name]) {
                    addOutput(`Error: File ${file.name} already exists`);
                    return;
                }

                rootDirectory.content[file.name] = {
                    type: 'file',
                    content: reader.result
                };

                await enforceStorageLimit(fileSystem);

                localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
                addOutput(`Uploaded file saved as ${file.name}`);
            };

            reader.onerror = () => {
                addOutput(`Error reading file: ${file.name}`);
            };

            reader.readAsText(file);
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }
}