const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextToken() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) {
      pos++;
    }
    if (pos >= input.length) return null;
    const start = pos;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      pos++;
    }
    return input.slice(start, pos);
  }

  const tokN = nextToken();
  if (!tokN) return;
  const n = parseInt(tokN, 10);
  const m = parseInt(nextToken(), 10);
  const k = parseInt(nextToken(), 10);

  const a = new BigInt64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = BigInt(nextToken());
  }

  const l = new Int32Array(m + 1);
  const r = new Int32Array(m + 1);
  const d = new BigInt64Array(m + 1);
  for (let i = 1; i <= m; i++) {
    l[i] = parseInt(nextToken(), 10);
    r[i] = parseInt(nextToken(), 10);
    d[i] = BigInt(nextToken());
  }

  const opDiff = new BigInt64Array(m + 2);
  for (let i = 0; i < k; i++) {
    const x = parseInt(nextToken(), 10);
    const y = parseInt(nextToken(), 10);
    opDiff[x]++;
    opDiff[y + 1]--;
  }

  const arrDiff = new BigInt64Array(n + 2);
  let curOps = 0n;
  for (let i = 1; i <= m; i++) {
    curOps += opDiff[i];
    const totalAdd = curOps * d[i];
    arrDiff[l[i]] += totalAdd;
    arrDiff[r[i] + 1] -= totalAdd;
  }

  const out = [];
  let curAdd = 0n;
  for (let i = 1; i <= n; i++) {
    curAdd += arrDiff[i];
    out.push((a[i] + curAdd).toString());
  }

  console.log(out.join(' '));
}

solve();
