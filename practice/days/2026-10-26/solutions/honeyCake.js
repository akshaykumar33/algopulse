const fs = require('fs');

function gcd(a, b) {
    while (b) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length < 4) return;
    let w = BigInt(input[0]);
    let h = BigInt(input[1]);
    let d = BigInt(input[2]);
    let n = BigInt(input[3]);
    
    let gw = gcd(w, n);
    n /= gw;
    let gh = gcd(h, n);
    n /= gh;
    let gd = gcd(d, n);
    n /= gd;
    
    if (n > 1n) {
        console.log("-1");
    } else {
        console.log(`${gw - 1n} ${gh - 1n} ${gd - 1n}`);
    }
}

solve();
