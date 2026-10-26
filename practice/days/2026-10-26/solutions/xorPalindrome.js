const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let t = parseInt(input[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        let n = parseInt(input[lineIdx++], 10);
        let s = input[lineIdx++];
        
        let ones = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] === '1') ones++;
        }
        
        let zeros = n - ones;
        
        if (n % 2 === 0) {
            if (ones === zeros || ones % 2 === 0) {
                out.push('YES');
            } else {
                out.push('NO');
            }
        } else {
            out.push('YES');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
