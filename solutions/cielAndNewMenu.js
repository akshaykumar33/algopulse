const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim();
  if (!input) return;

  const n = input.length;
  const prefNonZero = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    prefNonZero[i + 1] = prefNonZero[i] + (input[i] !== '0' ? 1 : 0);
  }

  let ans = 0n;

  for (let j = 0; j < n; j++) {
    const d0 = input.charCodeAt(j) - 48;
    if (d0 === 0 || d0 === 8) {
      ans++;
    }

    if (j >= 1) {
      const d1 = input.charCodeAt(j - 1) - 48;
      if (d1 !== 0 && (d1 * 10 + d0) % 8 === 0) {
        ans++;
      }
    }

    if (j >= 2) {
      const d2 = input.charCodeAt(j - 2) - 48;
      const d1 = input.charCodeAt(j - 1) - 48;
      if ((d2 * 100 + d1 * 10 + d0) % 8 === 0) {
        ans += BigInt(prefNonZero[j - 1]);
      }
    }
  }

  console.log(ans.toString());
}

solve();
