const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
  const count = new Int32Array(10);
  for (let i = 0; i < s.length; i++) count[s.charCodeAt(i) - 48]++;
  count[1]--; count[6]--; count[8]--; count[9]--;
  const remPerms = {
    0: '1869',
    1: '1968',
    2: '1689',
    3: '6198',
    4: '1698',
    5: '1986',
    6: '1896'
  };
  let cur = 0;
  let res = '';
  for (let d = 1; d <= 9; d++) {
    while (count[d] > 0) {
      res += d;
      cur = (cur * 10 + d) % 7;
      count[d]--;
    }
  }
  cur = (cur * 10000) % 7;
  const needed = (7 - cur) % 7;
  res += remPerms[needed];
  while (count[0] > 0) {
    res += '0';
    count[0]--;
  }
  console.log(res);
}
