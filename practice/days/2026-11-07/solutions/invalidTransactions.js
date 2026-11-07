var invalidTransactions = function(transactions) {
    const parsedTransactions = [];
    for (const t of transactions) {
        const [name, timeStr, amountStr, city] = t.split(',');
        parsedTransactions.push({
            name,
            time: parseInt(timeStr),
            amount: parseInt(amountStr),
            city,
            original: t,
            invalid: false
        });
    }

    const n = parsedTransactions.length;

    for (let i = 0; i < n; i++) {
        if (parsedTransactions[i].amount > 1000) {
            parsedTransactions[i].invalid = true;
        }

        for (let j = i + 1; j < n; j++) {
            const t1 = parsedTransactions[i];
            const t2 = parsedTransactions[j];

            if (t1.name === t2.name &&
                Math.abs(t1.time - t2.time) <= 60 &&
                t1.city !== t2.city) {
                t1.invalid = true;
                t2.invalid = true;
            }
        }
    }

    const result = [];
    for (const t of parsedTransactions) {
        if (t.invalid) {
            result.push(t.original);
        }
    }

    return result;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const solve = typeof invalidTransactions !== 'undefined' ? invalidTransactions : null;
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          const solve = typeof invalidTransactions !== 'undefined' ? invalidTransactions : null;
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = typeof invalidTransactions !== 'undefined' ? invalidTransactions : null;
