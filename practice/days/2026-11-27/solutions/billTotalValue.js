const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
  let totalCents = 0;
  const re = /(?:[0-9]{1,3}(?:\.[0-9]{3})*(?:\.[0-9]{2})?)/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const numStr = m[0];
    const parts = numStr.split('.');
    if (parts.length > 1 && parts[parts.length - 1].length === 2) {
      const cents = parseInt(parts[parts.length - 1], 10);
      const dollars = parseInt(parts.slice(0, parts.length - 1).join(''), 10);
      totalCents += dollars * 100 + cents;
    } else {
      const dollars = parseInt(parts.join(''), 10);
      totalCents += dollars * 100;
    }
  }
  const dollars = Math.floor(totalCents / 100);
  const cents = totalCents % 100;
  const dStr = dollars.toString();
  const groups = [];
  for (let i = dStr.length; i > 0; i -= 3) {
    groups.unshift(dStr.slice(Math.max(0, i - 3), i));
  }
  let res = groups.join('.');
  if (cents > 0) {
    res += '.' + (cents < 10 ? '0' : '') + cents;
  }
  console.log(res);
}
