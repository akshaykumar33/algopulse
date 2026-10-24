function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function arrayToList(arr) {
  if (!arr || !arr.length) return null;
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const res = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  return res;
}

var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
};

var solve = function(headArr, val) {
  const head = arrayToList(headArr);
  let cur = head;
  while (cur && cur.val !== val) cur = cur.next;
  if (cur && cur.next) deleteNode(cur);
  return listToArray(head);
};

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const headArr = JSON.parse(lines[i]);
        const val = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(headArr, val)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
