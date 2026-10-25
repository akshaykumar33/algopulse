class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    let prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    let node = this.map.get(key);
    this._remove(node);
    this._add(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      this._remove(this.map.get(key));
    }
    let node = new Node(key, value);
    this._add(node);
    this.map.set(key, node);
    if (this.map.size > this.capacity) {
      let lru = this.head.next;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
}

var solve = function(actions, values) {
  let cache = null;
  let res = [];
  for (let i = 0; i < actions.length; i++) {
    if (actions[i] === "LRUCache") {
      cache = new LRUCache(values[i][0]);
      res.push(null);
    } else if (actions[i] === "put") {
      cache.put(values[i][0], values[i][1]);
      res.push(null);
    } else if (actions[i] === "get") {
      res.push(cache.get(values[i][0]));
    }
  }
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const actions = JSON.parse(lines[i]);
        const values = JSON.parse(lines[i+1]);
        const result = solve(actions, values);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
