const vscode = require("vscode");
const acorn = require("acorn");
const fs = require("fs");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "parsnips" is now active!');

	vscode.languages.registerHoverProvider("javascript", {
		async provideHover(document, position, token) {
			const docData = await fs.readFileSync(`${document.fileName}`, "utf8")

			const docNodes = await acorn.parse(docData)

			await console.log(docNodes)

			return {
				contents: ["Parse your snippets"]
			};
		}
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
	deactivate
};
