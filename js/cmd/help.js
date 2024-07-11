export default function help() {
    return `Available commands:
- help: Display this help message
- clear: Clear the terminal output
- storage: Initialize the file system
- ls: List files
- ls space: Show the total space used in the directory in KB
- ls space -l [amountinkb]: Set a storage limit
- ls space -l -r: Remove the storage limit
- mkfi [filename]: Create a new file
- mkfi -r [oldFilename] [newFilename]: Rename a file
- rm [filename]: Remove a file
- put [-a|-r|-v|-r -a] [filename] [text]: Add or remove text from a file, view file content, or remove all text from a file
- unicode [javascript] | unicode [filename].js: Execute JavaScript code or a saved .js file
- net -d [URL]: Download data from a URL and save it as a file
- net -i: Upload a file and save it in the directory
- thememgr [color]: Change the terminal font color
- apt: List installed apps`;
}