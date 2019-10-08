const Node = require('./node');

class LinkedList {
  constructor() {

    this.nodes = [];

    this.length = this.nodes.length;

    Object.defineProperty(this, 'length', {
      get: function () {
        return this.nodes.length;
      }
    });

    Object.defineProperty(this, '_tail', {
      get: function () {
        let tailNode = this.nodes[this.nodes.length - 1];
        if (!tailNode) {
          return null;
        }
        return tailNode;
      }
    });

    Object.defineProperty(this, '_head', {
      get: function () {
        let headNode = this.nodes[0];
        if (!headNode) {
          return null;
        }
        return headNode;
      }
    });

  }

  append(data) {

    let newNode = null;
    if (data === undefined) {
      console.log("no data for creating node");
      return this;
    }

    if (this.nodes.length === 0) {
      newNode = new Node(data);
      this.nodes.push(newNode);
      return this;
    }

    newNode = new Node(data);
    let prevNode = this.nodes[this.nodes.length - 1];
    prevNode.next = newNode;
    newNode.prev = prevNode;
    this.nodes.push(newNode);

    return this;

  }

  head() {
    return (this._head) ? this._head.data : this._head
  }

  tail() {
    return (this._tail) ? this._tail.data : this._tail
  }

  at(index) {
    let nodeByIndex = this.nodes[index];
    return (nodeByIndex) ? nodeByIndex.data : null;
  }

  insertAt(index, data) {

    let newNode = null;
    if (data === undefined) {
      console.log("no data for creating node");
      return this;
    }

    newNode = new Node(data);
    let prevNode = this.nodes[index - 1];

    if(!prevNode){
      this.nodes.push(newNode);
      return this;
    }

    prevNode.next = newNode;
    newNode.prev = prevNode;

    let nextNode = this.nodes[index + 1];
    if (nextNode) {
      nextNode.prev = newNode;
      newNode.next = newNode;
    }

    this.nodes.splice(index, 0, newNode);
    return this;

  }

  isEmpty() {
    return this.nodes.length === 0
  }

  clear() {

    this.nodes = [];
    return this;

  }

  deleteAt(index) {

    let deletedNode = this.nodes[index];
    let prevNode = this.nodes[index - 1];
    let nextNode = this.nodes[index + 1];

    if (nextNode) {
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
    }

    if(!prevNode){
      return this;
    }

    if (!nextNode) {
      prevNode.next = null;
    }

    this.nodes.splice(index, 1);

    return this;

  }

  reverse() {

    this.nodes.reverse();
    let nodesLength = this.nodes.length;

    let firstRNode = this.nodes[0];
    let lastRNode = this.nodes[nodesLength - 1];

    firstRNode.next = firstRNode.prev;
    firstRNode.prev = null;

    lastRNode.prev = lastRNode.next;
    lastRNode.next = null;

    for (let iNode = 1; iNode <= nodesLength - 2; iNode++) {

      let curPrevLink = this.nodes[iNode].prev;
      let curNextLink = this.nodes[iNode].next;

      this.nodes[iNode].next = curPrevLink;
      this.nodes[iNode].prev = curNextLink;

    }

    return this;

  }

  indexOf(data) {

    let nodeLength = this.nodes.length;

    for (let iNode = 0; iNode <  nodeLength; iNode++){
      if(this.nodes[iNode].data === data){
        return iNode;
      }
    }

    return -1;

  }
}


module.exports = LinkedList;
