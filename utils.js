const acorn = require("acorn-loose");
const fs = require("fs");

class Node {
	constructor(type, start, end, filePath, name = undefined) {
		this.type = type;
		this.start = start;
		this.end = end;
		this.name = name;
		this.filePath = filePath;
	}
}

class Graph {
	constructor() {
		this.vertices = {};
		this.parentsFuncRelations = {};
		this.fileFunctions = {};
		this.primaryFile = undefined;
	}

	addVertex(vertexId, value) {
		this.vertices[vertexId] = {
			children: new Set(),
			parents: new Set(),
			value: value,
		};
		this.parentsFuncRelations[vertexId] = new Set();
	}

	addEdge(v1, v2) {
		this.vertices[v1].children.add(v2);
		this.vertices[v2].parents.add(v1);
	}
	// v1 will always be the parent and v2 is child
	addCxn(v1, value, v2 = undefined, value2 = undefined) {
		if (!(v1 in this.vertices)) {
			this.addVertex(v1, value);
		}
		if (v2 && value2) {
			this.addVertex(v2, value2);
			this.addEdge(v1, v2);
		}
	}
	connectFileGraphs() {
		if (this.primaryFile) {
			const pf = this.primaryFile;
			const primaryKeys = Object.keys(this.fileFunctions[pf].functions);
			for (let file in this.fileFunctions) {
				const keys = Object.keys(this.fileFunctions[file].functions);
				primaryKeys.filter((value) => {
					keys.filter((innerValue) => {
						if (value == innerValue) {
							const childValue = this.fileFunctions[pf].functions[value];
							const parentValue = this.fileFunctions[file].functions[
								innerValue
							];
							if (childValue != parentValue) {
								this.parentsFuncRelations[childValue].add(parentValue);
							}
						}
					});
				});
			}
		} else {
			console.log("Failed to connect files, no primary file entered");
		}
	}
	getParentFunctions(vertexId) {
		return this.parentsFuncRelations[vertexId];
	}
}

