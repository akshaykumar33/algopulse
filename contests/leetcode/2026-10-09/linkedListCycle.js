class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

var hasCycle = function(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
};

var solve = function(head, pos) {
  if (!head || head.length === 0) return false;
  let nodes = [];
  for (let i = 0; i < head.length; i++) {
    nodes.push(new ListNode(head[i]));
  }
  for (let i = 0; i < head.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  if (pos !== -1 && head.length > 0) {
    nodes[head.length - 1].next = nodes[pos];
  }
  return hasCycle(nodes[0]);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const head = JSON.parse(lines[i]);
        const pos = JSON.parse(lines[i + 1]);
        const result = solve(head, pos);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
