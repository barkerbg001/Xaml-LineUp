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
    // Match and reformat all attributes, including those with namespaces and complex names
    return input.replace(/(\s+)([\w.:]+)="([^"]*)"/g, (match, whitespace, attribute, value) => {
        // Ensure attributes remain inline
        return ` ${attribute}="${value}"`;
    });
}


export function deactivate() {}
