const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;

    function nextInt() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) {
            pos++;
        }
        if (pos >= input.length) return null;
        let res = 0;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            res = res * 10 + (input.charCodeAt(pos) - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    if (t === null) return;

    const out = [];
    for (let i = 0; i < t; i++) {
        const a = nextInt();
        const b = nextInt();
        const rem = a % b;
        if (rem === 0) {
            out.push(0);
        } else {
            out.push(b - rem);
        }
    }

    console.log(out.join('\n'));
}

solve();
