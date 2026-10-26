var maxSatisfied = function(customers, grumpy, minutes) {
    let base = 0;
    let n = customers.length;
    for (let i = 0; i < n; i++) {
        if (grumpy[i] === 0) {
            base += customers[i];
        }
    }
    let cur = 0;
    for (let i = 0; i < minutes; i++) {
        if (grumpy[i] === 1) {
            cur += customers[i];
        }
    }
    let maxAdd = cur;
    for (let i = minutes; i < n; i++) {
        if (grumpy[i] === 1) {
            cur += customers[i];
        }
        if (grumpy[i - minutes] === 1) {
            cur -= customers[i - minutes];
        }
        if (cur > maxAdd) {
            maxAdd = cur;
        }
    }
    return base + maxAdd;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let args = [];
      for (const line of lines) {
        try {
          args.push(JSON.parse(line));
        } catch {
          args.push(line);
        }
      }
      if (args.length >= 3) {
        console.log(JSON.stringify(maxSatisfied(args[0], args[1], args[2])));
      } else if (args.length === 1 && Array.isArray(args[0])) {
        console.log(JSON.stringify(maxSatisfied(...args[0])));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = maxSatisfied;
