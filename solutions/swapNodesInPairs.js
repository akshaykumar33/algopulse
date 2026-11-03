/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var swapPairs = function(head) {
    let dummy = new ListNode(0, head);
    let cur = dummy;
    while (cur.next && cur.next.next) {
        let first = cur.next;
        let second = cur.next.next;
        first.next = second.next;
        second.next = first;
        cur.next = second;
        cur = first;
    }
    return dummy.next;
};
var solve = typeof swapPairs !== 'undefined' ? swapPairs : null;

// ---------------- LOCAL TEST HARNESS ----------------
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

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const list = arrayToList(parsed);
          const resultList = solve(list);
          console.log(JSON.stringify(listToArray(resultList)));
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
