const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0], 10);
    let lineIdx = 1;
    let out = [];
    
    for (let tc = 0; tc < t; tc++) {
        let parts = input[lineIdx++].split(' ');
        let n = parseInt(parts[0], 10);
        let c = parts[1];
        let s = input[lineIdx++];
        
        if (c === 'g') {
            out.push(0);
            continue;
        }
        
        let doubleS = s + s;
        let nextG = new Array(2 * n);
        let lastG = -1;
        
        for (let i = 2 * n - 1; i >= 0; i--) {
            if (doubleS[i] === 'g') {
                lastG = i;
            }
            nextG[i] = lastG;
        }
        
        let ans = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] === c) {
                let dist = nextG[i] - i;
                if (dist > ans) {
                    ans = dist;
                }
            }
        }
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
