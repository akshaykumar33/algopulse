const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const [n, a] = lines[0].split(/\s+/).map(Number);
    const arr = lines[1].split(/\s+/).map(Number);
    const idx = a - 1;
    let ans = 0;
    
    if (arr[idx] === 1) {
        ans++;
    }
    
    let maxDist = Math.max(idx, n - 1 - idx);
    for (let d = 1; d <= maxDist; d++) {
        let l = idx - d;
        let r = idx + d;
        let hasL = l >= 0;
        let hasR = r < n;
        
        if (hasL && hasR) {
            if (arr[l] === 1 && arr[r] === 1) {
                ans += 2;
            }
        } else if (hasL) {
            if (arr[l] === 1) {
                ans += 1;
            }
        } else if (hasR) {
            if (arr[r] === 1) {
                ans += 1;
            }
        }
    }
    
    const out = [ans];
    console.log(out.join('\n'));
}

solve();
