const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let inputLines = [];
let currentLine = 0;

rl.on('line', (line) => {
    inputLines.push(line.trim());
});

rl.on('close', () => {
    solve();
});

function readLine() {
    return inputLines[currentLine++];
}

function solve() {
    const t = parseInt(readLine());
    const results = [];
    
    for (let testCase = 0; testCase < t; testCase++) {
        const n = parseInt(readLine());
        const s = readLine();
        
       
        let inversions = 0;
        let onesCount = 0;
        
        for (let i = 0; i < n; i++) {
            if (s[i] === '1') {
                onesCount++;
            } else {
                inversions += onesCount;
            }
        }
        
        if (inversions === 0) {

            results.push("Bob");
            continue;
        }
        

        let found = false;
        for (let i = 0; i < n - 1; i++) {
            if (s[i] === '1' && s[i + 1] === '0') {
                results.push("Alice");
                results.push(`2\n${i + 1} ${i + 2}`);
                found = true;
                break;
            }
        }
        
   
        if (!found) {

            for (let i = 0; i < n; i++) {
                if (s[i] === '1') {
                    for (let j = i + 1; j < n; j++) {
                        if (s[j] === '0') {
                            results.push("Alice");
                            results.push(`2\n${i + 1} ${j + 1}`);
                            found = true;
                            break;
                        }
                    }
                    if (found) break;
                }
            }
        }
    }
    
    console.log(results.join('\n'));
}