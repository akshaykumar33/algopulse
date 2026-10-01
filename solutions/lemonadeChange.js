/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let five = 0;
    let ten = 0;
    
    for (let bill of bills) {
        if (bill === 5) {
            five++;
        } else if (bill === 10) {
            if (five > 0) {
                five--;
                ten++;
            } else {
                return false;
            }
        } else {
            // bill === 20
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
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
          const result = Array.isArray(parsed) && lemonadeChange.length > 1 ? lemonadeChange(...parsed) : lemonadeChange(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(lemonadeChange(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = lemonadeChange;
