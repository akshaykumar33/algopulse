const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        let heroes = 1;
        let villains = 1;
        let winner = 'draw';

        for (let i = 0; i < n; i++) {
            const name = tokens[ptr++];
            const isHero = name.endsWith('man') || name.endsWith('woman');
            if (winner === 'draw') {
                if (isHero) heroes++;
                else villains++;

                if (heroes - villains >= 2) {
                    winner = 'superheroes';
                } else if (villains - heroes >= 3) {
                    winner = 'villains';
                }
            }
        }
        out.push(winner);
    }

    console.log(out.join('\n'));
}

solve();
