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

  function getDigitSum(val) {
    let s = 0;
    while (val > 0) {
      s += val % 10;
      val = Math.floor(val / 10);
    }
    return s;
  }

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const q = nextInt();

    const a = new Int32Array(n + 1);
    const parent = new Int32Array(n + 2);
    for (let i = 1; i <= n + 1; i++) {
      parent[i] = i;
    }

    for (let i = 1; i <= n; i++) {
      a[i] = nextInt();
      if (a[i] <= 9) {
        parent[i] = i + 1;
      }
    }

    function find(i) {
      let root = i;
      while (root !== parent[root]) {
        root = parent[root];
      }
      let curr = i;
      while (curr !== root) {
        const nxt = parent[curr];
        parent[curr] = root;
        curr = nxt;
      }
      return root;
    }

    for (let qi = 0; qi < q; qi++) {
      const type = nextInt();
      if (type === 1) {
        const l = nextInt();
        const r = nextInt();
        let curr = find(l);
        while (curr <= r) {
          a[curr] = getDigitSum(a[curr]);
          if (a[curr] <= 9) {
            parent[curr] = find(curr + 1);
          }
          curr = find(curr + 1);
        }
      } else {
        const x = nextInt();
        out.push(a[x]);
      }
    }
  }

  console.log(out.join('\n'));
}

solve();
