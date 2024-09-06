/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    // If the list is empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    newNode.next = this.head;
    this.head = newNode;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    // If the list is empty
    if (this.tail) return;

    // Single node case: if the list has only one node
    if (this.head === this.tail) {
      const last = this.head.val;
      this.head = null;
      this.tail = null;
      return last;
    }

    // Multiple nodes case: if the list has more than one node
    let currentNode = this.head;

    while (currentNode) {
      // if next node is null
      if (currentNode.next === this.tail) {
        const val = this.tail.val;
        currentNode.next = null;
        this.tail = currentNode;
        return val;
      }
      currentNode = currentNode.next;
    }
    this.length--;
  }

  /** shift(): return & remove first item. */

  shift() {
    // If the list is empty
    if (this.head) return;

    // Single node case
    const val = this.head.val;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      // Multiple nodes case
      this.head = this.head.next;
    }
    this.length--;
    return val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode && counter != idx) {
      counter++;
      currentNode = currentNode.next;
    }
    return currentNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode && counter != idx) {
      counter++;
      currentNode = currentNode.next;
    }
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (idx === 0) {
        this.head.next = this.head;
        this.head = val;
      } else if (idx === counter - 1) {
        currentNode.next = currentNode;
        currentNode = val;
      }
      counter++;
      currentNode = currentNode.next;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx === 0) {
      this.head = currentNode.next;
      this.length -= 1;
      return currentNode.val;
    }

    let counter = 0;
    let currentNode = this.head;
    let previousNode = null;

    while (currentNode) {
      if (idx === counter - 1) previousNode = currentNode;
      counter++;
      currentNode = currentNode.next;
    }

    if (idx === this.length - 1) {
      const val = this.tail.val;
      this.tail = previousNode;
      this.length -= 1;
      return val;
    }

    const val = previousNode.next.val;
    previousNode.next = previousNode.next.next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    let sum = 0;
    let counter = 0;
    let currentNode = this.head;
    while (currentNode) {
      sum += currentNode;
      counter += 1;
    }
    return sum / counter;
  }

  mergeSortedLists(a, b) {
    // 1. Iterative approach

    // Create a dummy node to form the new list
    let dummy = new Node(0);
    let tail = dummy;

    // Traverse both lists until one is exhausted.
    while (a !== null && b !== null) {
      if (a.val <= b.val) {
        tail.next = a;
        a = a.next;
      } else {
        tail.next = b;
        b = b.next;
      }

      // Move the tail to the next node in the new list
      tail = tail.next;
    }

    // Attach the remaining part of the non-exhausted list
    if (a !== null) {
      tail.next = a;
    } else {
      tail.next = b;
    }

    // Return the head of the merged list,
    // skipping the dummy node.
    return dummy.next;
  }

  pivot(val) {
    // handle empty list or one item list
    // traverse the list
    // compare each list item with val
    // if val is greater than list item
    // current node move to the head (dummy node?)
    // move current node to next node
    // else
    // current node move to the tail
    // move current node to next node
    // return a list
  }
}

// export default LinkedList;
