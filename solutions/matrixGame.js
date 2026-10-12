const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const [n, m] = input[ptr++].split(' ').map(Number);
        const rowHas = new Array(n).fill(false);
        const colHas = new Array(m).fill(false);
        for (let r = 0; r < n; r++) {
            const row = input[ptr++].split(' ').map(Number);
            for (let c = 0; c < m; c++) {
                if (row[c] === 1) {
                    rowHas[r] = true;
                    colHas[c] = true;
                }
            }
        }
        let rEmpty = 0;
        for (let r = 0; r < n; r++) {
            if (!rowHas[r]) rEmpty++;
        }
        let cEmpty = 0;
        for (let c = 0; c < m; c++) {
            if (!colHas[c]) cEmpty++;
        }
        const moves = Math.min(rEmpty, cEmpty);
        if (moves % 2 === 1) {
            out.push("Ashishgup");
        } else {
            out.push("Vivek");
        }
    }
    console.log(out.join('\n'));
}

solve();
