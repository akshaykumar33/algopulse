const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    const n = parseInt(input[0], 10);
    const maxPrime = 1000000;
    const isPrime = new Uint8Array(maxPrime + 1);
    isPrime.fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;
    
    for (let i = 2; i * i <= maxPrime; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= maxPrime; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    
    const out = [];
    for (let i = 1; i <= n; i++) {
        const x = Number(input[i]);
        const r = Math.round(Math.sqrt(x));
        if (r * r === x && isPrime[r]) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
