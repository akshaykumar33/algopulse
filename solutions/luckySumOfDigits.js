const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    let n = parseInt(input, 10);
    let bestCount = -1;
    let bestSevens = -1;
    for (let sevens = Math.floor(n / 7); sevens >= 0; sevens--) {
        let rem = n - sevens * 7;
        if (rem % 4 === 0) {
            bestSevens = sevens;
            break;
        }
    }
    if (bestSevens === -1) {
        console.log("-1");
    } else {
        let fours = (n - bestSevens * 7) / 4;
        console.log('4'.repeat(fours) + '7'.repeat(bestSevens));
    }
}

solve();
