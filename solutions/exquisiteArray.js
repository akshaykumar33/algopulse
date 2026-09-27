const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class DSU {
  constructor(n) {
    this.parent = new Array(n);
    this.size = new Array(n).fill(0);
    this.active = new Array(n).fill(false);
    this.total = 0n; // Using BigInt for large numbers
    
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  pairs(len) {
    // len * (len + 1) / 2
    return BigInt(len) * BigInt(len + 1) / 2n;
  }

  activate(x) {
    if (this.active[x]) return;
    
    this.active[x] = true;
    this.size[x] = 1;
    this.total += this.pairs(1);

    // Try merge with left neighbor
    if (x > 0 && this.active[x - 1]) {
      const leftRoot = this.find(x - 1);
      const rightRoot = this.find(x);
      
      if (leftRoot !== rightRoot) {
        this.total -= this.pairs(this.size[leftRoot]) + this.pairs(this.size[rightRoot]);
        
        // Merge right into left
        this.parent[rightRoot] = leftRoot;
        this.size[leftRoot] += this.size[rightRoot];
        
        this.total += this.pairs(this.size[leftRoot]);
      }
    }

    // Try merge with right neighbor
    if (x + 1 < this.size.length && this.active[x + 1]) {
      const leftRoot = this.find(x);
      const rightRoot = this.find(x + 1);
      
      if (leftRoot !== rightRoot) {
        this.total -= this.pairs(this.size[leftRoot]) + this.pairs(this.size[rightRoot]);
        
        // Merge right into left
        this.parent[rightRoot] = leftRoot;
        this.size[leftRoot] += this.size[rightRoot];
        
        this.total += this.pairs(this.size[leftRoot]);
      }
    }
  }
}

async function processInput() {
  const lines = [];
  
  for await (const line of rl) {
    lines.push(line);
  }

  let idx = 0;
  const t = parseInt(lines[idx++]);
  const results = [];

  for (let testCase = 0; testCase < t; testCase++) {
    const n = parseInt(lines[idx++]);
    const p = lines[idx++].split(' ').map(Number);
    
    // Compute differences array d
    const d = new Array(n - 1);
    for (let i = 0; i < n - 1; i++) {
      d[i] = Math.abs(p[i] - p[i + 1]);
    }

    // Create buckets for each possible difference value
    const buckets = Array.from({ length: n + 1 }, () => []);
    for (let i = 0; i < n - 1; i++) {
      buckets[d[i]].push(i);
    }

    const dsu = new DSU(n - 1);
    const ans = new Array(n + 1).fill(0n); // ans[k] for k = 1..n-1

    // Process from k = n-1 down to 1
    for (let k = n - 1; k >= 1; k--) {
      for (const idx of buckets[k]) {
        dsu.activate(idx);
      }
      ans[k] = dsu.total;
    }

    // Collect output for this test case
    const output = [];
    for (let k = 1; k <= n - 1; k++) {
      output.push(ans[k].toString());
    }
    results.push(output.join(' '));
  }

  // Print all results
  console.log(results.join('\n'));
}

processInput();