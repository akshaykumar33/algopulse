var nodesBetweenCriticalPoints = function(head) {
  if (Array.isArray(head)) {
    let dummy = { val: 0, next: null };
    let tail = dummy;
    for (let i = 0; i < head.length; i++) {
      tail.next = { val: head[i], next: null };
      tail = tail.next;
    }
    head = dummy.next;
  }
  if (!head || !head.next || !head.next.next) return [-1, -1];
  let firstIdx = -1, prevIdx = -1, minDiff = Infinity;
  let idx = 1;
  let prevVal = head.val;
  let cur = head.next;
  while (cur.next) {
    let nextVal = cur.next.val;
    if ((cur.val > prevVal && cur.val > nextVal) || (cur.val < prevVal && cur.val < nextVal)) {
      if (firstIdx === -1) {
        firstIdx = idx;
      } else {
        let diff = idx - prevIdx;
        if (diff < minDiff) minDiff = diff;
      }
      prevIdx = idx;
    }
    prevVal = cur.val;
    cur = cur.next;
    idx++;
  }
  if (firstIdx === -1 || minDiff === Infinity) return [-1, -1];
  return [minDiff, prevIdx - firstIdx];
};

var solve = nodesBetweenCriticalPoints;
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
module.exports = solve;
