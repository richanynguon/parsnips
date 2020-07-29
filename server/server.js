const {
	createConnection,
	ProposedFeatures,
	TextDocuments,
	TextDocumentSyncKind,
	DidChangeConfigurationNotification,
} = require("vscode-languageserver");
const { TextDocument } = require("vscode-languageserver-textdocument");

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
let connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
let document = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

// connection initializing
connection.onInitialize((params) => {
	let capabilities = params.capabilities;
	const { workspace, textDocument } = capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(workspace && !!workspace.configuration);
	hasWorkspaceFolderCapability = !!(workspace && !!workspace.workspaceFolders);
	hasDiagnosticRelatedInformationCapability = !!(
		textDocument &&
		textDocument.publishDiagnostics &&
		textDocument.publishDiagnostics.relatedInformation
	);

	const result = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
			},
		},
	};

	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true,
			},
		};
	}
	return result;
});

// connection post initializing
connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(
			DidChangeConfigurationNotification.type,
			undefined
		);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders((_event) => {
			connection.console.log("Worksapce folder change event recieved");
		});
	}
});

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
