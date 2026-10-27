const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) {
        a.push(parseInt(tokens[ptr++], 10));
    }
    
    let collected = 0;
    let turns = 0;
    let dir = 1;
    const vis = new Array(n).fill(false);
    
    while (collected < n) {
        let collectedInPass = 0;
        if (dir === 1) {
            for (let i = 0; i < n; i++) {
                if (!vis[i] && a[i] <= collected) {
                    vis[i] = true;
                    collected++;
                    collectedInPass++;
                }
            }
        } else {
            for (let i = n - 1; i >= 0; i--) {
                if (!vis[i] && a[i] <= collected) {
                    vis[i] = true;
                    collected++;
                    collectedInPass++;
                }
            }
        }
        if (collected === n) break;
        turns++;
        dir *= -1;
    }
    
    console.log(turns);
}

solve();
