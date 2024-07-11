export default function storage() {
    if (!localStorage.getItem('fileSystem')) {
        const fileSystem = {
            '/': {
                type: 'directory',
                content: {}
            },
            '/apt': {
                type: 'directory',
                content: {
                    'com.netterminal.thememgr.js': {
                        type: 'file',
                        content: ''
                    }
                }
            }
        };
        localStorage.setItem('fileSystem', JSON.stringify(fileSystem));
    }

    return 'File system initialized.';
}