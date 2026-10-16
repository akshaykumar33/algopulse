const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const [n, m] = lines[0].split(/\s+/).map(Number);
    const arr = lines[1].split(/\s+/).map(Number);

    const arrMax = [...arr];
    let maxMoney = 0;
    for (let i = 0; i < n; i++) {
        arrMax.sort((a, b) => b - a);
        maxMoney += arrMax[0];
        arrMax[0]--;
    }

    const arrMin = [...arr];
    let minMoney = 0;
    for (let i = 0; i < n; i++) {
        arrMin.sort((a, b) => a - b);
        let idx = 0;
        while (arrMin[idx] === 0) idx++;
        minMoney += arrMin[idx];
        arrMin[idx]--;
    }

    console.log(`${maxMoney} ${minMoney}`);
}

solve();
