const fs = require('fs');

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 2 || lines[0] === '') return;
    let a = parseInt(lines[0], 10);
    let b = parseInt(lines[1], 10);

    let g = gcd(a, b);
    a /= g;
    b /= g;

    let ans = 0;
    const primes = [2, 3, 5];
    for (let p of primes) {
        while (a % p === 0) {
            a /= p;
            ans++;
        }
        while (b % p === 0) {
            b /= p;
            ans++;
        }
    }

    if (a === 1 && b === 1) {
        console.log(ans);
    } else {
        console.log(-1);
    }
}

solve();
