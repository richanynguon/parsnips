const acorn = require("acorn");
const fs = require("fs");

const thisFile = "./test";
const data = fs.readFileSync(`${thisFile}.js`, "utf8");

const nodes = acorn.parse(data);

class Node {
	constructor(type, start, end, filePath, name = undefined) {
		this.type = type;
		this.start = start;
		this.end = end;
		this.name = name;
		this.filePath = filePath;
	}
}
