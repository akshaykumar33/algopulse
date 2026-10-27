class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

var removeNodes = function(head) {
  if (!head) return null;
  head.next = removeNodes(head.next);
  return head.next && head.val < head.next.val ? head.next : head;
};

var solve = removeNodes;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          let head = null;
          let tail = null;
          for (const v of parsed) {
            const node = new ListNode(v);
            if (!head) {
              head = node;
              tail = node;
            } else {
              tail.next = node;
              tail = node;
            }
          }
          const resHead = solve(head);
          const arr = [];
          let cur = resHead;
          while (cur) {
            arr.push(cur.val);
            cur = cur.next;
          }
          console.log(JSON.stringify(arr));
        } catch (e) {
          console.error(e);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
