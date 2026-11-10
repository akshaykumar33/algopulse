const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  let a = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);

  const vis = new Uint8Array(m);
  while (a % m !== 0) {
    const rem = a % m;
    if (vis[rem]) {
      console.log('No');
      return;
    }
    vis[rem] = 1;
    a = (a + rem) % m;
  }

  console.log('Yes');
}

solve();

