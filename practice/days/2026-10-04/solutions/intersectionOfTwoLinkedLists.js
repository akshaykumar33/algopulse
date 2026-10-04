function ListNode(val) {
    this.val = val;
    this.next = null;
}

var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;
    let p1 = headA;
    let p2 = headB;
    while (p1 !== p2) {
        p1 = p1 ? p1.next : headB;
        p2 = p2 ? p2.next : headA;
    }
    return p1;
};

function buildList(arr) {
    if (!arr || arr.length === 0) return null;
    let dummy = new ListNode(0);
    let cur = dummy;
    for (let x of arr) {
        cur.next = new ListNode(x);
        cur = cur.next;
    }
    return dummy.next;
}

var solve = function(intersectVal, listA, listB, skipA, skipB) {
    let headA = buildList(listA);
    let headB = buildList(listB);
    if (intersectVal !== 0) {
        let pA = headA;
        for (let i = 0; i < skipA; i++) {
            pA = pA.next;
        }
        let pB = headB;
        for (let i = 0; i < skipB - 1; i++) {
            pB = pB.next;
        }
        if (skipB === 0) {
            headB = pA;
        } else {
            pB.next = pA;
        }
    }
    let ans = getIntersectionNode(headA, headB);
    return ans ? ans.val : null;
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
