const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
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
  const apps = new Int32Array(n + 1);
  const appPos = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) {
    const id = nextInt();
    apps[i] = id;
    appPos[id] = i;
  }
  let totalEnergy = 0n;
  for (let i = 0; i < m; i++) {
    const id = nextInt();
    const p = appPos[id];
    totalEnergy += BigInt(Math.floor((p - 1) / k) + 1);
    if (p > 1) {
      const prevApp = apps[p - 1];
      apps[p] = prevApp;
      apps[p - 1] = id;
      appPos[id] = p - 1;
      appPos[prevApp] = p;
    }
  }
  console.log(totalEnergy.toString());
}

solve();
