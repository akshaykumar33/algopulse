const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  const len = buf.length;
  
  function nextBigInt() {
    while (pos < len && buf[pos] <= 32) pos++;
    if (pos >= len) return null;
    let start = pos;
    while (pos < len && buf[pos] > 32) pos++;
    return BigInt(buf.toString('utf8', start, pos));
  }
  
  const tBig = nextBigInt();
  if (tBig === null) return;
  const t = Number(tBig);
  const out = [];
  
  for (let i = 0; i < t; i++) {
    let n = nextBigInt();
    let ans = 0n;
    let turn = true;
    
    while (n > 9007199254740991n) {
      let take = 1n;
      if (n % 2n === 0n) {
        if (n === 4n || (n / 2n) % 2n !== 0n) {
          take = n / 2n;
        } else {
          take = 1n;
        }
      }
      if (turn) ans += take;
      n -= take;
      turn = !turn;
    }
    
    let num = Number(n);
    let ansNum = 0;
    while (num > 0) {
      let take = 1;
      if (num % 2 === 0) {
        const half = num / 2;
        if (num === 4 || half % 2 !== 0) {
          take = half;
        } else {
          take = 1;
        }
      }
      if (turn) ansNum += take;
      num -= take;
      turn = !turn;
    }
    
    out.push((ans + BigInt(ansNum)).toString());
  }
  
  console.log(out.join('\n'));
}

solve();
