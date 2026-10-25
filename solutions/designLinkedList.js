class MyLinkedList {
  constructor() {
    this.arr = [];
  }

  get(index) {
    if (index < 0 || index >= this.arr.length) return -1;
    return this.arr[index];
  }

  addAtHead(val) {
    this.arr.unshift(val);
  }

  addAtTail(val) {
    this.arr.push(val);
  }

  addAtIndex(index, val) {
    if (index > this.arr.length) return;
    if (index < 0) index = 0;
    this.arr.splice(index, 0, val);
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.arr.length) return;
    this.arr.splice(index, 1);
  }
}

var solve = function(actions, values) {
  let list = null;
  let res = [];
  for (let i = 0; i < actions.length; i++) {
    let act = actions[i];
    let val = values[i];
    if (act === "MyLinkedList") {
      list = new MyLinkedList();
      res.push(null);
    } else if (act === "addAtHead") {
      list.addAtHead(val[0]);
      res.push(null);
    } else if (act === "addAtTail") {
      list.addAtTail(val[0]);
      res.push(null);
    } else if (act === "addAtIndex") {
      list.addAtIndex(val[0], val[1]);
      res.push(null);
    } else if (act === "deleteAtIndex") {
      list.deleteAtIndex(val[0]);
      res.push(null);
    } else if (act === "get") {
      res.push(list.get(val[0]));
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
        const values = JSON.parse(lines[i + 1]);
        const result = solve(actions, values);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = { MyLinkedList, solve };
