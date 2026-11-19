const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const mod = 1000000007n;
  const out = [];

  while (ptr < input.length) {
    const h = parseInt(input[ptr++], 10);
    if (!h || h === 0) break;
    const numNodes = (1 << h) - 1;
    const v = new Array(numNodes + 1);
    for (let i = 1; i <= numNodes; i++) {
      v[i] = BigInt(input[ptr++]);
    }
    const val = new Array(numNodes + 1);
    const modVal = new Array(numNodes + 1);
    const firstLeaf = 1 << (h - 1);

    for (let i = numNodes; i >= 1; i--) {
      if (i >= firstLeaf) {
        val[i] = v[i];
        modVal[i] = v[i] % mod;
      } else {
        const left = 2 * i;
        const right = 2 * i + 1;
        if (val[left] >= val[right]) {
          val[i] = v[i] * val[left];
          modVal[i] = (v[i] * modVal[left]) % mod;
        } else {
          val[i] = v[i] * val[right];
          modVal[i] = (v[i] * modVal[right]) % mod;
        }
      }
    }

    out.push(modVal[1].toString());
  }

  console.log(out.join('\n'));
}

solve();
