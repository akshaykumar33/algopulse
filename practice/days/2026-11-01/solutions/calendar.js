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
    if (input.length < 2) return;
    const p1 = input[0].split(':').map(Number);
    const p2 = input[1].split(':').map(Number);
    const t1 = dateToDays(p1[0], p1[1], p1[2]);
    const t2 = dateToDays(p2[0], p2[1], p2[2]);
    console.log(Math.abs(t1 - t2));
}

solve();
