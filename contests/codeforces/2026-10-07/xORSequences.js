const fs = require('fs');

function run() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let t = parseInt(lines[0], 10);
    let ptr = 1;
    let out = [];
    for (let i = 0; i < t; i++) {
        let parts = lines[ptr++].trim().split(/\s+/);
        let x = parseInt(parts[0], 10);
        let y = parseInt(parts[1], 10);
        out.push((x ^ y) & -(x ^ y));
    }
    console.log(out.join('\n'));
}

run();
