var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
  function getMaxConsec(arr) {
    arr.sort((a, b) => a - b);
    let maxC = 1;
    let cur = 1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] === arr[i - 1] + 1) {
        cur++;
        if (cur > maxC) maxC = cur;
      } else {
        cur = 1;
      }
    }
    return maxC;
  }

  const side = Math.min(getMaxConsec(hBars) + 1, getMaxConsec(vBars) + 1);
  return side * side;
};

var solve = maximizeSquareHoleArea;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maximizeSquareHoleArea;
