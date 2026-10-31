var numberOfBoomerangs = function(points) {
    let ans = 0;
    for (let i = 0; i < points.length; i++) {
        const map = new Map();
        for (let j = 0; j < points.length; j++) {
            if (i === j) continue;
            const dx = points[i][0] - points[j][0];
            const dy = points[i][1] - points[j][1];
            const d = dx * dx + dy * dy;
            map.set(d, (map.get(d) || 0) + 1);
        }
        for (const [k, v] of map) {
            ans += v * (v - 1);
        }
    }
    return ans;
};
var solve = numberOfBoomerangs;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const parsed = JSON.parse(raw);
            const result = solve(parsed);
            console.log(JSON.stringify(result));
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
