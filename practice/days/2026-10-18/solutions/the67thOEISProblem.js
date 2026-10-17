const fs = require('fs');

function main() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let t = parseInt(lines[0], 10);
    let idx = 1;
    let out = [];
    for (let i = 0; i < t; i++) {
        let n = parseInt(lines[idx++], 10);
        let res = [];
        let cur = 1;
        let sum = 0;
        while (sum + cur <= n) {
            res.push(cur);
            sum += cur;
            cur++;
        }
        
        let last = n - sum;
        if (last === 0) {
            out.push(res.join(' '));
            continue;
        }

        let lastAdded = res[res.length - 1];
        if (last <= lastAdded) {
            res.pop();
            res.push(last + lastAdded);
        } else {
            res.push(last);
        }
        out.push(res.join(' '));
    }
    console.log(out.join('\n'));
}

main();
