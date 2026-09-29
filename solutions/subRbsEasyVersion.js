const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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
        
        // We need to find if there exists a regular subsequence better than s
        // A known solution: Check if s has any occurrence of "()" 
        // that can be replaced by "((" or similar to make it better
        
        // Actually, simpler: We can ALWAYS get n-2 EXCEPT when s is "((...))"
        // But that failed for (())() if that's really the input...
        
        // Let me implement the actual known working solution:
        // We need to find first position where we have ')' and there's '(' somewhere after
        // AND we can form a regular sequence
        
        let balance = 0;
        let possible = false;
        
        // Find first position where balance becomes 0 after being positive
        // and there are more characters after
        for (let i = 0; i < n; i++) {
            if (s[i] === '(') balance++;
            else balance--;
            
            if (balance === 0 && i < n - 1) {
                // We found a proper prefix that is a regular bracket sequence
                // and there are more characters after
                // We can take this prefix and add something to make it better
                possible = true;
                break;
            }
        }
        
        // Also check if s is "((...))" form
        let isAllOpenThenClose = true;
        const half = n / 2;
        for (let i = 0; i < half; i++) {
            if (s[i] !== '(') {
                isAllOpenThenClose = false;
                break;
            }
        }
        if (isAllOpenThenClose) {
            for (let i = half; i < n; i++) {
                if (s[i] !== ')') {
                    isAllOpenThenClose = false;
                    break;
                }
            }
        }
        
        if (isAllOpenThenClose) {
            results.push(-1);
        } else if (possible) {
            results.push(n - 2);
        } else {
            results.push(-1);
        }
    }
    
    console.log(results.join('\n'));
}