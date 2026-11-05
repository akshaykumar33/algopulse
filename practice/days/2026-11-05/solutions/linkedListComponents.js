var numComponents = function(head, nums) {
  const set = new Set(nums);
  let cur = head;
  let ans = 0;
  let inComp = false;
  while (cur !== null) {
    if (set.has(cur.val)) {
      if (!inComp) {
        ans++;
        inComp = true;
      }
    } else {
      inComp = false;
    }
    cur = cur.next;
  }
  return ans;
};
var solve = numComponents;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const headArr = JSON.parse(lines[i]);
        const nums = JSON.parse(lines[i + 1]);
        function ListNode(val, next) {
          this.val = (val===undefined ? 0 : val);
          this.next = (next===undefined ? null : next);
        }
        let dummy = new ListNode(0);
        let tail = dummy;
        for (const v of headArr) {
          tail.next = new ListNode(v);
          tail = tail.next;
        }
        console.log(JSON.stringify(solve(dummy.next, nums)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
