const fs = require('fs');

function isLeap(y) {
    return (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);
}

function daysInMonth(y, m) {
    const days = [0, 31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return days[m];
}

function dateToDays(y, m, d) {
    let cnt = 0;
    for (let i = 1; i < y; i++) {
        cnt += isLeap(i) ? 366 : 365;
    }
    for (let i = 1; i < m; i++) {
        cnt += daysInMonth(y, i);
    }
    cnt += d;
    return cnt;
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length < 2 || input[0] === '') return;
    
    const [y1, m1, d1] = input[0].split(':').map(Number);
    const [y2, m2, d2] = input[1].split(':').map(Number);

    const t1 = dateToDays(y1, m1, d1);
    const t2 = dateToDays(y2, m2, d2);

    console.log(Math.abs(t1 - t2));
}

solve();
