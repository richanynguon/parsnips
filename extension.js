const vscode = require("vscode");
const { returnFunctionParents } = require("./utils");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "parsnips" is now active!');

	vscode.languages.registerHoverProvider("javascript", {
		provideHover(document, position, token) {
			
			const results = returnFunctionParents(document, position);

			return {
				contents: results,
			};
		},
	});

	const hell0 = vscode.window.showInformationMessage(
		"Hey welcome back sempai 🙇🏻 you can do it"
	);
	context.subscriptions.push(hell0);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
