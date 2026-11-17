const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const nm = n * m;

    const people = [];
    for (let i = 0; i < nm; i++) {
      people.push({ sight: parseInt(tokens[ptr++], 10), id: i });
    }

    people.sort((x, y) => {
      if (x.sight !== y.sight) return x.sight - y.sight;
      return x.id - y.id;
    });

    let i = 0;
    while (i < nm) {
      let j = i;
      while (j < nm && people[j].sight === people[i].sight) j++;
      let start = i;
      while (start < j) {
        const r = Math.floor(start / m);
        const end = Math.min(j - 1, (r + 1) * m - 1);
        const sub = people.slice(start, end + 1);
        sub.sort((x, y) => y.id - x.id);
        for (let k = 0; k < sub.length; k++) {
          people[start + k] = sub[k];
        }
        start = end + 1;
      }
      i = j;
    }

    let ans = 0;
    for (let r = 0; r < n; r++) {
      const offset = r * m;
      for (let c1 = 0; c1 < m; c1++) {
        for (let c2 = 0; c2 < c1; c2++) {
          if (people[offset + c2].id < people[offset + c1].id) {
            ans++;
          }
        }
      }
    }

    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
