const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const n = parseInt(lines[0]);
    const children = Array.from({ length: n + 1 }, () => []);
    
    for (let i = 1; i < n; i++) {
        const p = parseInt(lines[i]);
        children[p].push(i + 1);
    }
    
    let isSpruce = true;
    for (let i = 1; i <= n; i++) {
        if (children[i].length > 0) {
            let leafCount = 0;
            for (const child of children[i]) {
                if (children[child].length === 0) {
                    leafCount++;
                }
            }
            if (leafCount < 3) {
                isSpruce = false;
                break;
            }
        }
    }
    
    console.log(isSpruce ? "Yes" : "No");
}

solve();
