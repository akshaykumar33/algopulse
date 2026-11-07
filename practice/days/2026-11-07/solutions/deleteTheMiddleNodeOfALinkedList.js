function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

var deleteMiddle = function(head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head.next.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  slow.next = slow.next.next;
  return head;
};

var solve = function(headArr) {
  if (!headArr || headArr.length === 0) return [];
  let dummy = new ListNode(0);
  let cur = dummy;
  for (let v of headArr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  let res = deleteMiddle(dummy.next);
  let out = [];
  while (res) {
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
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = { deleteMiddle, solve };

