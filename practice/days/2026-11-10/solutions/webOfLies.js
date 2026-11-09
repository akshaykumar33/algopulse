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
  const m = nextInt();

  const higher = new Int32Array(n + 1);
  let ans = n;

  for (let i = 0; i < m; i++) {
    let u = nextInt();
    let v = nextInt();
    if (u > v) {
      const tmp = u;
      u = v;
      v = tmp;
    }
    if (higher[u] === 0) ans--;
    higher[u]++;
  }

  const q = nextInt();
  const out = [];

  for (let i = 0; i < q; i++) {
    const type = nextInt();
    if (type === 1) {
      let u = nextInt();
      let v = nextInt();
      if (u > v) {
        const tmp = u;
        u = v;
        v = tmp;
      }
      if (higher[u] === 0) ans--;
      higher[u]++;
    } else if (type === 2) {
      let u = nextInt();
      let v = nextInt();
      if (u > v) {
        const tmp = u;
        u = v;
        v = tmp;
      }
      higher[u]--;
      if (higher[u] === 0) ans++;
    } else {
      out.push(ans);
    }
  }

  console.log(out.join('\n'));
}

solve();
