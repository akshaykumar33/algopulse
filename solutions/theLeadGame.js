const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let n = parseInt(lines[0]);
    let maxLead = 0;
    let winner = 0;
    let sum1 = 0;
    let sum2 = 0;

    for (let i = 1; i <= n; i++) {
        let parts = lines[i].trim().split(/\s+/);
        sum1 += parseInt(parts[0]);
        sum2 += parseInt(parts[1]);
        
        let lead = Math.abs(sum1 - sum2);
        if (lead > maxLead) {
            maxLead = lead;
            winner = sum1 > sum2 ? 1 : 2;
        }
    }

    console.log(winner + " " + maxLead);
}

solve();
