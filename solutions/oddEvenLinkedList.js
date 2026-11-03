var oddEvenList = function(head) {
    if (!head || !head.next) return head;
    let odd = head;
    let even = head.next;
    let evenHead = even;
    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
};
var solve = typeof oddEvenList !== 'undefined' ? oddEvenList : null;

// ---------------- LOCAL TEST HARNESS ----------------
class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
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
                } catch (err) {
                    console.log(line);
                }
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
