const { DoublyLinkedList } = require("./DLL");
export class Queue {
	constructor() {
		this.size = 0;
		this.storage = DoublyLinkedList();
	}
	enqueue(value) {
		this.size += 1;
		this.storage.addToTail(value);
	}
	dequeue() {
		if (this.size < 1) {
			return undefined;
		}
		this.size -= 1;
		const dequeuedValue = this.storage.removeFromHead();
		return dequeuedValue;
	}
	len() {
		return this.size;
	}
}
