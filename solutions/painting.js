const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = BigInt(input[ptr++]);
  const m = BigInt(input[ptr++]);
  const h = parseInt(input[ptr++], 10);
  const need = n * m;
  const colors = [];
  let totalAvail = 0n;
  for (let i = 0; i < h; i++) {
    const a = BigInt(input[ptr++]);
    const b = BigInt(input[ptr++]);
    colors.push({ a, b });
    totalAvail += a;
  }
  if (totalAvail < need) {
    console.log('Impossible');
    return;
  }
  colors.sort((x, y) => (x.b < y.b ? -1 : x.b > y.b ? 1 : 0));
  let cost = 0n;
  let rem = need;
  for (let i = 0; i < h && rem > 0n; i++) {
    const take = colors[i].a < rem ? colors[i].a : rem;
    cost += take * colors[i].b;
    rem -= take;
  }
  console.log(cost.toString());
}
solve();