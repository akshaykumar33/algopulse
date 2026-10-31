const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  const countSetBits = (n) => {
    let count = 0;
    while (n > 0) {
      count += n & 1;
      n >>= 1;
    }
    return count;
  };

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(parseInt(tokens[ptr++], 10));
    }

    const groups = new Map();
    for (let i = 0; i < n; i++) {
      const bits = countSetBits(arr[i]);
      if (!groups.has(bits)) {
        groups.set(bits, { vals: [], indices: [] });
      }
      groups.get(bits).vals.push(arr[i]);
      groups.get(bits).indices.push(i);
    }

    const sortedArr = [...arr].sort((a, b) => a - b);
    let possible = true;

    for (const [bits, group] of groups) {
      group.vals.sort((a, b) => a - b);
      for (let i = 0; i < group.vals.length; i++) {
        const idx = group.indices[i];
        if (sortedArr[idx] !== group.vals[i]) {
          possible = false;
          break;
        }
      }
      if (!possible) break;
    }

    if (possible) {
      out.push("Yes");
    } else {
      out.push("No");
    }
  }

  console.log(out.join('\n'));
}

solve();
