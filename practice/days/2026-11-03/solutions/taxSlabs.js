const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const total = parseInt(tokens[ptr++], 10);
        let tax = 0;
        if (total <= 250000) {
            tax = 0;
        } else if (total <= 500000) {
            tax = 0.05 * (total - 250000);
        } else if (total <= 750000) {
            tax = 0.05 * 250000 + 0.10 * (total - 500000);
        } else if (total <= 1000000) {
            tax = 0.05 * 250000 + 0.10 * 250000 + 0.15 * (total - 750000);
        } else if (total <= 1250000) {
            tax = 0.05 * 250000 + 0.10 * 250000 + 0.15 * 250000 + 0.20 * (total - 1000000);
        } else if (total <= 1500000) {
            tax = 0.05 * 250000 + 0.10 * 250000 + 0.15 * 250000 + 0.20 * 250000 + 0.25 * (total - 1250000);
        } else {
            tax = 0.05 * 250000 + 0.10 * 250000 + 0.15 * 250000 + 0.20 * 250000 + 0.25 * 250000 + 0.30 * (total - 1500000);
        }
        const net = Math.round(total - tax);
        out.push(net);
    }
    console.log(out.join('\n'));
}
solve();
