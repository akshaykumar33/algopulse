const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  let pos = 0;

  function nextInt() {
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return null;
    let res = 0;
    while (pos < input.length && input.charCodeAt(pos) > 32) {
      res = res * 10 + (input.charCodeAt(pos) - 48);
      pos++;
    }
    return res;
  }

  const s = nextInt();
  const b = nextInt();
  if (s === null || b === null) return;

  const a = new Int32Array(s);
  for (let i = 0; i < s; i++) a[i] = nextInt();

  const bases = [];
  for (let i = 0; i < b; i++) {
    const d = nextInt();
    const g = nextInt();
    bases.push({ d, g });
  }

  bases.sort((x, y) => x.d - y.d);

  const prefGold = new Float64Array(b + 1);
  for (let i = 0; i < b; i++) {
    prefGold[i + 1] = prefGold[i] + bases[i].g;
  }

  const out = [];
  for (let i = 0; i < s; i++) {
    const power = a[i];
    let low = 0;
    let high = b - 1;
    let count = 0;

    while (low <= high) {
      const mid = (low + high) >> 1;
      if (bases[mid].d <= power) {
        count = mid + 1;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    out.push(prefGold[count]);
  }

  console.log(out.join(' '));
}

solve();

