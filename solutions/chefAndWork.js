const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        let [n, k] = lines[lineIdx++].split(' ').map(Number);
        let w = lines[lineIdx++].split(' ').map(Number);
        
        let trips = 1;
        let cur = 0;
        let possible = true;
        
        for (let i = 0; i < n; i++) {
            if (w[i] > k) {
                possible = false;
                break;
            }
            if (cur + w[i] <= k) {
                cur += w[i];
            } else {
                trips++;
                cur = w[i];
            }
        }
        
        if (!possible) {
            out.push(-1);
        } else {
            out.push(trips);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
