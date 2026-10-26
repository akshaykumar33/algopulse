const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return;
    const n = parseInt(lines[0].trim(), 10);
    let lineIdx = 1;

    const names = [];
    const taxi = [];
    const pizza = [];
    const cafe = [];

    function getType(num) {
        const d = num.replace(/-/g, '').split('').map(Number);
        if (d.every(x => x === d[0])) return 'taxi';
        let dec = true;
        for (let i = 1; i < 6; i++) {
            if (d[i] >= d[i - 1]) {
                dec = false;
                break;
            }
        }
        if (dec) return 'pizza';
        return 'cafe';
    }

    for (let i = 0; i < n; i++) {
        const parts = lines[lineIdx++].trim().split(/\s+/);
        const k = parseInt(parts[0], 10);
        const name = parts[1];
        names.push(name);

        let tCount = 0, pCount = 0, cCount = 0;
        for (let j = 0; j < k; j++) {
            const num = lines[lineIdx++].trim();
            const tp = getType(num);
            if (tp === 'taxi') tCount++;
            else if (tp === 'pizza') pCount++;
            else cCount++;
        }
        taxi.push(tCount);
        pizza.push(pCount);
        cafe.push(cCount);
    }

    const maxT = Math.max(...taxi);
    const maxP = Math.max(...pizza);
    const maxC = Math.max(...cafe);

    const bestT = names.filter((_, i) => taxi[i] === maxT);
    const bestP = names.filter((_, i) => pizza[i] === maxP);
    const bestC = names.filter((_, i) => cafe[i] === maxC);

    console.log(`If you want to call a taxi, you should call: ${bestT.join(', ')}.`);
    console.log(`If you want to order a pizza, you should call: ${bestP.join(', ')}.`);
    console.log(`If you want to go to a cafe with a wonderful girl, you should call: ${bestC.join(', ')}.`);
}

solve();
