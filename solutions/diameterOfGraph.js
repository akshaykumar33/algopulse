const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    let idx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (idx >= lines.length) break;
        const parts = lines[idx++].trim().split(/\s+/);
        const n = BigInt(parts[0]);
        const m = BigInt(parts[1]);
        const k = BigInt(parts[2]);
        
        if (m < n - 1n || m > n * (n - 1n) / 2n) {
            out.push("NO");
            continue;
        }
        
        if (n === 1n) {
            if (k > 1n) {
                out.push("YES");
            } else {
                out.push("NO");
            }
            continue;
        }
        
        if (m === n * (n - 1n) / 2n) {
            if (k > 2n) {
                out.push("YES");
            } else {
                out.push("NO");
            }
            continue;
        }
        
        if (k > 3n) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
