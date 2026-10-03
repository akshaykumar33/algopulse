const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let t = parseInt(input[0]);
    let idx = 1;
    let out = [];
    
    while (t--) {
        let n = parseInt(input[idx++]);
        let arr = input[idx++].split(' ').map(Number);
        
        let ans = 0;
        let cur = -1;
        for (let i = 0; i < n; i++) {
            if (arr[i] > cur) {
                cur = arr[i];
                ans++;
            }
        }
        out.push(ans);
    };
    
    console.log(out.join('\n'));
}

solve();
