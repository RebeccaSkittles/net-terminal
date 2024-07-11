export default function apt(args, addOutput) {
    if (args.length !== 0) {
        return 'Usage: apt';
    }

    const fileSystem = JSON.parse(localStorage.getItem('fileSystem')) || {'/': {type: 'directory', content: {}}};
    const aptDirectory = fileSystem['/apt'];

    if (!aptDirectory || aptDirectory.type !== 'directory') {
        return 'Error: apt directory does not exist';
    }

    const apps = Object.keys(aptDirectory.content).map(app => app.replace('.js', ''));
    if (apps.length === 0) {
        return 'No apps installed';
    }

    addOutput(apps.join('\n'));
    return '';
}