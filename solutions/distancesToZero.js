const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const n = parseInt(lines[0], 10);
    const arr = lines[1].split(/\s+/).map(Number);
    
    const ans = new Array(n);
    let last = -1;
    
    for (let i = 0; i < n; i++) {
        if (arr[i] === 0) {
            last = i;
        }
        if (last === -1) {
            ans[i] = Infinity;
        } else {
            ans[i] = i - last;
        }
    }
    
    last = -1;
    for (let i = n - 1; i >= 0; i--) {
        if (arr[i] === 0) {
            last = i;
        }
        if (last !== -1) {
            const dist = last - i;
            if (dist < ans[i]) {
                ans[i] = dist;
            }
        }
    }
    
    console.log(ans.join(' '));
}

solve();
