const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0n;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10n + BigInt(input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const t = nextBigInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0n; tc < t; tc++) {
    let n = nextBigInt();
    let ans = 0n;
    let myTurn = true;

    while (n > 0n) {
      let take = 1n;
      if (n % 2n === 0n) {
        if (n === 4n || (n / 2n) % 2n !== 0n) {
          take = n / 2n;
        } else {
          take = 1n;
        }
      }

      if (myTurn) {
        ans += take;
      }
      n -= take;
      myTurn = !myTurn;
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();

