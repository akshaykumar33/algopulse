function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);
    let cur = dummy;
    let carry = 0;
    let p = l1, q = l2;
    while (p !== null || q !== null || carry !== 0) {
        let sum = carry;
        if (p !== null) {
            sum += p.val;
            p = p.next;
        }
        if (q !== null) {
            sum += q.val;
            q = q.next;
        }
        carry = Math.floor(sum / 10);
        cur.next = new ListNode(sum % 10);
        cur = cur.next;
    }
    return dummy.next;
};

var solve = typeof addTwoNumbers !== 'undefined' ? addTwoNumbers : null;

// ---------------- LOCAL TEST HARNESS ----------------
function arrayToList(arr) {
    let dummy = new ListNode(0);
    let cur = dummy;
    for (let x of arr) {
        cur.next = new ListNode(x);
        cur = cur.next;
    }
    return dummy.next;
}

function listToArray(list) {
    let res = [];
    while (list !== null) {
        res.push(list.val);
        list = list.next;
    }
    return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const l1 = arrayToList(JSON.parse(lines[i]));
        const l2 = arrayToList(JSON.parse(lines[i+1]));
        const result = solve(l1, l2);
        console.log(JSON.stringify(listToArray(result)));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
