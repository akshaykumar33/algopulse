const fs = require('fs');

function isPal(h, m) {
  return Math.floor(h / 10) === m % 10 && h % 10 === Math.floor(m / 10);
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (input.length === 0 || input[0] === '') return;

  let idx = 0;
  const t = parseInt(input[idx++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = input[idx++];
    const x = parseInt(input[idx++], 10);

    const parts = s.split(':');
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);

    const start = h * 60 + m;
    let cur = start;
    let cnt = 0;
    const vis = new Uint8Array(1440);

    while (!vis[cur]) {
      vis[cur] = 1;
      const ch = Math.floor(cur / 60);
      const cm = cur % 60;
      if (isPal(ch, cm)) {
        cnt++;
      }
      cur = (cur + x) % 1440;
    }

    out.push(cnt);
  }

  console.log(out.join('\n'));
}

solve();
