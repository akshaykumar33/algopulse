const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const c = new Float64Array(n);
  for (let i = 0; i < n; i++) c[i] = Number(tokens[ptr++]);
  const s0 = new Array(n);
  const s1 = new Array(n);
  for (let i = 0; i < n; i++) {
    s0[i] = tokens[ptr++];
    s1[i] = s0[i].split('').reverse().join('');
  }
  const INF = 1e18;
  let dp0 = 0, dp1 = c[0];
  for (let i = 1; i < n; i++) {
    let next0 = INF, next1 = INF;
    if (s0[i] >= s0[i - 1]) next0 = Math.min(next0, dp0);
    if (s0[i] >= s1[i - 1]) next0 = Math.min(next0, dp1);
    if (s1[i] >= s0[i - 1]) next1 = Math.min(next1, dp0 + c[i]);
    if (s1[i] >= s1[i - 1]) next1 = Math.min(next1, dp1 + c[i]);
    dp0 = next0;
    dp1 = next1;
  }
  const ans = Math.min(dp0, dp1);
  console.log(ans >= INF / 2 ? -1 : Math.round(ans));
}
