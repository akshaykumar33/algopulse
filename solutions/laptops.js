const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    const n = parseInt(input[0], 10);
    let found = false;
    let idx = 1;
    for (let i = 0; i < n; i++) {
        const a = parseInt(input[idx++], 10);
        const b = parseInt(input[idx++], 10);
        if (a !== b) {
            found = true;
        }
    }
    if (found) {
        console.log("Happy Alex");
    } else {
        console.log("Poor Alex");
    }
}

main();
