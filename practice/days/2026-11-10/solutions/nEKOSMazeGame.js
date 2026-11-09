const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const q = nextInt();

  const grid = [new Uint8Array(n + 2), new Uint8Array(n + 2), new Uint8Array(n + 2)];
  let blockedPairs = 0;
  const out = [];

  for (let i = 0; i < q; i++) {
    const r = nextInt();
    const c = nextInt();
    const opp = 3 - r;

    const delta = grid[r][c] === 1 ? -1 : 1;
    if (grid[opp][c - 1]) blockedPairs += delta;
    if (grid[opp][c]) blockedPairs += delta;
    if (grid[opp][c + 1]) blockedPairs += delta;

    grid[r][c] ^= 1;

    out.push(blockedPairs === 0 ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
