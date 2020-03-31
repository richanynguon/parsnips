class ListNode {
	constructor(value, prev = undefined, next = undefined) {
		this.value = value;
		this.prev = prev;
		this.next = next;
	}
	insertAfter(value) {
		const currentNext = this.next;
		this.next = ListNode(value, this, currentNext);
		if (currentNext) {
			currentNext.prev = this.next;
		}
	}
	insertBefore(value) {
		const currentPrev = this.prev;
		this.prev = ListNode(value, currentPrev, this);
		if (currentPrev) {
			currentPrev.next = this.prev;
		}
	}
	delete() {
		if (this.prev) {
			this.prev.next = this.next;
		}
		if (this.next) {
			this.next.prev = this.prev;
		}
	}
}

export class DoublyLinkedList {
	constructor(node = undefined) {
		this.head = node;
		this.tail = node;
		this.length = node ? 1 : 0;
		function len() {
			return this.length;
		}
	}
	addToHead(value) {
		this.length += 1;
		if (!this.head && !this.tail) {
			this.head = this.tail = ListNode(value);
		} else {
			this.head.insertBefore(value);
			this.head = this.head.prev;
		}
	}
	addToTail(value) {
		this.length += 1;
		if (!this.head && !this.tail) {
			this.head = this.tail = ListNode(value);
		} else {
			this.tail.insertAfter(value);
			this.tail = this.tail.prev;
		}
	}
	removeFromHead() {
		const value = this.head.value;
		this.delete(this.head);
		return value;
	}
	removeFromTail() {
		const value = this.tail.value;
		this.delete(this.tail);
		return value;
	}
	moveToFront(node) {
		this.delete(node);
		this.addToHead(node.value);
	}
	moveToEnd(node) {
		this.delete(node);
		this.addToTail(node.value);
	}
	delete(node) {
		if (!this.head && !this.tail) {
			return undefined;
		} else if (this.head == this.tail) {
			this.head = undefined;
			this.tail = undefined;
		} else if (node == this.head) {
			this.head = this.head.next;
			node.delete();
		} else if (node == this.tail) {
			this.tail = this.tail.prev;
			node.delete();
		} else {
			node.delete();
		}
		this.length -= 1;
	}
}
