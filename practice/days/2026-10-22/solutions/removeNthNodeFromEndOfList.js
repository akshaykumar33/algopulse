function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

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
    let cur = head;
    while (cur) {
        res.push(cur.val);
        cur = cur.next;
    }
    return res;
}

var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0, head);
    let first = dummy;
    let second = dummy;
    for (let i = 0; i <= n; i++) {
        first = first.next;
    }
    while (first !== null) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
};

var solve = function(headArr, n) {
    let head = arrayToList(headArr);
    let resHead = removeNthFromEnd(head, n);
    return listToArray(resHead);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const headArr = JSON.parse(lines[i]);
          const n = JSON.parse(lines[i+1]);
          const result = solve(headArr, n);
          console.log(JSON.stringify(result));
        } catch (e) {
          console.error(e);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
