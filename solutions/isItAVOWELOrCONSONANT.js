const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const c = lines[0].trim();
    const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
    if (vowels.has(c)) {
        console.log("Vowel");
    } else {
        console.log("Consonant");
    }
}

solve();
