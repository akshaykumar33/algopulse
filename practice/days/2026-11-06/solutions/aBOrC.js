const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const items = [];
    for (let i = 0; i < n; i++) {
      const a = Number(input[ptr++]);
      const b = Number(input[ptr++]);
      const c = Number(input[ptr++]);
      items.push({ val: a, row: i });
      items.push({ val: b, row: i });
      items.push({ val: c, row: i });
    }

    items.sort((x, y) => x.val - y.val);

    const rowCount = new Int32Array(n);
    let uniqueRows = 0;
    let minDiff = Infinity;
    let left = 0;

    for (let right = 0; right < items.length; right++) {
      const r = items[right].row;
      if (rowCount[r] === 0) uniqueRows++;
      rowCount[r]++;

      while (uniqueRows === n) {
        const diff = items[right].val - items[left].val;
        if (diff < minDiff) minDiff = diff;

        const leftRow = items[left].row;
        rowCount[leftRow]--;
        if (rowCount[leftRow] === 0) uniqueRows--;
        left++;
      }
    }

    out.push(minDiff);
  }

  console.log(out.join('\n'));
}

solve();

