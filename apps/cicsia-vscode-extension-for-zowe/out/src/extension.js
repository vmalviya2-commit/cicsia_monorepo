"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Debug Point 1: Activation logging
    console.log('Debug Test: Extension is being activated');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    const disposable = vscode.commands.registerCommand('cicsia-vscode-extension-for-zowe.helloWorld', () => {
        // Debug Point 2: Command execution
        const timestamp = new Date().toISOString();
        console.log('Debug Test: Command executed at', timestamp);
        // Debug Point 3: Variable inspection
        const message = `Hello World from Zowe Extension! (${timestamp})`;
        // Debug Point 4: Conditional breakpoint opportunity
        if (timestamp.includes('T')) {
            console.log('Debug Test: Processing message');
            vscode.window.showInformationMessage(message);
        }
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map