const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    let lineIdx = 1;
    const out = [];

    const maxLimit = 31623;
    const isPrimeSmall = new Uint8Array(maxLimit + 1);
    isPrimeSmall.fill(1);
    isPrimeSmall[0] = 0;
    isPrimeSmall[1] = 0;
    for (let i = 2; i * i <= maxLimit; i++) {
        if (isPrimeSmall[i]) {
            for (let j = i * i; j <= maxLimit; j += i) {
                isPrimeSmall[j] = 0;
            }
        }
    }
    const primes = [];
    for (let i = 2; i <= maxLimit; i++) {
        if (isPrimeSmall[i]) primes.push(i);
    }

    for (let c = 0; c < t; c++) {
        if (lineIdx >= lines.length) break;
        const parts = lines[lineIdx++].trim().split(/\s+/);
        const m = parseInt(parts[0], 10);
        const n = parseInt(parts[1], 10);

        const rangeSize = n - m + 1;
        const isPrimeRange = new Uint8Array(rangeSize);
        isPrimeRange.fill(1);

        for (let i = 0; i < primes.length; i++) {
            const p = primes[i];
            if (p * p > n) break;
            let start = Math.floor(m / p) * p;
            if (start < m) start += p;
            if (start < p * p) start = p * p;
            for (let j = start; j <= n; j += p) {
                if (j >= m) {
                    isPrimeRange[j - m] = 0;
                }
            }
        }

        for (let i = 0; i < rangeSize; i++) {
            const val = m + i;
            if (val > 1 && isPrimeRange[i]) {
                out.push(val);
            }
        }
        if (c < t - 1) {
            out.push('');
        }
    }
    console.log(out.join('\n'));
}

solve();
