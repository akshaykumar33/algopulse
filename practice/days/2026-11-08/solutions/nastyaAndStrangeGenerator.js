const fs = require('fs');

function solve() {
  const buffer = fs.readFileSync(0);
  let offset = 0;

  function nextInt() {
    while (offset < buffer.length && buffer[offset] <= 32) {
      offset++;
    }
    if (offset >= buffer.length) return null;
    let num = 0;
    while (offset < buffer.length && buffer[offset] > 32) {
      num = num * 10 + (buffer[offset] - 48);
      offset++;
    }
    return num;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const pos = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
      const val = nextInt();
      pos[val] = i;
    }

    const visited = new Uint8Array(n);
    let ok = true;

    for (let v = 1; v <= n; v++) {
      const p = pos[v];
      visited[p] = 1;
      if (p + 1 < n && visited[p + 1] === 0) {
        if (pos[v + 1] !== p + 1) {
          ok = false;
          break;
        }
      }
    }

    out.push(ok ? 'Yes' : 'No');
  }

  console.log(out.join('\n'));
}

solve();
