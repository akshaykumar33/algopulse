const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    const tokens = input.split(/\s+/);
    const unique = new Set(tokens);
    console.log(4 - unique.size);
}

main();
