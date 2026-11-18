var maxBottlesDrunk = function(numBottles, numExchange) {
  let drank = 0;
  let empty = 0;

  while (numBottles > 0) {
    drank += numBottles;
    empty += numBottles;
    numBottles = 0;
    while (empty >= numExchange) {
      empty -= numExchange;
      numBottles++;
      numExchange++;
    }
  }

  return drank;
};

var solve = maxBottlesDrunk;

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

module.exports = maxBottlesDrunk;
