const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;

  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) {
      pos++;
    }
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] > 32) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const n = nextInt();
  if (n === null) return;
  const m = nextInt();
  const k = nextInt();

  const grid = new Uint8Array(n * m);
  for (let i = 0; i < n * m; i++) {
    grid[i] = nextInt();
  }

  const chatCount = new Int32Array(m + 1);
  const userSent = new Int32Array(n + 1);

  for (let i = 0; i < k; i++) {
    const x = nextInt();
    const y = nextInt();
    userSent[x]++;
    chatCount[y]++;
  }

  const ans = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    const offset = i * m;
    for (let j = 0; j < m; j++) {
      if (grid[offset + j] === 1) {
        sum += chatCount[j + 1];
      }
    }
    ans[i] = sum - userSent[i + 1];
  }

  console.log(ans.join(' '));
}

solve();
