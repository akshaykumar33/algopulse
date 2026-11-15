const fs = require('fs');

function countValid(x) {
  if (x < 10n) return x;
  const s = x.toString();
  const first = BigInt(s[0]);
  const last = BigInt(s[s.length - 1]);
  let ans = 9n + x / 10n - 1n;
  if (last >= first) ans += 1n;
  return ans;
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const l = BigInt(input[0]);
  const r = BigInt(input[1]);
  const ans = countValid(r) - countValid(l - 1n);
  console.log(ans.toString());
}

solve();
