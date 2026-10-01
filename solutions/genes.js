const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [c1, c2] = lines[0].split(' ');
    
    if (c1 === 'R' || c2 === 'R') {
        console.log('R');
    } else if (c1 === 'B' || c2 === 'B') {
        console.log('B');
    } else {
        console.log('G');
    }
}


solve();
