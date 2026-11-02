function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var splitListToParts = function(head, k) {
    let len = 0;
    let cur = head;
    while (cur) {
        len++;
        cur = cur.next;
    }

    let base = Math.floor(len / k);
    let rem = len % k;

    let ans = new Array(k);
    cur = head;

    for (let i = 0; i < k; i++) {
        let partHead = cur;
        let partSize = base + (i < rem ? 1 : 0);
        let prev = null;

        for (let j = 0; j < partSize; j++) {
            prev = cur;
            if (cur) cur = cur.next;
        }

        if (prev) prev.next = null;
        ans[i] = partHead;
    }

    return ans;
};

var solve = splitListToParts;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  function arrayToList(arr) {
    let dummy = new ListNode(0);
    let cur = dummy;
    for (let x of arr) {
      cur.next = new ListNode(x);
      cur = cur.next;
    }
    return dummy.next;
  }
  function listToArray(head) {
    let res = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  }
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        const head = arrayToList(parsed[0]);
        const k = parsed[1];
        const parts = solve(head, k);
        const result = parts.map(listToArray);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
