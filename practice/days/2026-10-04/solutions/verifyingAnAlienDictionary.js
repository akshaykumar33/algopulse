var isAlienSorted = function(words, order) {
    const map = new Map();
    for (let i = 0; i < order.length; i++) {
        map.set(order[i], i);
    }
    
    for (let i = 0; i < words.length - 1; i++) {
        const w1 = words[i];
        const w2 = words[i + 1];
        
        let sorted = false;
        const len = Math.max(w1.length, w2.length);
        for (let j = 0; j < len; j++) {
            const c1 = w1[j];
            const c2 = w2[j];
            if (c1 !== c2) {
                const p1 = c1 ? map.get(c1) : -1;
                const p2 = c2 ? map.get(c2) : -1;
                if (p1 > p2) return false;
                sorted = true;
                break;
            }
        }
        if (!sorted && w1.length > w2.length) return false;
    }
    return true;
};

var solve = function(words, order) {
    return isAlienSorted(words, order);
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const words = JSON.parse(lines[i]);
          const order = JSON.parse(lines[i+1]);
          const result = solve(words, order);
          console.log(JSON.stringify(result));
        } catch (e) {}
      }
    }
  } catch (err) {}
}
module.exports = solve;
