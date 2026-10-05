const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const nums = lines[i].split(/\s+/).map(Number);
        const p = nums[5];
        let sum = 0;
        for (let j = 0; j < 5; j++) {
            sum += nums[j] * p;
        }
        if (sum > 120) {
            out.push('Yes');
        } else {
            out.push('No');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
