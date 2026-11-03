const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

const solve = () => {
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = parseInt(tokens[ptr++], 10);
    }

    let oddCount = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] % 2 !== 0) {
            oddCount++;
        }
    }

    if (oddCount === 0) {
        return 0;
    } else {
        return oddCount;
    }
};

const out = [];
const t = parseInt(tokens[ptr++], 10);
for (let i = 0; i < t; i++) {
    out.push(solve());
}
console.log(out.join('\n'));
