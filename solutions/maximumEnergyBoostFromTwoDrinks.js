var maxEnergyBoost = function(energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;
  if (n === 1) return Math.max(energyDrinkA[0], energyDrinkB[0]);

  let prevA = energyDrinkA[0];
  let prevB = energyDrinkB[0];
  let currA = prevA + energyDrinkA[1];
  let currB = prevB + energyDrinkB[1];

  for (let i = 2; i < n; i++) {
    const nextA = energyDrinkA[i] + Math.max(currA, prevB);
    const nextB = energyDrinkB[i] + Math.max(currB, prevA);
    prevA = currA;
    currA = nextA;
    prevB = currB;
    currB = nextB;
  }

  return Math.max(currA, currB);
};

var solve = maxEnergyBoost;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = maxEnergyBoost;
