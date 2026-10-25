const fs = require('fs');

function main() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    
    const n = parseInt(input[0]);
    const arr = input[1].split(' ').map(Number);
    
    const freq = {};
    for (let i = 0; i < n; i++) {
        freq[arr[i]] = (freq[arr[i]] || 0) + 1;
    }
    
    let conanWins = false;
    for (const val in freq) {
        if (freq[val] % 2 !== 0) {
            conanWins = true;
            break;
        }
    }
    
    console.log(conanWins ? "Conan" : "Agasa");
}

main();
