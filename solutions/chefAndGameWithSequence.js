const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    let out = [];
    
    while (t--) {
        let n = parseInt(lines[lineIdx++], 10);
        let arr = lines[lineIdx++].split(' ').map(Number);
        
        let oddCount = 0;
        for (let i = 0; i < n; i++) {
            if (arr[i] % 2 !== 0) {
                oddCount++;
            }
        }
        
        if (oddCount % 2 === 0 || n === 1) {
            out.push(1);
        } else {
            out.push(2);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
