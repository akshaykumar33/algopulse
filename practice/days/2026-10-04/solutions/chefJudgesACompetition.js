const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0]);
    let idx = 1;
    let out = [];
    
    while (t--) {
        let n = parseInt(lines[idx++]);
        let a = lines[idx++].split(' ').map(Number);
        let b = lines[idx++].split(' ').map(Number);
        
        a.sort((x, y) => x - y);
        b.sort((x, y) => x - y);
        
        let sumA = 0;
        for (let i = 0; i < n - 1; i++) {
            sumA += a[i];
        }
        
        let sumB = 0;
        for (let i = 0; i < n - 1; i++) {
            sumB += b[i];
        }
        
        if (sumA < sumB) {
            out.push('Alice');
        } else if (sumB < sumA) {
            out.push('Bob');
        } else {
            out.push('Draw');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
