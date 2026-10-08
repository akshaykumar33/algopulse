const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(input[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (lineIdx >= input.length) break;
        const [n, k] = input[lineIdx++].split(/\s+/).map(Number);
        const arr = input[lineIdx++].split(/\s+/).map(Number);
        
        arr.sort((a, b) => a - b);
        
        let left = 0;
        let right = n - 1;
        let ans = 0;
        
        while (left < right) {
            const sum = arr[left] + arr[right];
            if (sum === k) {
                ans++;
                left++;
                right--;
            } else if (sum < k) {
                left++;
            } else {
                right--;
            }
        }
        
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
