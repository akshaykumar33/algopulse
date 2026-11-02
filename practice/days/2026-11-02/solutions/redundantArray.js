const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);

let ptr = 0;

function solve() {
    const n = parseInt(tokens[ptr++], 10);
    if (n === 0) {
        return 0;
    }

    const freqMap = new Map();
    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        freqMap.set(val, (freqMap.get(val) || 0) + 1);
    }

    let maxFreq = 0;
    for (const count of freqMap.values()) {
        if (count > maxFreq) {
            maxFreq = count;
        }
    }

    return n - maxFreq;
}

const out = [];
const t = parseInt(tokens[ptr++], 10);
for (let i = 0; i < t; i++) {
    out.push(solve());
}

console.log(out.join('\n'));
