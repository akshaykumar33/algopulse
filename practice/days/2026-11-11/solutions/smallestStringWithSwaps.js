var smallestStringWithSwaps = function(s, pairs) {
  const n = s.length;
  const parent = new Int32Array(n);
  const size = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    parent[i] = i;
    size[i] = 1;
  }
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (let i = 0; i < pairs.length; i++) {
    let ra = find(pairs[i][0]);
    let rb = find(pairs[i][1]);
    if (ra !== rb) {
      if (size[ra] < size[rb]) {
        const tmp = ra;
        ra = rb;
        rb = tmp;
      }
      parent[rb] = ra;
      size[ra] += size[rb];
    }
  }
  const head = new Int32Array(n).fill(-1);
  const next = new Int32Array(n).fill(-1);
  for (let i = n - 1; i >= 0; i--) {
    const r = find(i);
    next[i] = head[r];
    head[r] = i;
  }
  const res = new Array(n);
  const cnt = new Int32Array(26);
  for (let r = 0; r < n; r++) {
    if (parent[r] !== r) continue;
    if (size[r] === 1) {
      res[r] = s[r];
      continue;
    }
    for (let cur = head[r]; cur !== -1; cur = next[cur]) {
      cnt[s.charCodeAt(cur) - 97]++;
    }
    let c = 0;
    for (let cur = head[r]; cur !== -1; cur = next[cur]) {
      while (cnt[c] === 0) c++;
      cnt[c]--;
      res[cur] = String.fromCharCode(97 + c);
    }
  }
  return res.join('');
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed = lines.map((l) => JSON.parse(l));
    if (parsed.length === smallestStringWithSwaps.length && !(Array.isArray(parsed[0]) && parsed[0].length === smallestStringWithSwaps.length && parsed.every((p) => Array.isArray(p) && p.length === smallestStringWithSwaps.length))) {
      console.log(JSON.stringify(smallestStringWithSwaps(...parsed)));
    } else {
      for (const p of parsed) {
        console.log(JSON.stringify(smallestStringWithSwaps(...p)));
      }
    }
  }
}

module.exports = smallestStringWithSwaps;
