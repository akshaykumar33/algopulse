function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function arrayToList(arr) {
  if (!arr || !arr.length) return null;
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

function listToArray(head) {
  const res = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  return res;
}

var partition = function(head, x) {
  const beforeDummy = new ListNode(0);
  const afterDummy = new ListNode(0);
  let before = beforeDummy;
  let after = afterDummy;
  let cur = head;

  while (cur) {
    if (cur.val < x) {
      before.next = cur;
      before = before.next;
    } else {
      after.next = cur;
      after = after.next;
    }
    cur = cur.next;
  }

  after.next = null;
  before.next = afterDummy.next;
  return beforeDummy.next;
};

var solve = function(headArr, x) {
  const head = arrayToList(headArr);
  const resHead = partition(head, x);
  return listToArray(resHead);
};

if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const headArr = JSON.parse(lines[i]);
        const x = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(headArr, x)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
