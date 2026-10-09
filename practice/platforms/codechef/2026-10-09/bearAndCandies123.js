const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [a, b] = lines[i].split(' ').map(Number);
        let limak = 0;
        let bob = 0;
        let step = 1;
        
        while (true) {
            if (step % 2 === 1) {
                if (limak + step > a) {
                    out.push('Bob');
                    break;
                }
                limak += step;
            } else {
                if (bob + step > b) {
                    out.push('Limak');
                    break;
                }
                bob += step;
            }
            step++;
        }
    }
    console.log(out.join('\n'));
}

solve();
