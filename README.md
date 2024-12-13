# XAML LineUp

A VS Code extension that formats XAML attributes inline, keeping them on the same line for improved readability.

## Features

- Formats XAML attributes to appear inline rather than on separate lines.
- Adds a right-click context menu option to format XAML files in both the editor and Explorer.
- Includes a default keybinding (`Ctrl+Alt+F`) to quickly format XAML files.

## Usage

1. Open a `.xaml` file in VS Code.
2. Use one of the following methods to format the file:
   - **Right-Click Context Menu**:
     - In the editor, right-click and select **"XAML LineUp: Format XAML"**.
     - In the Explorer, right-click a `.xaml` file and select **"XAML LineUp: Format XAML"**.
   - **Keyboard Shortcut**:
     - Press `Ctrl+Alt+F` (or `Cmd+Alt+F` on Mac) while a `.xaml` file is open in the editor.
   - **Command Palette**:
     - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac), type **"XAML LineUp: Format XAML"**, and press Enter.

## Installation

1. Download the `.vsix` file from the release or package it yourself.
2. Open VS Code.
3. Go to the Extensions view (`Ctrl+Shift+X`) and click the `...` menu in the top-right corner.
4. Select **Install from VSIX...** and choose the `.vsix` file.
5. Reload VS Code if needed.

## Customizing Keybindings

The default keybinding is `Ctrl+Alt+F`. To change it:

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
2. Search for **"Preferences: Open Keyboard Shortcuts (JSON)"** and select it.
3. Add or modify the following entry:
   ```json
   {
       "key": "ctrl+alt+f",
       "command": "xamlLineUp.formatXaml",
       "when": "editorTextFocus && resourceExtname == '.xaml'"
   }
   ```

## Known Issues

- Formatting might not work correctly if attributes span multiple lines in unusual ways.
- Please report any issues on [GitHub Issues](https://github.com/barkerbg001/Xaml-LineUp/issues).

## Release Notes

### 0.0.4
- New Feature: Ensures a space is added before self-closing tags (/> → />) for better readability and adherence to XAML formatting standards.
### 0.0.3
- Added right-click context menu options for editor and Explorer.
- Added default keybinding (`Ctrl+Alt+F`) for formatting.

### 0.0.2
- Fix formating problem when x:Name attributes made it go to the next line.

### 0.0.1
- Initial release with inline XAML attribute formatting.

## Support

For support, please open an issue on [GitHub](https://github.com/barkerbg001/Xaml-LineUp/issues).