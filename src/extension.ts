import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('xamlLineUp.formatXaml', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const document = editor.document;

        if (document.languageId !== 'xml' && !document.fileName.endsWith('.xaml')) {
            vscode.window.showErrorMessage('This command only works for XAML files.');
            return;
        }

        const text = document.getText();

        // Custom formatting logic
        const formattedText = formatXaml(text);

        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(text.length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, formattedText);
        });
    });

    context.subscriptions.push(disposable);
}

function formatXaml(input: string): string {
    // Format attributes inline
    let formattedText = input.replace(/(\s+)([\w.:]+)="([^"]*)"/g, (match, whitespace, attribute, value) => {
        return ` ${attribute}="${value}"`;
    });

    // Ensure a space before self-closing tags ( />)
    formattedText = formattedText.replace(/(\S)(\/>)/g, (match, before, selfClose) => {
        return `${before} ${selfClose}`;
    });

    // Split the input into lines and process indentation
    let lines = formattedText.split(/(?=<)/g); // Split on opening tags
    let indentLevel = 0;
    const indentSize = 4; // Number of spaces for indentation
    const resultLines = [];

    for (let line of lines) {
        line = line.trim(); // Remove leading and trailing whitespace

        if (line.startsWith('</')) {
            // Closing tag: Decrease indentation
            indentLevel = Math.max(indentLevel - 1, 0);
        }

        // Add the line with proper indentation
        resultLines.push(' '.repeat(indentLevel * indentSize) + line);

        if (line.endsWith('>') && !line.startsWith('</') && !line.endsWith('/>')) {
            // Opening tag: Increase indentation
            indentLevel++;
        }
    }

    return resultLines.join('\n');
}




export function deactivate() {}
