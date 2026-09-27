const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

let idx = 0;
const t = input[idx++];
const results = [];

for (let _ = 0; _ < t; _++) {
    const n = input[idx++];
    const degree = new Array(n + 1).fill(0);
    
    for (let i = 0; i < n - 1; i++) {
        const u = input[idx++];
        const v = input[idx++];
        degree[u]++;
        degree[v]++;
    }
    
    let leaves = 0;
    for (let i = 2; i <= n; i++) {
        if (degree[i] === 1) leaves++;
    }
    
    // Handle case where root is degree 1 (tree is basically a line)
    if (n > 1 && degree[1] === 1) leaves++;
    
    results.push(leaves % 3 === 2 ? "NO" : "YES");
}

console.log(results.join("\n"));