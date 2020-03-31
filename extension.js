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
			/*

			How will we connect all files to create one very large tree to get parents and display them in the return -- set a "main doc"
			
			--  can  use position and token to fetch content for big tree
			
			--- another feature: find duplicated AST for cleaner code

			1. Get all paths to node keep track of all paths and prioritize immediate parents and display them


			Step into node

			body is an object full o nodes

			FunctionDeclaration

			BlockStatement > ExpressionStatement > MemberExpression | Object, Property - Console.log

			BlockStatement > ReturnStatement > CallExpression 

			VariableDeclaration > init > ArrowFunctionExpression

			BlockStatement >  ExpressionStatement > AwaitExpression > CallExpression
			
			set with every function name
			dictionary with a key and value -key is a function and the value is array is an array where it has every function call in that values
			so this dictionary will have all paths in it
			*/

			// Creating a syntax tree of user's current file
			const docData = await fs.readFileSync(`${document.fileName}`, "utf8");
			const docNodes = await acorn.parse(docData);
			await console.log(docNodes, position);
			
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
