const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const all = [];
  for (let i = 0; i < n; i++) {
    const k = parseInt(tokens[ptr++], 10);
    const a0 = parseInt(tokens[ptr++], 10);
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    const mVal = parseInt(tokens[ptr++], 10);
    let cur = a0;
    all.push({ val: cur, qId: i, idx: 0 });
    for (let j = 1; j < k; j++) {
      cur = Number((BigInt(cur) * BigInt(x) + BigInt(y)) % BigInt(mVal));
      all.push({ val: cur, qId: i, idx: j });
    }
  }
  all.sort((a, b) => a.val !== b.val ? a.val - b.val : a.qId - b.qId);
  let inversions = 0;
  for (let i = 1; i < all.length; i++) {
    if (all[i].qId < all[i - 1].qId) inversions++;
  }
  console.log(inversions);
  const limit = Math.min(all.length, m);
  for (let i = 0; i < limit; i++) {
    console.log(all[i].val + ' ' + (all[i].qId + 1));
  }
}
