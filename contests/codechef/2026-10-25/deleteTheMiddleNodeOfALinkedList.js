const fs = require('fs');

function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function deleteMiddle(head) {
  if (!head || !head.next) return null;
  let slow = head;
  let fast = head;
  let prev = null;
  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = slow.next;
  return head;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const t = parseInt(input[0], 10);
  let idx = 1;
  const out = [];

  for (let tc = 0; tc < t && idx < input.length; tc++) {
    const n = parseInt(input[idx++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(input[idx++], 10));

    if (n <= 1) {
      out.push("-1");
    } else {
      const mid = Math.floor(n / 2);
      a.splice(mid, 1);
      out.push(a.join(' '));
    }
  }
  console.log(out.join('\n'));
}

if (require.main === module) {
  solve();
}

module.exports = { deleteMiddle, solve };
