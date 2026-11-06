const data = require('fs').readFileSync(0, 'utf-8');
let pos = 0;
const next = () => {
  while (data.charCodeAt(pos) <= 32) pos++;
  let s = pos;
  while (pos < data.length && data.charCodeAt(pos) > 32) pos++;
  return +data.slice(s, pos);
};
const gcd = (x, y) => {
  while (y) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
};
const t = next();
const output = [];
for (let tc = 0; tc < t; tc++) {
  const a = next(), b = next();
  if (a === b) {
    output.push('0');
    continue;
  }
  if (gcd(a, b) === 1) {
    output.push('1');
    output.push(String(b - a));
    continue;
  }
  let c = -1;
  for (let v = a + 1; v < b; v++) {
    if (gcd(v, a) === 1 && gcd(v, b) === 1) {
      c = v;
      break;
    }
  }
  if (c !== -1) {
    output.push('2');
    output.push(`${c - a} ${b - c}`);
    continue;
  }
  const L = b - a;
  const par = new Int32Array(L + 1).fill(-1);
  const q = new Int32Array(L + 1);
  let head = 0, tail = 0;
  q[tail++] = 0;
  par[0] = 0;
  while (head < tail && par[L] === -1) {
    const u = q[head++];
    const cu = a + u;
    for (let v = u + 1; v <= L; v++) {
      if (par[v] === -1 && gcd(cu, a + v) === 1) {
        par[v] = u;
        q[tail++] = v;
      }
    }
  }
  const path = [];
  for (let v = L; v !== 0; v = par[v]) path.push(v - par[v]);
  path.reverse();
  output.push(String(path.length));
  output.push(path.join(' '));
}
console.log(output.join('\n'));
