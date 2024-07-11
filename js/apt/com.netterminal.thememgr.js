export default function thememgr(args, addOutput) {
    if (args.length !== 1) {
        return 'Usage: thememgr [color]';
    }

    const color = args[0];
    document.documentElement.style.setProperty('--terminal-color', color);
    return `Terminal font color changed to ${color}`;
}