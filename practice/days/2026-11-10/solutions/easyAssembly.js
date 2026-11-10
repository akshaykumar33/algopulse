const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokN = nextToken();
  if (!tokN) return;
  const n = parseInt(tokN, 10);

  const towers = [];
  const all = [];

  for (let i = 0; i < n; i++) {
    const k = parseInt(nextToken(), 10);
    const tower = [];
    for (let j = 0; j < k; j++) {
      const val = parseInt(nextToken(), 10);
      tower.push(val);
      all.push(val);
    }
    towers.push(tower);
  }

  all.sort((a, b) => a - b);
  const nextVal = new Map();
  for (let i = 0; i < all.length - 1; i++) {
    nextVal.set(all[i], all[i + 1]);
  }

  let splits = 0;
  for (let i = 0; i < n; i++) {
    const tower = towers[i];
    for (let j = 0; j < tower.length - 1; j++) {
      if (nextVal.get(tower[j]) !== tower[j + 1]) {
        splits++;
      }
    }
  }

  const combines = n + splits - 1;
  console.log(splits + ' ' + combines);
}

solve();
