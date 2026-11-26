const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let pos = 0;
  const t = parseInt(input[pos++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const start = input[pos++];
    const q = [start];
    const visited = new Set([start]);
    let maxVal = -1;
    let head = 0;

    while (head < q.length) {
      const cur = q[head++];
      const n = cur.length;
      if (n === 0) continue;

      let lRot = cur.slice(1) + cur[0];
      lRot = lRot.replace(/^0+/, '');
      if (!visited.has(lRot)) {
        visited.add(lRot);
        q.push(lRot);
      }
      let lVal = lRot === '' ? 0 : parseInt(lRot, 10);
      if (lVal > maxVal) maxVal = lVal;

      let rRot = cur[n - 1] + cur.slice(0, n - 1);
      rRot = rRot.replace(/^0+/, '');
      if (!visited.has(rRot)) {
        visited.add(rRot);
        q.push(rRot);
      }
      let rVal = rRot === '' ? 0 : parseInt(rRot, 10);
      if (rVal > maxVal) maxVal = rVal;
    }

    out.push(maxVal);
  }

  console.log(out.join('\n'));
}

solve();
