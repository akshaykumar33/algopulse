function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

var copyRandomList = function(head) {
    if (!head) return null;
    let cur = head;
    while (cur) {
        let next = cur.next;
        cur.next = new Node(cur.val, next, null);
        cur = next;
    }
    cur = head;
    while (cur) {
        if (cur.random) {
            cur.next.random = cur.random.next;
        }
        cur = cur.next.next;
    }
    let dummy = new Node(0, null, null);
    let tail = dummy;
    cur = head;
    while (cur) {
        let copy = cur.next;
        cur.next = copy.next;
        tail.next = copy;
        tail = copy;
        cur = cur.next;
    }
    return dummy.next;
};

var solve = typeof copyRandomList !== 'undefined' ? copyRandomList : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const map = new Map();
          let head = null, tail = null;
          for (let i = 0; i < parsed.length; i++) {
            const node = new Node(parsed[i][0], null, null);
            map.set(i, node);
            if (!head) head = node;
            else tail.next = node;
            tail = node;
          }
          let cur = head, i = 0;
          while (cur) {
            if (parsed[i][1] !== null) {
              cur.random = map.get(parsed[i][1]);
            }
            cur = cur.next;
            i++;
          }
          let res = solve(head);
          let out = [];
          let nodeMap = new Map();
          cur = res;
          i = 0;
          while (cur) {
            nodeMap.set(cur, i);
            cur = cur.next;
            i++;
          }
          cur = res;
          while (cur) {
            let rIndex = cur.random ? nodeMap.get(cur.random) : null;
            out.push([cur.val, rIndex]);
            cur = cur.next;
          }
          console.log(JSON.stringify(out));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
