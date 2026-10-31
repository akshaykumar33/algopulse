const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const m = parseInt(tokens[ptr++], 10);
    const n = parseInt(tokens[ptr++], 10);

    const b = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(parseInt(tokens[ptr++], 10));
        }
        b.push(row);
    }

    const a = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(1);
        }
        a.push(row);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (b[i][j] === 0) {
                for (let k = 0; k < n; k++) {
                    a[i][k] = 0;
                }
                for (let k = 0; k < m; k++) {
                    a[k][j] = 0;
                }
            }
        }
    }

    const check = [];
    for (let i = 0; i < m; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(0);
        }
        check.push(row);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (a[i][j] === 1) {
                for (let k = 0; k < n; k++) {
                    check[i][k] = 1;
                }
                for (let k = 0; k < m; k++) {
                    check[k][j] = 1;
                }
            }
        }
    }

    let ok = true;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (b[i][j] !== check[i][j]) {
                ok = false;
            }
        }
    }

    const out = [];
    if (!ok) {
        out.push("NO");
    } else {
        out.push("YES");
        for (let i = 0; i < m; i++) {
            out.push(a[i].join(' '));
        }
    }
    console.log(out.join('\n'));
}

solve();
