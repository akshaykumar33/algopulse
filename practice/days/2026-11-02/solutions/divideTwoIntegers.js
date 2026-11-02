var divide = function(dividend, divisor) {
    const MAX = 2147483647;
    const MIN = -2147483648;
    if (dividend === MIN && divisor === -1) return MAX;
    if (dividend === MIN && divisor === 1) return MIN;
    
    let negative = (dividend < 0) ^ (divisor < 0);
    let a = Math.abs(dividend);
    let b = Math.abs(divisor);
    let ans = 0;
    
    while (a >= b) {
        let temp = b, multiple = 1;
        while (a >= (temp << 1) && (temp << 1) > 0) {
            temp <<= 1;
            multiple <<= 1;
        }
        a -= temp;
        ans += multiple;
    }
    
    return negative ? -ans : ans;
};

var solve = typeof divide !== 'undefined' ? divide : null;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      const parsed = JSON.parse(line);
      console.log(JSON.stringify(divide(...parsed)));
    }
  }
}

