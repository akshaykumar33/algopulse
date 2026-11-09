const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const freq = new Int32Array(k + 1);
    const islands = new Array(n);

    for (let i = 0; i < n; i++) {
      const p = parseInt(tokens[ptr++], 10);
      const items = new Int32Array(p);
      for (let j = 0; j < p; j++) {
        const item = parseInt(tokens[ptr++], 10);
        items[j] = item;
        freq[item]++;
      }
      islands[i] = items;
    }

    let missing = false;
    for (let x = 1; x <= k; x++) {
      if (freq[x] === 0) {
        missing = true;
        break;
      }
    }

    if (missing) {
      out.push('sad');
      continue;
    }

    let canSkip = false;
    for (let i = 0; i < n; i++) {
      const items = islands[i];
      let hasUnique = false;
      for (let j = 0; j < items.length; j++) {
        if (freq[items[j]] === 1) {
          hasUnique = true;
          break;
        }
      }
      if (!hasUnique) {
        canSkip = true;
        break;
      }
    }

    if (canSkip) {
      out.push('some');
    } else {
      out.push('all');
    }
  }

  console.log(out.join('\n'));
}

solve();
