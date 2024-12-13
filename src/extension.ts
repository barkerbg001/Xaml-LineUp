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

    return formattedText;
}

export function deactivate() {}
