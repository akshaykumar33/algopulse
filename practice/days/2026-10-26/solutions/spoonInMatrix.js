const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0], 10);
    let lineIdx = 1;
    const out = [];
    
    while (t-- > 0) {
        const [r, c] = lines[lineIdx++].split(' ').map(Number);
        const grid = [];
        for (let i = 0; i < r; i++) {
            grid.push(lines[lineIdx++].toLowerCase());
        }
        
        let found = false;
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (
                    i + 4 <= r &&
                    grid[i][j] === 's' &&
                    grid[i+1][j] === 'p' &&
                    grid[i+2][j] === 'o' &&
                    grid[i+3][j] === 'o' &&
                    grid[i+4][j] === 'n'
                ) {
                    found = true;
                    break;
                }
                if (
                    j + 4 < c &&
                    grid[i][j] === 's' &&
                    grid[i][j+1] === 'p' &&
                    grid[i][j+2] === 'o' &&
                    grid[i][j+3] === 'o' &&
                    grid[i][j+4] === 'n'
                ) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        } 
        
        if (found) {
            out.push("There is a spoon!");
        } else {
            out.push("There is indeed no spoon!");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
