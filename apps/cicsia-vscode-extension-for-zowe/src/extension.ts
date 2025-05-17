import * as vscode from 'vscode';
import { SharedUIPanel } from './webview/panel';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "cicsia-vscode-extension-for-zowe" is now active!');

	let disposable = vscode.commands.registerCommand('cicsia-vscode-extension-for-zowe.showUI', () => {
		SharedUIPanel.render(context.extensionUri);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
