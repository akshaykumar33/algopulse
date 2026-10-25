const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const [n, x, y] = lines[ptr++].split(' ').map(Number);
        const a = lines[ptr++].split(' ').map(Number);
        const b = lines[ptr++].split(' ').map(Number);

        let possible = true;
        for (let j = 0; j < n; j++) {
            const diff = b[j] - a[j];
            if (diff !== x && diff !== y) {
                possible = false;
                break;
            }
        }
        out.push(possible ? 'Yes' : 'No');
    }

    console.log(out.join('\n'));
}

solve();
