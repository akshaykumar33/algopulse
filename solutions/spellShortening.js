const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    
    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        let n = parseInt(lines[lineIdx++], 10);
        let s = lines[lineIdx++];
        
        let idx = n - 1;
        for (let i = 0; i < n - 1; i++) {
            if (s[i] > s[i + 1]) {
                idx = i;
                break;
            }
        }
        
        let res = s.slice(0, idx) + s.slice(idx + 1);
        out.push(res);
    }
    
    console.log(out.join('\n'));
}

solve();
