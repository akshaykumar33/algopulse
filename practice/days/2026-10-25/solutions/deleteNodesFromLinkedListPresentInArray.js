function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

var modifiedList = function(nums, head) {
  const seen = new Set(nums);
  const dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next) {
    if (seen.has(cur.next.val)) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

// ---------------- LOCAL TEST HARNESS ----------------
function buildList(arr) {
  if (!arr || arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

function listToArr(head) {
  const res = [];
  let cur = head;
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  return res;
}

var solve = function(nums, arr) {
  const head = buildList(arr);
  const res = modifiedList(nums, head);
  return listToArr(res);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed[0], parsed[1])));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { modifiedList, solve };
