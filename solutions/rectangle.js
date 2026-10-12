const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const nums = lines[i].trim().split(/\s+/).map(Number);
        nums.sort((a, b) => a - b);
        if (nums[0] === nums[1] && nums[2] === nums[3]) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
