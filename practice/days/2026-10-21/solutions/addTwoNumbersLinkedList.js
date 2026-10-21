const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0]);
    let idx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (idx >= lines.length) break;
        const n = parseInt(lines[idx++]);
        const l1 = lines[idx++].trim().split(/\s+/).map(Number);
        const m = parseInt(lines[idx++]);
        const l2 = lines[idx++].trim().split(/\s+/).map(Number);
        
        let p1 = 0;
        let p2 = 0;
        let carry = 0;
        let res = [];
        
        while (p1 < n || p2 < m || carry > 0) {
            let sum = carry;
            if (p1 < n) {
                sum += l1[p1++];
            }
            if (p2 < m) {
                sum += l2[p2++];
            }
            res.push(sum % 10);
            carry = Math.floor(sum / 10);
        }
        
        out.push(res.join(' '));
    }
    
    console.log(out.join('\n'));
}

solve();
