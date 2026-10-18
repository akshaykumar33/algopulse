const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextBigInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1n;
    if (input.charCodeAt(pos) === 45) {
      sign = -1n;
      pos++;
    }
    let res = 0n;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10n + BigInt(input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextBigInt();
  if (t === null) return;

  const out = [];
  for (let tc = 0n; tc < t; tc++) {
    const hc = nextBigInt();
    const dc = nextBigInt();
    const hm = nextBigInt();
    const dm = nextBigInt();
    const k = nextBigInt();
    const w = nextBigInt();
    const a = nextBigInt();
    if (hc === null) break;

    let win = false;
    const kNum = Number(k);
    for (let j = 0; j <= kNum; j++) {
      const jBig = BigInt(j);
      const iBig = k - jBig;
      const curH = hc + iBig * a;
      const curD = dc + jBig * w;

      const turnsM = (hm + curD - 1n) / curD;
      const turnsC = (curH + dm - 1n) / dm;

      if (turnsM <= turnsC) {
        win = true;
        break;
      }
    }

    out.push(win ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
