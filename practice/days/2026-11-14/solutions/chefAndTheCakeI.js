const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8');
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
  const t = nextInt();
  if (t === null) return;
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x1 = nextInt(), y1 = nextInt(), x2 = nextInt(), y2 = nextInt();
    const x3 = nextInt(), y3 = nextInt(), x4 = nextInt(), y4 = nextInt();
    const area1 = (x2 - x1) * (y2 - y1);
    const area2 = (x4 - x3) * (y4 - y3);
    const ix = Math.max(0, Math.min(x2, x4) - Math.max(x1, x3));
    const iy = Math.max(0, Math.min(y2, y4) - Math.max(y1, y3));
    const inter = ix * iy;
    out.push(area1 + area2 - inter);
  }
  console.log(out.join('\n'));
}

solve();
