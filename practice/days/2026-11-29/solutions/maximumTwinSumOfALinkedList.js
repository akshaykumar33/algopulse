function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}
var pairSum = function(head) {
  const vals = [];
  for (let cur = head; cur; cur = cur.next) vals.push(cur.val);
  const n = vals.length;
  let ans = 0;
  for (let i = 0; i < n / 2; i++) ans = Math.max(ans, vals[i] + vals[n - 1 - i]);
  return ans;
};
var solve = pairSum;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const arr = JSON.parse(raw.split(/\r?\n/)[0]);
    let head = null;
    for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
    console.log(JSON.stringify(solve(head)));
  }
}
module.exports = pairSum;
