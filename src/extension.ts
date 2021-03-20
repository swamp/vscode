import * as vscode from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	Executable,
} from 'vscode-languageclient/node';
import { join } from 'path';

let client: LanguageClient;

function platformSpecificExePath(name :string) : string {
	const installPath = vscode.extensions.getExtension("swamp.swamp")?.extensionPath ?? '';
	if (installPath === '') {
		console.error("problem with install path");
	}

	const binPath = join(installPath, 'node_modules/swamp-compiler/resources/');
	const platform = process.platform;
	const platformBin = join(binPath, platform);
	const platformExe = join(platformBin, name);
	console.log(`swamp: platform specific binary path '${platformBin}'`);

	return platformExe;
}

function startServer(_context: vscode.ExtensionContext) {
	console.log(`swamp: start server`);


	const settings = vscode.workspace.getConfiguration('swamp');
	const shouldUsePackageCompiler = settings.get<boolean>("usePackagedCompiler");

	let compilerPath = "swamp";
	if (shouldUsePackageCompiler) {
		// For unknown reason we can not use the code in swamp-compiler package to detect its own path.
		compilerPath = platformSpecificExePath('swamp');
		console.log(`path is ${compilerPath}`);
	}

	let swampExecutable: Executable = { command: compilerPath, args: ["lsp"] };

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
