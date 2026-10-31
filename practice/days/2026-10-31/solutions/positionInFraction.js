const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const [aStr, bStr, cStr] = input.split(/\s+/);
  let a = parseInt(aStr, 10);
  const b = parseInt(bStr, 10);
  const c = parseInt(cStr, 10);

  const vis = new Uint8Array(b + 1);

  let pos = 1;
  while (true) {
    a *= 10;
    const d = Math.floor(a / b);
    if (d === c) {
      console.log(pos);
      return;
    }
    a %= b;
    if (vis[a]) {
      console.log(-1);
      return;
    }
    vis[a] = 1;
    pos++;
  }
}

solve();
