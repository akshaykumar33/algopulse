const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = BigInt(input[1]);

  const fact = new Array(n + 1);
  fact[0] = 1n;
  for (let i = 1; i <= n; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % m;
  }

  let total = 0n;
  for (let len = 1; len <= n; len++) {
    const count = BigInt(n - len + 1);
    const ways = (count * count) % m;
    const perms = (fact[len] * fact[n - len]) % m;
    const term = (ways * perms) % m;
    total = (total + term) % m;
  }

  console.log(total.toString());
}

solve();
