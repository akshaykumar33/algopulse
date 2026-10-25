function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var insertionSortList = function(head) {
    let dummy = new ListNode(0);
    let cur = head;
    while (cur !== null) {
        let prev = dummy;
        while (prev.next !== null && prev.next.val < cur.val) {
            prev = prev.next;
        }
        let nextTemp = cur.next;
        cur.next = prev.next;
        prev.next = cur;
        cur = nextTemp;
    }
    return dummy.next;
};

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
    while (cur !== null) {
        res.push(cur.val);
        cur = cur.next;
    }
    return res;
}

var solve = function(head) {
    let listHead = Array.isArray(head) ? arrayToList(head) : head;
    let sorted = insertionSortList(listHead);
    return listToArray(sorted);
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
