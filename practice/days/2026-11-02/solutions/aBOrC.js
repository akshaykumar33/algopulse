const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;
    const len = input.length;
    function nextToken() {
        while (pos < len && input.charCodeAt(pos) <= 32) pos++;
        if (pos >= len) return null;
        const start = pos;
        while (pos < len && input.charCodeAt(pos) > 32) pos++;
        return input.slice(start, pos);
    }
    const tStr = nextToken();
    if (!tStr) return;
    const t = parseInt(tStr, 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(nextToken(), 10);
        const total = 3 * n;
        const items = new Array(total);
        let ptr = 0;
        for (let i = 0; i < n; i++) {
            items[ptr++] = { val: parseInt(nextToken(), 10), idx: i };
        }
        for (let i = 0; i < n; i++) {
            items[ptr++] = { val: parseInt(nextToken(), 10), idx: i };
        }
        for (let i = 0; i < n; i++) {
            items[ptr++] = { val: parseInt(nextToken(), 10), idx: i };
        }

        items.sort((a, b) => a.val - b.val);

        const count = new Int32Array(n);
        let distinct = 0;
        let left = 0;
        let ans = Infinity;

        for (let right = 0; right < total; right++) {
            const idxR = items[right].idx;
            if (count[idxR] === 0) distinct++;
            count[idxR]++;

            while (distinct === n) {
                const diff = items[right].val - items[left].val;
                if (diff < ans) ans = diff;
                const idxL = items[left].idx;
                count[idxL]--;
                if (count[idxL] === 0) distinct--;
                left++;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
