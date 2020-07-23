const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "parsnips" is now active!');

	// TODO:
	// Search documentation to figure out of to utilize side bar
	// How to plug in References and Definitions of Functions
	// How to get compiled styles on this.
	// Show connected state
	// What if you have two definitions - show both definitions
 
	const hell0 = vscode.window.showInformationMessage(
		"Welcome back Hokage 🙇🏻 you're going to crush it"
	);
	context.subscriptions.push(hell0);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
