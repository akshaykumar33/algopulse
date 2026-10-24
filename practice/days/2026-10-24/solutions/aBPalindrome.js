const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        let [a, b] = lines[ptr++].split(' ').map(Number);
        let s = lines[ptr++].split('');
        let n = s.length;

        let ok = true;
        for (let i = 0; i < Math.floor(n / 2); i++) {
            let j = n - 1 - i;
            if (s[i] !== '?' && s[j] !== '?') {
                if (s[i] !== s[j]) ok = false;
            } else if (s[i] !== '?') {
                s[j] = s[i];
            } else if (s[j] !== '?') {
                s[i] = s[j];
            }
        }

        if (!ok) {
            out.push('-1');
            continue;
        }

        for (let i = 0; i < n; i++) {
            if (s[i] === '0') a--;
            else if (s[i] === '1') b--;
        }

        if (a < 0 || b < 0) {
            out.push('-1');
            continue;
        }

        for (let i = 0; i < Math.floor(n / 2); i++) {
            let j = n - 1 - i;
            if (s[i] === '?') {
                if (i === j) {
                    if (a >= 1) {
                        s[i] = '0';
                        a--;
                    } else if (b >= 1) {
                        s[i] = '1';
                        b--;
                    }
                } else {
                    if (a >= 2) {
                        s[i] = '0';
                        s[j] = '0';
                        a -= 2;
                    } else if (b >= 2) {
                        s[i] = '1';
                        s[j] = '1';
                        b -= 2;
                    }
                }
            }
        }

        if (n % 2 === 1 && s[Math.floor(n / 2)] === '?') {
            let mid = Math.floor(n / 2);
            if (a >= 1) {
                s[mid] = '0';
                a--;
            } else if (b >= 1) {
                s[mid] = '1';
                b--;
            }
        }

        for (let i = 0; i < Math.floor(n / 2); i++) {
            let j = n - 1 - i;
            if (s[i] !== s[j]) ok = false;
        }

        if (!ok || a !== 0 || b !== 0) {
            out.push('-1');
        } else {
            out.push(s.join(''));
        }
    }
    console.log(out.join('\n'));
}

solve();
