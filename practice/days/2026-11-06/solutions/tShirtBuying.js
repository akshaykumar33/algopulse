const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
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

  const p = new Int32Array(n);
  for (let i = 0; i < n; i++) p[i] = nextInt();
  const a = new Int32Array(n);
  for (let i = 0; i < n; i++) a[i] = nextInt();
  const b = new Int32Array(n);
  for (let i = 0; i < n; i++) b[i] = nextInt();

  const list = [[], [], [], []];
  for (let i = 0; i < n; i++) {
    const c1 = a[i];
    const c2 = b[i];
    list[c1].push(i);
    if (c2 !== c1) {
      list[c2].push(i);
    }
  }

  for (let c = 1; c <= 3; c++) {
    list[c].sort((x, y) => p[x] - p[y]);
  }

  const ptr = [0, 0, 0, 0];
  const used = new Uint8Array(n);

  const m = nextInt();
  const out = [];

  for (let j = 0; j < m; j++) {
    const c = nextInt();
    while (ptr[c] < list[c].length && used[list[c][ptr[c]]]) {
      ptr[c]++;
    }

    if (ptr[c] >= list[c].length) {
      out.push(-1);
    } else {
      const idx = list[c][ptr[c]];
      used[idx] = 1;
      ptr[c]++;
      out.push(p[idx]);
    }
  }

  console.log(out.join(' '));
}

solve();

