const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const p = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    p[i] = Number(input[i]);
  }

  const visited = new Uint8Array(n + 1);
  const cycleLens = [];

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      let len = 0;
      let cur = i;
      while (!visited[cur]) {
        visited[cur] = 1;
        cur = p[cur];
        len++;
      }
      cycleLens.push(len);
    }
  }

  cycleLens.sort((a, b) => b - a);

  let ans = 0n;
  if (cycleLens.length === 1) {
    const l = BigInt(cycleLens[0]);
    ans = l * l;
  } else {
    const merged = BigInt(cycleLens[0] + cycleLens[1]);
    ans += merged * merged;
    for (let i = 2; i < cycleLens.length; i++) {
      const l = BigInt(cycleLens[i]);
      ans += l * l;
    }
  }

  console.log(ans.toString());
}

solve();
