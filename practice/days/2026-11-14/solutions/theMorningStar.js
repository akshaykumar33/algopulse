const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;
  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let sign = 1;
    if (input.charCodeAt(pos) === 45) { sign = -1; pos++; }
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) >= 48 && input.charCodeAt(pos) <= 57) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res * sign;
  }

  const t = nextInt();
  if (t === null) return;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = nextInt();
    const mapX = new Map();
    const mapY = new Map();
    const mapD1 = new Map();
    const mapD2 = new Map();

    for (let i = 0; i < n; i++) {
      const x = nextInt();
      const y = nextInt();
      mapX.set(x, (mapX.get(x) || 0) + 1);
      mapY.set(y, (mapY.get(y) || 0) + 1);
      const d1 = x - y;
      mapD1.set(d1, (mapD1.get(d1) || 0) + 1);
      const d2 = x + y;
      mapD2.set(d2, (mapD2.get(d2) || 0) + 1);
    }

    let pairs = 0n;
    function addPairs(map) {
      for (const cnt of map.values()) {
        if (cnt > 1) {
          const c = BigInt(cnt);
          pairs += c * (c - 1n);
        }
      }
    }

    addPairs(mapX);
    addPairs(mapY);
    addPairs(mapD1);
    addPairs(mapD2);

    out.push(pairs.toString());
  }
  console.log(out.join('\n'));
}

solve();
