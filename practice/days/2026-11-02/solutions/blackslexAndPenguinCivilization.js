const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return;
    
    let tStr = '';
    while (pos < input.length && input.charCodeAt(pos) > 32) {
        tStr += input[pos++];
    }
    const t = parseInt(tStr, 10);
    
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
        if (pos >= input.length) break;
        let nStr = '';
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            nStr += input[pos++];
        }
        const n = parseInt(nStr, 10);
        
        const ans = [];
        let cur = 1;
        while (cur <= n) {
            ans.push(cur);
            cur *= 2;
        }
        let len = ans.length;
        for (let i = len - 2; i >= 0; i--) {
            let val = ans[i] * 3;
            while (val <= n) {
                ans.push(val);
                val *= 2;
            }
        }
        out.push(ans.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
