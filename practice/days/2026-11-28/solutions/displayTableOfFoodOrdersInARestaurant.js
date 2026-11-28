var displayTable = function(orders) {
  const foods = new Set();
  const tables = new Map();
  for (const [, t, f] of orders) {
    foods.add(f);
    const num = +t;
    if (!tables.has(num)) tables.set(num, new Map());
    const mp = tables.get(num);
    mp.set(f, (mp.get(f) || 0) + 1);
  }
  const fs = [...foods].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const ans = [['Table', ...fs]];
  const ts = [...tables.keys()].sort((a, b) => a - b);
  for (const t of ts) {
    const mp = tables.get(t);
    ans.push([String(t), ...fs.map(f => String(mp.get(f) || 0))]);
  }
  return ans;
};
var solve = displayTable;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = displayTable;
