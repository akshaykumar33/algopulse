const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [n, m] = lines[0].split(' ').map(Number);
    const grid = [];
    const count = new Array(m).fill(0);
    
    for (let i = 0; i < n; i++) {
        const row = lines[i + 1];
        grid.push(row);
        for (let j = 0; j < m; j++) {
            if (row[j] === '1') {
                count[j]++;
            }
        }
    }
    
    let possible = false;
    for (let i = 0; i < n; i++) {
        let canRemove = true;
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === '1' && count[j] === 1) {
                canRemove = false;
                break;
            }
        }
        if (canRemove) {
            possible = true;
            break;
        }
    }
    
    console.log(possible ? 'YES' : 'NO');
}

solve();
