const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const n = parseInt(input, 10);
  const out = [];
  function rec(curN, step) {
    if (curN === 1) { out.push(step); return; }
    if (curN === 2) { out.push(step); out.push(2 * step); return; }
    if (curN === 3) { out.push(step); out.push(step); out.push(3 * step); return; }
    const odds = Math.ceil(curN / 2);
    for (let i = 0; i < odds; i++) out.push(step);
    rec(Math.floor(curN / 2), 2 * step);
  }
  rec(n, 1);
  console.log(out.join(' '));
}
solve();