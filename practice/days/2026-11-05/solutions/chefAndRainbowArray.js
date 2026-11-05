const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(tokens[ptr++], 10);
        }

        let ok = true;
        if (arr[0] !== 1 || arr[n - 1] !== 1) {
            ok = false;
        } else {
            let l = 0, r = n - 1;
            let cur = 1;
            while (l <= r) {
                if (arr[l] !== arr[r] || arr[l] !== cur) {
                    ok = false;
                    break;
                }
                if (arr[l] === 7) {
                    break;
                }
                if (arr[l + 1] === arr[l]) {
                    l++;
                    r--;
                } else if (arr[l + 1] === arr[l] + 1) {
                    cur++;
                    l++;
                    r--;
                } else {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                for (let j = l; j <= r; j++) {
                    if (arr[j] !== 7) {
                        ok = false;
                        break;
                    }
                }
            }
        }

        if (ok) {
            out.push('yes');
        } else {
            out.push('no');
        }
    }

    console.log(out.join('\n'));
}

solve();
