function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

var removeZeroSumSublists = function(head) {
  const dummy = new ListNode(0, head);
  let prefix = 0;
  const seen = new Map();

  for (let node = dummy; node !== null; node = node.next) {
    prefix += node.val;
    seen.set(prefix, node);
  }

  prefix = 0;
  for (let node = dummy; node !== null; node = node.next) {
    prefix += node.val;
    node.next = seen.get(prefix).next;
  }

  return dummy.next;
};

var solve = function(arr) {
  if (!arr || arr.length === 0) return [];
  const dummy = new ListNode(0);
  let cur = dummy;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  let res = removeZeroSumSublists(dummy.next);
  const out = [];
  while (res !== null) {
    out.push(res.val);
    res = res.next;
  }
  return out;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = removeZeroSumSublists;