function createASTNodeGraph(
	obj,
	graph,
	fileName,
	parent = undefined,
	parentValue = undefined,
	primaryFile = fileName
) {
	// create vertex id
	const { type, start, end } = obj;
	const nodeInfo = [type, start, end, fileName];
	let node = new Node(...nodeInfo);
	const vertexId = `${node.start}-${node.end}-${fileName}`;
	// Flagging primary file will prevent cyclic travel
	if (!(fileName in graph.fileFunctions)) {
		graph.fileFunctions[fileName] = {
			primary: false,
			functions: {},
		};
		if (fileName == primaryFile) {
			graph.fileFunctions[fileName].primary = true;
			graph.primaryFile = fileName;
		}
	}
	// Based on type of syntax create reassign new node and add vertex info
	// to file function map for multi file ast connection
	switch (type) {
		case "FunctionDeclaration":
			if (obj.id) {
				node = new Node(...nodeInfo, obj.id.name);
				graph.fileFunctions[fileName].functions[obj.id.name] = vertexId;
			}
			break;
		case "CallExpression":
			node = new Node(...nodeInfo, obj.callee.name);
			if (obj.callee.name) {
				graph.fileFunctions[fileName].functions[obj.callee.name] = vertexId;
			}

			break;
		case "VariableDeclarator":
			node = new Node(...nodeInfo, obj.id.name);
			if (obj.hasOwnProperty("init")) {
				if (obj.init.type == "ArrowFunctionExpression") {
					graph.fileFunctions[fileName].functions[obj.id.name] = vertexId;
				}
			}
	}
	if (parent) {
		graph.addCxn(parent, parentValue, vertexId, node);
		// create parent function relations, if first round of neighbors is not
		// the parent of type, then continue to traverse backward to find parent of type
		if (parentValue.type == "FunctionDeclaration") {
			graph.parentsFuncRelations[vertexId].add(parent);
		} else if (parentValue.type == "VariableDeclarator") {
			if (node.type == "ArrowFunctionExpression") {
				graph.parentsFuncRelations[vertexId].add(parent);
			}
		} else {
			const parentsParent = graph.parentsFuncRelations[parent];
			parentsParent.forEach((entry) => {
				graph.parentsFuncRelations[vertexId].add(entry);
			});
		}
	} else {
		graph.addCxn(vertexId, node);
	}

	const recurviseParams = [graph, fileName, vertexId, node, primaryFile];
	// decides when to recursively call itself
	switch (type) {
		case "Program":
			for (let node in obj.body) {
				createASTNodeGraph(obj.body[node], ...recurviseParams);
			}
			break;
		case "FunctionDeclaration":
			createASTNodeGraph(obj.body, ...recurviseParams);
			break;
		case "BlockStatement":
			for (let node in obj.body) {
				createASTNodeGraph(obj.body[node], ...recurviseParams);
			}
			break;
		case "ExpressionStatement":
			createASTNodeGraph(obj.expression, ...recurviseParams);
			break;
		case "VariableDeclaration":
			for (let node in obj.declarations) {
				createASTNodeGraph(obj.declarations[node], ...recurviseParams);
			}
			break;
		case "VariableDeclarator":
			createASTNodeGraph(obj.init, ...recurviseParams);

			break;
		case "AwaitExpression":
			createASTNodeGraph(obj.argument, ...recurviseParams);
			break;
		case "ReturnStatement":
			createASTNodeGraph(obj.argument, ...recurviseParams);
			break;
		case "CallExpression":
			if (obj.callee.name == "require") {
				const filePath = obj.arguments[0].value;
				const data = fs.readFileSync(`${filePath}.js`, "utf8");
				const nodes = acorn.parse(data);
				createASTNodeGraph(
					nodes,
					graph,
					filePath,
					(parent = undefined),
					(parentValue = undefined),
					primaryFile
				);
			}
			break;
		case "Literal":
			break;
		case "AssignmentExpression":
			break;
		case "ArrowFunctionExpression":
			createASTNodeGraph(obj.body, ...recurviseParams);
			break;
		default:
			break;
		// console.log(`${type} has not been handled yet`);
	}
}

function calcCharCount(dataStr, position) {
	const dataArray = dataStr.split("\n");
	const trimmedData = dataArray.map((array) => {
		return array.replace(/\s+/g, "");
	});
	let i = 0;
	let count = 0;
	while (i < position.line) {
		count = count + trimmedData[i].length;
		i = i + 1;
	}
	count = count + position.character;
	return count;
}

function returnFunctionParents(document, position) {
	// Generates graph from information
	const data = fs.readFileSync(`${document.fileName}.js`, "utf8");
	const charPos = calcCharCount(data, position);
	const nodes = acorn.parse(data);
	const newGraph = new Graph();
	// create and connect graph
	createASTNodeGraph(nodes, newGraph, document.fileName);
	newGraph.connectFileGraphs();
	let found;
	const results = [];
	// look through all the vertices to find char
	for (let node in newGraph.vertices) {
		const strArr = node.split("-");
		let numPos = parseInt(charPos);
		let start = parseInt(strArr[0]);
		let end = parseInt(strArr[1]);
		if (numPos >= start && numPos <= end) {
			found = node;
		}
	}

	for (let entry of newGraph.parentsFuncRelations[found]) {
		if (
			newGraph.vertices[entry].value.type === "VariableDeclarator" ||
			newGraph.vertices[entry].value.type === "FunctionDeclaration"
		) {
			results.unshift(newGraph.vertices[entry].value.name);
		} else {
			results.push(newGraph.vertices[entry].value.name);
		}
	}
	return results;
}

module.exports = { returnFunctionParents };

/*

// Start creating graph at index.js on start
// Everytime it updated 
// detect strong connected components

*/
