const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const [a, b, s] = lines[0].split(/\s+/).map(Number);
    const dist = Math.abs(a) + Math.abs(b);
    if (s >= dist && (s - dist) % 2 === 0) {
        console.log("Yes");
    } else {
        console.log("No");
    }
}

solve();
