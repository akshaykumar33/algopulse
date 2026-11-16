var asteroidsDestroyed = function(mass, asteroids) {
  asteroids.sort((a, b) => a - b);
  let cur = BigInt(mass);
  for (let i = 0; i < asteroids.length; i++) {
    const ast = BigInt(asteroids[i]);
    if (cur < ast) return false;
    cur += ast;
  }
  return true;
};

var solve = asteroidsDestroyed;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(...parsed)));
    }
  } catch (e) {}
}
