const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  while (ptr < input.length) {
    const n = parseInt(input[ptr++], 10);
    if (isNaN(n)) break;
    const k = parseInt(input[ptr++], 10);
    const map = new Map();
    for (let i = 0; i < n; i++) {
      const v = parseInt(input[ptr++], 10);
      let list = map.get(v);
      if (!list) {
        list = [];
        map.set(v, list);
      }
      list.push(i);
    }
    let ans = 0;
    for (const list of map.values()) {
      let lastCooked = -1;
      for (let i = 0; i < list.length; i++) {
        const idx = list[i];
        if (idx > lastCooked) {
          ans++;
          lastCooked = idx + k - 1;
        }
      }
    }
    console.log(ans);
  }
}

solve();
