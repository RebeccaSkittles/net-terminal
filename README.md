### README.md

# Web Terminal OS

A web-based terminal emulator that supports various commands and functionalities, simulating a basic operating system. 

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
  - [Commands](#commands)
- [File Structure](#file-structure)
- [Releases](#releases)
  - [24JJ02A](#24jj02a)
  - [24JJ01A](#24jj01a)
- [Future Features](#future-features)
- [License](#license)
- [Creator](#creator)

## Features

- Command execution similar to a Unix-like terminal
- File system operations: list files, create files, rename files, delete files
- Text operations: add text, remove text, view file content
- Download and upload files
- Storage limit enforcement
- Theme management
- Command and file history
- Tab completion

## Dependencies

- None

## Installation

Clone the repository and open the `index.html` file in your browser.

```sh
git clone https://github.com/your-username/web-terminal-os.git
cd web-terminal-os
open index.html
```

## Usage

### Commands

#### help
Displays a list of available commands.
```sh
help
```

#### clear
Clears the terminal output.
```sh
clear
```

#### storage
Initializes the file system.
```sh
storage
```

#### ls
Lists files in the directory.
```sh
ls
```

#### ls space
Shows the total space used in the directory in KB.
```sh
ls space
```

#### ls space -l [amountinkb]
Sets a storage limit in KB.
```sh
ls space -l 100
```

#### ls space -l -r
Removes the storage limit.
```sh
ls space -l -r
```

#### mkfi [filename]
Creates a new file.
```sh
mkfi example.txt
```

#### mkfi -r [oldFilename] [newFilename]
Renames a file.
```sh
mkfi -r example.txt newname.txt
```

#### rm [filename]
Removes a file.
```sh
rm example.txt
```

#### put [-a|-r|-v|-r -a] [filename] [text]
Adds or removes text from a file, views file content, or removes all text from a file.

- Add text
  ```sh
  put -a example.txt "Some text to add"
  ```
- Remove text
  ```sh
  put -r example.txt "Some text to remove"
  ```
- View text
  ```sh
  put -v example.txt
  ```
- Remove all text
  ```sh
  put -r -a example.txt
  ```

#### unicode [javascript] | unicode [filename].js
Executes JavaScript code or a saved .js file.
- Execute JavaScript code
  ```sh
  unicode console.log('Hello World')
  ```
- Execute a saved .js file
  ```sh
  unicode example.js
  ```

#### net -d [URL]
Downloads data from a URL and saves it as a file.
```sh
net -d https://example.com/file.txt
```

#### net -i
Uploads a file and saves it in the directory.
```sh
net -i
```

#### thememgr [color]
Changes the terminal font color.
```sh
thememgr blue
```

#### apt
Lists installed apps.
```sh
apt
```

## File Structure

```
/project-root
  /js
    /cmd
      apt.js
      clear.js
      help.js
      ls.js
      mkfi.js
      net.js
      put.js
      rm.js
      storage.js
      thememgr.js
      unicode.js
    /apt
      com.netterminal.thememgr.js
    index.js
  /css
    styles.css
  index.html
```

### js/cmd
Contains command scripts for the terminal.

### js/apt
Contains application scripts for the terminal.

### index.js
Main JavaScript file handling command execution and terminal functionality.

### css/styles.css
Stylesheet for the terminal UI.

### index.html
HTML file containing the structure of the terminal.

## Releases

### 24JJ02A
**Version PRE 1.0**

- Fixed a bug where `ls space -l -r` didn't work to remove the storage limit.
- Previous build: [24JJ01A](#24jj01a)

### 24JJ01A
**Version PRE 1.0**

This is the initial pre-release version of the Web Terminal OS, version `PRE 1.0`. This release introduces the foundational features and functionality of the web-based terminal emulator, designed to simulate a basic operating system experience within a web browser.

#### Features

- **Command Execution**: Execute various commands similar to a Unix-like terminal.
- **File System Operations**:
  - List files (`ls`)
  - Create files (`mkfi`)
  - Rename files (`mkfi -r`)
  - Delete files (`rm`)
- **Text Operations**:
  - Add text to files (`put -a`)
  - Remove text from files (`put -r`)
  - View file content (`put -v`)
  - Clear all text in a file (`put -r -a`)
- **Storage Management**:
  - Set and enforce storage limits (`ls space -l`)
  - View total space used (`ls space`)
  - Remove storage limits (`ls space -l -r`)
- **File Upload and Download**:
  - Download files from a URL (`net -d`)
  - Upload local files (`net -i`)
- **Customization**:
  - Change terminal font color (`thememgr`)
- **Application Management**:
  - List installed apps (`apt`)
- **Utility**:
  - Clear terminal output (`clear`)
  - Display help information (`help`)
- **JavaScript Execution**:
  - Execute inline JavaScript (`unicode`)
  - Execute JavaScript from a file (`unicode [filename].js`)
- **Interactive Features**:
  - Command and file history navigation
  - Tab completion for commands and files

#### Known Issues

- Some commands may not handle large files efficiently.
- Browser compatibility may vary; testing primarily conducted on modern browsers.

#### Notes

This is a pre-release version intended for testing and feedback. Future releases will include enhancements, bug fixes, and additional features based on user feedback.

## Future Features

- Auto software updates
- Additional commands
- More integrated applications
- Enhanced user interface
- Improved performance and stability

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Creator

- **Rebecca Skittles** - [your-username](https://github.com/RebeccaSkittles)
```
