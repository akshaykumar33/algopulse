const data = require('fs').readFileSync(0, 'utf-8');
let pos = 0;
const next = () => {
  while (data.charCodeAt(pos) <= 32) pos++;
  let s = pos;
  while (pos < data.length && data.charCodeAt(pos) > 32) pos++;
  return +data.slice(s, pos);
};
const t = next();
const output = [];
for (let tc = 0; tc < t; tc++) {
  const n = next(), k = next();
  const arr = new Array(n);
  for (let i = 0; i < n; i++) arr[i] = next();
  arr.sort((a, b) => b - a);
  let c = 0;
  while (c < n && arr[c] === arr[0]) c++;
  if (k < c) {
    output.push('NO');
    continue;
  }
  const cnt = k - c;
  const res = [];
  for (let i = c + cnt - 1; i >= c; i--) res.push(arr[i]);
  for (let i = 0; i < c; i++) res.push(arr[i]);
  for (let i = c + cnt; i < n; i++) res.push(arr[i]);
  output.push('YES');
  output.push(res.join(' '));
}
console.log(output.join('\n'));
