function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

function gcd(a, b) {
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

var insertGreatestCommonDivisors = function(head) {
  let cur = head;
  while (cur && cur.next) {
    const g = gcd(cur.val, cur.next.val);
    const mid = new ListNode(g, cur.next);
    cur.next = mid;
    cur = mid.next;
  }
  return head;
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

var solve = function(arr) {
  const head = buildList(arr);
  const res = insertGreatestCommonDivisors(head);
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
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = { insertGreatestCommonDivisors, solve };
