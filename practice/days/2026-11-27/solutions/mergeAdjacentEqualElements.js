var mergeAdjacent = function(nums) {
  const stack = [];
  for (const x of nums) {
    let cur = x;
    while (stack.length > 0 && stack[stack.length - 1] === cur) {
      stack.pop();
      cur *= 2;
    }
    stack.push(cur);
  }
  return stack;
};
var solve = mergeAdjacent;
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
module.exports = mergeAdjacent;
