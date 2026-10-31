const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let sum = 0;
        const arr = [];
        for (let j = 0; j < n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            arr.push(val);
            sum += val;
        }
        arr.sort((a, b) => a - b);
        
        let ans = sum;
        if (n === 1) {
            out.push(arr[0]);
        } else {
            let xor = 0;
            for (let j = 0; j < n; j++) {
                xor ^= arr[j];
            }
            if (xor === 0) {
                out.push(sum);
            } else {
                let found = false;
                for (let j = 0; j < n; j++) {
                    if ((arr[j] ^ xor) < arr[j]) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    out.push(sum);
                } else {
                    let minAdd = Infinity;
                    for (let j = 0; j < n; j++) {
                        let cur = arr[j];
                        let bit = 1;
                        while ((cur & bit) !== 0) {
                            bit <<= 1;
                        }
                        minAdd = Math.min(minAdd, bit);
                    }
                    out.push(sum + minAdd);
                }
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
