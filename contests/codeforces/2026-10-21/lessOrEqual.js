const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [n, k] = lines[0].split(' ').map(Number);
    const arr = lines[1].split(' ').map(Number);
    
    arr.sort((a, b) => a - b);
    
    let ans = -1;
    if (k === 0) {
        ans = arr[0] - 1;
        if (ans < 1) {
            console.log(-1);
        } else {
            console.log(ans);
        }
    } else {
        ans = arr[k - 1];
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (arr[i] <= ans) {
                count++;
            }
        }
        if (count === k) {
            console.log(ans);
        } else {
            console.log(-1);
        }
    }
}

solve();
