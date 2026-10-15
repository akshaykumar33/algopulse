var reverseLinkedList = function(nums) {
  if (!nums || !nums.length) return [];
  function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
  let head = new ListNode(nums[0]), cur = head;
  for (let i = 1; i < nums.length; i++) {
    cur.next = new ListNode(nums[i]);
    cur = cur.next;
  }
  let p = null, c = head;
  while (c) {
    let n = c.next;
    c.next = p;
    p = c;
    c = n;
  }
  let ans = [];
  while (p) {
    ans.push(p.val);
    p = p.next;
  }
  return ans;
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
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;

var solve = typeof reverseLinkedList !== 'undefined' ? reverseLinkedList : null;
