function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

function arrayToList(arr) {
    if (!arr || arr.length === 0) return null;
    const dummy = new ListNode(0);
    let cur = dummy;
    for (const v of arr) {
        cur.next = new ListNode(v);
        cur = cur.next;
    }
    return dummy.next;
}

var solve = function(head) {
    if (Array.isArray(head)) head = arrayToList(head);
    const vals = [];
    while (head) {
        vals.push(head.val);
        head = head.next;
    }
    function build(l, r) {
        if (l > r) return null;
        const mid = (l + r) >> 1;
        const node = new TreeNode(vals[mid]);
        node.left = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }
    return build(0, vals.length - 1);
};

var sortedListToBST = solve;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (const line of lines) {
                const parsed = JSON.parse(line);
                console.log(JSON.stringify(solve(parsed)));
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}

module.exports = solve;
