const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];

    let maxPrefixOnes = 0;
    let currentPrefixOnes = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        currentPrefixOnes++;
      } else {
        break;
      }
    }
    maxPrefixOnes = currentPrefixOnes;

    let maxBlockAnywhere = 0;
    let currentBlock = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === '1') {
        currentBlock++;
      } else {
        maxBlockAnywhere = Math.max(maxBlockAnywhere, currentBlock);
        currentBlock = 0;
      }
    }
    maxBlockAnywhere = Math.max(maxBlockAnywhere, currentBlock);

    let ans = 0;
    // Case 1: All ones are part of the initial prefix
    // This is simply maxPrefixOnes. If maxPrefixOnes itself is the largest block,
    // then maxBlockAnywhere might be equal to maxPrefixOnes.
    // We need to iterate over all possible 'splitting points' for the two blocks.
    // The problem asks for 'a prefix (which must be all ones)' and 'an additional block of ones from the remaining string'.
    // This phrasing implies that the 'prefix' must be s[0...k-1] where all are 1s.
    // And the 'additional block' must be disjoint from this prefix.

    // Let's compute prefix sums of ones, and suffix max blocks of ones.
    const prefixOnesCount = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
      prefixOnesCount[i + 1] = prefixOnesCount[i] + (s[i] === '1' ? 1 : 0);
    }

    const suffixMaxBlock = new Array(n + 1).fill(0);
    let currentSuffixBlock = 0;
    for (let i = n - 1; i >= 0; i--) {
      if (s[i] === '1') {
        currentSuffixBlock++;
      } else {
        currentSuffixBlock = 0;
      }
      suffixMaxBlock[i] = Math.max(suffixMaxBlock[i + 1], currentSuffixBlock);
    }
    
    ans = 0;
    currentPrefixOnes = 0;
    for (let i = 0; i <= n; i++) { // i is the length of the prefix of ALL ones
      if (i > 0 && s[i - 1] === '0') {
        break; // The prefix s[0...i-1] is no longer all '1's
      }
      
      // currentPrefixOnes is actually `i` here if all s[0...i-1] are '1's
      // We need max block of ones in s[i...n-1]
      let maxBlockInSuffix = 0;
      let tempCurrentBlock = 0;
      for (let j = i; j < n; j++) {
        if (s[j] === '1') {
          tempCurrentBlock++;
        } else {
          maxBlockInSuffix = Math.max(maxBlockInSuffix, tempCurrentBlock);
          tempCurrentBlock = 0;
        }
      }
      maxBlockInSuffix = Math.max(maxBlockInSuffix, tempCurrentBlock);

      ans = Math.max(ans, i + maxBlockInSuffix);
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
