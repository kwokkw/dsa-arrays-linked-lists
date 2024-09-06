/* Doubly Linked Lists are just like Singly Linked Lists, but each node has a pointer to the previous node as well as the next one. Implement a class for DoublyLinkedList with the same methods as above (be mindful of opportunities to speed up your code now that each node has two pointers!) */

// Represents a single element(node) in the linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): A helper method that retrieve node at idx. */
  /* TODO */
  /* Consider optimizing by traversing from the tail if idx is closer to the end, as it can speed up the search.
   */

  _get(idx) {
    let currentNode = this.head;
    let counter = 0;

    while (currentNode && idx != counter) {
      counter += 1;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    // Create a new node
    const newNode = new Node(val);

    // If the list is empty
    if (!this.head) {
      // Set both `head and `tail` to the new node.
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the list is not empty
      // Update the `next` pointer of the current tail to the new node.
      this.tail.next = newNode;
      // Set the `prev` pointer of the new node to the current tail.
      newNode.prev = this.tail;
      // Update the `tail` to the new node.
      this.tail = newNode;
    }

    // Increment the `length`
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // Create a new node.
    const newNode = new Node(val);

    // If the list is empty
    if (!this.head) {
      // Set both `head` and `tail` to the new node.
      this.head = newNode;
      this.tail = newNode;
    } else {
      // If the list is not empty
      // Update the `prev` pointer of the current head to the new node.
      this.head.prev = newNode;
      // Set `next` pointer of new node to current head.
      newNode.next = this.head;
      // Update `head` to the new node.
      this.head = newNode;
    }

    // Increment the `length`.
    this.length += 1;
  }

  /** pop(): return & remove last item.
   *
   * Running in O(1) time:
   *  - it directly access the tail node.
   *
   * Handle edge cases:
   *  - Empty list
   *  - Single-element list
   *  - Multiple-elements list
   */

  pop() {
    // If the list is empty
    if (!this.head) return undefined;

    // Store the value of the current tail.
    const val = this.tail.val;
    // Store the node before the current tail.
    const prev = this.tail.prev;

    // Handle single element list
    if (this.length === 1) {
      this.head = null;
      this.tail = null;

      this.length -= 1;
      return val;
    }

    // Update the tail to be the previous node.
    this.tail = prev;
    // Remove the reference to the old tail by setting `next` to `null`.
    prev.next = null;

    // Decrease the length of the list.
    this.length -= 1;

    // Return the value of the removed node.
    return val;
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  /* TODO */

  /* Redundancy: The _get helper method is used in several methods to get the node at a specific index. This functionality could be integrated into those methods directly to avoid redundancy.
   */
  getAt(idx) {
    // Check if the index is valid
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // Check if the index is valid
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }
    const targetNode = this._get(idx);
    targetNode.val = val;
    return targetNode.val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // Check if the index is valid
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    const newNode = new Node(val);
    const targetNode = this._get(idx - 1);

    newNode.next = targetNode.next;
    targetNode.next.prev = newNode;

    newNode.prev = targetNode;
    targetNode.next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // Check if the index is valid
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid Index.");
    }

    // Remove first node.
    if (idx === 0) {
      const val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;

      // If the list length is now less than 2 (empty or has one node), the tail is set to the new head.
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    // Remove last node.

    if (idx === this.length - 1) {
      const val = this.tail.val;
      const prev = this.tail.prev;

      prev.next = null;
      this.tail = prev;

      this.length -= 1;

      return val;
    }

    // Remove middle node
    targetNode = this._get(idx);
    targetNode.prev.next = targetNode.next;
    targetNode.next.prev = targetNode.prev;

    this.length -= 1;
    return targetNode.val;
  }

  /* TODO */
  /* average Method: While functional, iterating through the entire list to calculate the average has a linear time complexity (O(n)). Consider using a variable to track the sum during insertions/deletions to maintain a constant average time complexity (O(1)). However, this requires additional logic when modifying the list.

 */
  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let currentNode = this.head;

    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }

    return sum / this.length;
  }

  /* ### **Reverse In Place**

Write a function that reverses a linked list *in place* — not by creating a new list or new nodes. */

  /* Changing the direction of the next pointers of the nodes so that they point to the previous node rather than the next node.
    
  In a singly linked list, each node has a reference to the next node. In a doubly linked list, each node has references to both the next and the previous nodes. */

  reverse() {
    // Traverse the list, for each node, reverse both `next` and `prev` pointers.

    // If the list is empty or has only one node, nothing to reverse.
    if (!this.head || this.length === 1) return;

    // Initialize pointers
    let currentNode = this.head;

    // Traverse and reverse
    while (currentNode) {
      let next = currentNode.next;
      let prev = currentNode.prev;

      let temp = next;
      next = prev;
      prev = temp;

      prev.next = currentNode;
      next.prev = currentNode;

      // Move to the next node
      currentNode = temp;
    }

    // Update the head and tail
    const tempHead = this.head;
    this.head = this.tail;
    this.tail = tempHead;
  }

  /* **Sort Sorted Linked Lists**

  Write a function that is passed two linked lists, ***a*** and ***b***, both of which are already sorted. Return a new linked list, in sorted order.*/

  sort(a, b) {
    // Initialize a dummy node to build the new sorted list
    let dummy = new Node(0);
    this.tail = dummy;

    nodeA = a.tail;
    nodeB = b.tail;

    while (nodeA && nodeB) {
      if (nodeA.val < nodeB.val) {
        this.tail.next = nodeA;
        this.tail = nodeA;
        nodeA = nodeA.next;
      } else {
        this.tail.next = nodeB;
        this.tail = nodeB;
        nodeB = nodeB.next;
      }
    }

    return dummy.next;
  }
}
