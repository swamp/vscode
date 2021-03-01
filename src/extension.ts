import * as vscode from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Executable,
} from 'vscode-languageclient/node';

let client: LanguageClient;

function startServer(_context: vscode.ExtensionContext) {
	let swampExecutable: Executable = { command: "swamp", args: ["lsp"] };

	let serverOptions: ServerOptions = {
		run: swampExecutable,
		debug: swampExecutable
	};

	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'swamp' }],
		synchronize: {
			fileEvents: vscode.workspace.createFileSystemWatcher('**/*.swamp')
		}
	};

	client = new LanguageClient(
		'swamp',
		'swamp-lsp',
		serverOptions,
		clientOptions, true
	);

	client.start();
	console.log('swamp: started client');
}

export function activate(context: vscode.ExtensionContext) {
	console.log('swamp: extension is now active');

	let disposable = vscode.commands.registerCommand('swamp.compile', () => {
		vscode.window.showInformationMessage('Compiling Swamp');
	});

	context.subscriptions.push(disposable);

	startServer(context);
}

export function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
