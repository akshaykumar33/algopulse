const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        if (lineIdx >= input.length) break;
        const parts = input[lineIdx++].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        const k = parseInt(parts[1], 10);
        
        if (n % k === 0) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
