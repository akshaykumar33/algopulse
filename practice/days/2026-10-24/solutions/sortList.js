function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

var solve = function(head) {
    if (!head || !head.next) return head;
    let slow = head, fast = head, prev = null;
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    prev.next = null;
    let l1 = solve(head);
    let l2 = solve(slow);
    return merge(l1, l2);
};

function merge(l1, l2) {
    let dummy = new ListNode(0), cur = dummy;
    while (l1 && l2) {
        if (l1.val < l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 ? l1 : l2;
    return dummy.next;
}

function buildList(arr) {
    let dummy = new ListNode(0), cur = dummy;
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

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const head = buildList(parsed);
          const result = solve(head);
          console.log(JSON.stringify(listToArray(result)));
        } catch {
          console.log(line);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = solve;
