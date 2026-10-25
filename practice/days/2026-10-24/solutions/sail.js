const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [t, sx, sy, ex, ey] = lines[0].split(' ').map(Number);
    const s = lines[1];
    
    let x = sx;
    let y = sy;
    
    for (let i = 0; i < t; i++) {
        if (x === ex && y === ey) {
            console.log(i);
            return;
        }
        
        const c = s[i];
        if (c === 'E' && x < ex) x++;
        else if (c === 'W' && x > ex) x--;
        else if (c === 'N' && y < ey) y++;
        else if (c === 'S' && y > ey) y--;
    }
    
    if (x === ex && y === ey) {
        console.log(t);
    } else {
        console.log(-1);
    }
}

solve();
