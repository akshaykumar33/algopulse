var carFleet = function(target, position, speed) {
    let n = position.length;
    if (n === 0) return 0;
    let cars = [];
    for (let i = 0; i < n; i++) {
        cars.push({ pos: position[i], time: (target - position[i]) / speed[i] });
    }
    cars.sort((a, b) => b.pos - a.pos);
    let ans = 0;
    let maxTime = 0;
    for (let i = 0; i < n; i++) {
        if (cars[i].time > maxTime) {
            maxTime = cars[i].time;
            ans++;
        }
    }
    return ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const target = JSON.parse(lines[i]);
        const position = JSON.parse(lines[i+1]);
        const speed = JSON.parse(lines[i+2]);
        i += 2;
        const result = carFleet(target, position, speed);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = carFleet;
