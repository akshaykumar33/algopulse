const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

// Main function
function solve() {
  const T = readInt();
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const s = readLine().trim();

    // Check if already sorted
    let isSorted = true;
    for (let i = 0; i < n - 1; i++) {
      if (s[i] > s[i + 1]) {
        isSorted = false;
        break;
      }
    }
    if (isSorted) {
      print(0);
      continue;
    }

    // Case 1: s[0] === '1'
    // Since s[0] is fixed, the only reachable sorted string is 1^n.
    // Minimum operations = count of '0's to turn into '1's.
    if (s[0] === '1') {
      let zeros = 0;
      for (let i = 0; i < n; i++) {
        if (s[i] === '0') zeros++;
      }
      print(zeros);
      continue;
    }

    // Case 2: s[0] === '0'
    // Find the first '1' in s (0-based index)
    let firstOne = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        firstOne = i;
        break;
      }
    }

    if (firstOne === -1) {
      print(0);
      continue;
    }

    // Prefix sum of 1s: pref[i] = count of '1's in s[0...i-1]
    const pref = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + (s[i] === '1' ? 1 : 0);
    }
    const totalZeros = n - pref[n];

    // For target 0^k 1^(n-k), 1s cannot start before firstOne.
    // So k ranges from firstOne to n.
    let minOps = n;
    for (let k = firstOne; k <= n; k++) {
      const onesInPrefix = pref[k];
      const zerosInSuffix = totalZeros - (k - pref[k]);
      const cost = onesInPrefix + zerosInSuffix;
      if (cost < minOps) {
        minOps = cost;
      }
    }

    print(minOps);
  }
}

// Execute and output
solve();
printAll();
