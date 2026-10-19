function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

function buildList(arr) {
    let dummy = new ListNode(0);
    let cur = dummy;
    for (let x of arr) {
        cur.next = new ListNode(x);
        cur = cur.next;
    }
    return dummy.next;
}

function listToArray(head) {
    let ans = [];
    let cur = head;
    while (cur) {
        ans.push(cur.val);
        cur = cur.next;
    }
    return ans;
}

var deleteDuplicates = function(head) {
    let isArr = Array.isArray(head);
    if (isArr) {
        head = buildList(head);
    }
    let dummy = new ListNode(0, head);
    let prev = dummy;
    let cur = head;
    while (cur) {
        if (cur.next && cur.val === cur.next.val) {
            while (cur.next && cur.val === cur.next.val) {
                cur = cur.next;
            }
            prev.next = cur.next;
        } else {
            prev = prev.next;
        }
        cur = cur.next;
    }
    return isArr ? listToArray(dummy.next) : dummy.next;
};

var solve = deleteDuplicates;
var removeDuplicatesFromSortedListII = deleteDuplicates;

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
    } catch (err) {}
}
module.exports = solve;
