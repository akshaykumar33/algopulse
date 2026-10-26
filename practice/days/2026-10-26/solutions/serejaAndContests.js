const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [x, k] = lines[0].split(' ').map(Number);
    const ridden = new Array(x + 1).fill(false);
    ridden[0] = true; 
    
    let lineIdx = 1;
    for (let i = 0; i < k; i++) {
        if (lineIdx >= lines.length) break;
        const parts = lines[lineIdx++].split(' ').map(Number);
        if (parts[0] === 1) {
            ridden[parts[1]] = true;
            ridden[parts[2]] = true;
        } else {
            ridden[parts[1]] = true;
        }
    }
    
    let minContests = 0;
    let maxContests = 0;
    
    let i = 1;
    while (i < x) {
        if (!ridden[i]) {
            if (!ridden[i + 1] && i + 1 < x) {
                minContests++;
                i += 2;
            } else {
                minContests++;
                i += 1;
            }
        } else {
            i++;
        }
    }
    
    for (let j = 1; j < x; j++) {
        if (!ridden[j]) {
            maxContests++;
        }
    }
    
    console.log(`${minContests} ${maxContests}`);
}

solve();
