const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const t = Number(input[ptr++]);
  const mod = 1000000007n;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const arr = [BigInt(input[ptr++]), BigInt(input[ptr++]), BigInt(input[ptr++])];
    arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    if (arr[0] <= 0n || arr[1] <= 1n || arr[2] <= 2n) {
      out.push('0');
    } else {
      const c1 = arr[0] % mod;
      const c2 = (arr[1] - 1n) % mod;
      const c3 = (arr[2] - 2n) % mod;
      const ans = (((c1 * c2) % mod) * c3) % mod;
      out.push(ans.toString());
    }
  }
  console.log(out.join('\n'));
}

function main() {}

solve();
