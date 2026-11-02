function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val);
  this.next = (next===undefined ? null : next);
}

var reverseBetween = function(head, left, right) {
  if (!head || left === right) return head;
  let dummy = new ListNode(0, head);
  let prev = dummy;
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }
  let cur = prev.next;
  for (let i = 0; i < right - left; i++) {
    let next = cur.next;
    cur.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }
  return dummy.next;
};

var solve = typeof reverseBetween !== 'undefined' ? reverseBetween : null;

if (require.main === module) {
  function arrayToList(arr) {
    let dummy = new ListNode(0);
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

  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      const head = arrayToList(parsed[0]);
      const res = reverseBetween(head, parsed[1], parsed[2]);
      console.log(JSON.stringify(listToArray(res)));
    }
  }
}

