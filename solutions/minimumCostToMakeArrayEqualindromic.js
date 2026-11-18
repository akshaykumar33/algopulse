var minimumCost = function(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const med = nums[Math.floor(n / 2)];

  const s = String(med);
  const L = s.length;
  const H = Math.ceil(L / 2);
  const P = parseInt(s.slice(0, H), 10);
  const cands = [Math.pow(10, L - 1) - 1, Math.pow(10, L) + 1];

  for (let d = -1; d <= 1; d++) {
    const P2 = String(P + d);
    if (P2[0] === '-' || P2 === '0') continue;
    let pal;
    if (L % 2 === 0) {
      pal = P2 + P2.split('').reverse().join('');
    } else {
      pal = P2 + P2.slice(0, -1).split('').reverse().join('');
    }
    cands.push(parseInt(pal, 10));
  }

  let minAns = Infinity;
  for (let i = 0; i < cands.length; i++) {
    const p = cands[i];
    if (p <= 0) continue;
    let cost = 0;
    for (let j = 0; j < n; j++) {
      cost += Math.abs(nums[j] - p);
    }
    if (cost < minAns) minAns = cost;
  }
  return minAns;
};

var solve = minimumCost;

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

module.exports = minimumCost;
