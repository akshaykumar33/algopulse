const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0]);
    let idx = 1;
    let out = [];
    
    while (t-- > 0) {
        let [n, l, r] = lines[idx++].split(' ').map(Number);
        let arr = lines[idx++].split(' ').map(Number);
        
        let cur = 0;
        let max_val = 0;
        let min_val = 0;
        
        for (let i = 0; i < n; i++) {
            if (arr[i] >= l && arr[i] <= r) {
                cur++;
            } else {
                cur--;
            }
            if (cur > max_val) {
                max_val = cur;
            }
            if (cur < min_val) {
                min_val = cur;
            }
        }
        
        out.push(max_val + ' ' + min_val);
    }
    
    console.log(out.join('\n'));
}

solve();
