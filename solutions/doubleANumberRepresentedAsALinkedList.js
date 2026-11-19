function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

var doubleIt = function(head) {
  if (head.val >= 5) {
    head = new ListNode(0, head);
  }

  for (let node = head; node !== null; node = node.next) {
    node.val = (node.val * 2 + (node.next && node.next.val >= 5 ? 1 : 0)) % 10;
  }

  return head;
};

var solve = function(arr) {
  if (!arr || arr.length === 0) return [];
  const dummy = new ListNode(0);
  let cur = dummy;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  let res = doubleIt(dummy.next);
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

module.exports = doubleIt;
