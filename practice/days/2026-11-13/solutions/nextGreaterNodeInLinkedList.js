var nextLargerNodes = function(head) {
  const vals = [];
  let cur = head;
  while (cur) {
    vals.push(cur.val);
    cur = cur.next;
  }

  const n = vals.length;
  const ans = new Array(n).fill(0);
  const stack = [];

  for (let i = n - 1; i >= 0; i--) {
    const v = vals[i];
    while (stack.length > 0 && stack[stack.length - 1] <= v) {
      stack.pop();
    }
    if (stack.length > 0) {
      ans[i] = stack[stack.length - 1];
    }
    stack.push(v);
  }

  return ans;
};

if (require.main === module) {
  function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
  const arrayToList = (arr) => {
    if (!arr || !arr.length) return null;
    const dummy = new ListNode(0);
    let cur = dummy;
    for (let i = 0; i < arr.length; i++) {
      cur.next = new ListNode(arr[i]);
      cur = cur.next;
    }
    return dummy.next;
  };
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const list = arrayToList(JSON.parse(line));
      console.log(JSON.stringify(nextLargerNodes(list)));
    }
  }
}

module.exports = nextLargerNodes;
