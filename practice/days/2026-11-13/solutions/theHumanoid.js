const fs = require('fs');

function solve() {
  const buf = fs.readFileSync(0);
  let pos = 0;
  function nextInt() {
    while (pos < buf.length && buf[pos] <= 32) pos++;
    if (pos >= buf.length) return null;
    let res = 0;
    while (pos < buf.length && buf[pos] >= 48 && buf[pos] <= 57) {
      res = res * 10 + (buf[pos] - 48);
      pos++;
    }
    return res;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  const orders = [
    [2, 2, 3],
    [2, 3, 2],
    [3, 2, 2]
  ];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const h = nextInt();
    const a = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = nextInt();
    }
    a.sort();

    let maxAbsorbed = 0;
    for (let ord = 0; ord < 3; ord++) {
      const serums = orders[ord];
      let curH = BigInt(h);
      let sIdx = 0;
      let absorbed = 0;
      let i = 0;
      while (i < n) {
        if (curH > BigInt(a[i])) {
          curH += BigInt(Math.floor(a[i] / 2));
          absorbed++;
          i++;
        } else if (sIdx < 3) {
          curH *= BigInt(serums[sIdx++]);
        } else {
          break;
        }
      }
      if (absorbed > maxAbsorbed) {
        maxAbsorbed = absorbed;
      }
    }

    out.push(maxAbsorbed);
  }

  console.log(out.join('\n'));
}

solve();
