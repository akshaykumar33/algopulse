const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const countMap = new Map();
  const sampleMap = new Map();

  for (let i = 0; i < n; i++) {
    const s = input[ptr++];
    const len = s.length;
    const seenInFile = new Set();
    for (let start = 0; start < len; start++) {
      for (let end = start + 1; end <= len; end++) {
        const sub = s.slice(start, end);
        seenInFile.add(sub);
      }
    }
    for (const sub of seenInFile) {
      countMap.set(sub, (countMap.get(sub) || 0) + 1);
      if (!sampleMap.has(sub)) sampleMap.set(sub, s);
    }
  }

  const q = parseInt(input[ptr++], 10);
  const out = [];
  for (let i = 0; i < q; i++) {
    const query = input[ptr++];
    const cnt = countMap.get(query) || 0;
    if (cnt > 0) {
      out.push(cnt + ' ' + sampleMap.get(query));
    } else {
      out.push('0 -');
    }
  }

  console.log(out.join('\n'));
}

solve();
