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

  const f = new Int32Array(n + 1);
  const inDegree = new Uint8Array(n + 1);

  for (let i = 1; i <= n; i++) {
    f[i] = nextInt();
    if (f[i] !== 0) {
      inDegree[f[i]] = 1;
    }
  }

  const give = [];
  const recv = [];
  for (let i = 1; i <= n; i++) {
    if (f[i] === 0) give.push(i);
    if (!inDegree[i]) recv.push(i);
  }

  const inGive = new Uint8Array(n + 1);
  const inRecv = new Uint8Array(n + 1);
  for (let i = 0; i < give.length; i++) inGive[give[i]] = 1;
  for (let i = 0; i < recv.length; i++) inRecv[recv[i]] = 1;

  const both = [];
  const onlyGive = [];
  const onlyRecv = [];

  for (let i = 0; i < give.length; i++) {
    const v = give[i];
    if (inRecv[v]) both.push(v);
    else onlyGive.push(v);
  }

  for (let i = 0; i < recv.length; i++) {
    const v = recv[i];
    if (!inGive[v]) onlyRecv.push(v);
  }

  if (both.length === 1) {
    const x = both[0];
    const y = onlyGive.pop();
    const z = onlyRecv.pop();
    f[x] = z;
    f[y] = x;
  } else if (both.length > 1) {
    for (let i = 0; i < both.length; i++) {
      f[both[i]] = both[(i + 1) % both.length];
    }
  }

  for (let i = 0; i < onlyGive.length; i++) {
    f[onlyGive[i]] = onlyRecv[i];
  }

  const res = [];
  for (let i = 1; i <= n; i++) {
    res.push(f[i]);
  }
  console.log(res.join(' '));
}

solve();

