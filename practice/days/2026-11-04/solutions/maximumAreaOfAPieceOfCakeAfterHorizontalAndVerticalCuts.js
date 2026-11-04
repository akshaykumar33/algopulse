var maxArea = function(h, w, horizontalCuts, verticalCuts) {
  horizontalCuts.sort((a, b) => a - b);
  verticalCuts.sort((a, b) => a - b);

  let maxH = horizontalCuts[0];
  for (let i = 1; i < horizontalCuts.length; i++) {
    const diff = horizontalCuts[i] - horizontalCuts[i - 1];
    if (diff > maxH) maxH = diff;
  }
  const endH = h - horizontalCuts[horizontalCuts.length - 1];
  if (endH > maxH) maxH = endH;

  let maxW = verticalCuts[0];
  for (let i = 1; i < verticalCuts.length; i++) {
    const diff = verticalCuts[i] - verticalCuts[i - 1];
    if (diff > maxW) maxW = diff;
  }
  const endW = w - verticalCuts[verticalCuts.length - 1];
  if (endW > maxW) maxW = endW;

  const MOD = 1000000007n;
  const ans = (BigInt(maxH) * BigInt(maxW)) % MOD;
  return Number(ans);
};

var maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts = maxArea;
var solve = typeof maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts !== 'undefined' ? maximumAreaOfAPieceOfCakeAfterHorizontalAndVerticalCuts : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

