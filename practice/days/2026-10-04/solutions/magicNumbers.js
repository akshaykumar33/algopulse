const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const s = lines[0];
    
    for (let i = 0; i < s.length; ) {
        if (s.startsWith('144', i)) {
            i += 3;
        } else if (s.startsWith('14', i)) {
            i += 2;
        } else if (s.startsWith('1', i)) {
            i += 1;
        } else {
            console.log('NO');
            return;
        }
    }
    console.log('YES');
}

solve();
