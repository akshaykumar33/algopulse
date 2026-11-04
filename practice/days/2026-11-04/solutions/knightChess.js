const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dy = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(input[ptr++], 10);
    const kx = new Float64Array(n);
    const ky = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      kx[i] = parseFloat(input[ptr++]);
      ky[i] = parseFloat(input[ptr++]);
    }
    const kingX = parseFloat(input[ptr++]);
    const kingY = parseFloat(input[ptr++]);

    const attacked = new Uint8Array(9);

    for (let i = 0; i < n; i++) {
      const x = kx[i];
      const y = ky[i];

      const diffX = Math.abs(x - kingX);
      const diffY = Math.abs(y - kingY);
      if ((diffX === 1 && diffY === 2) || (diffX === 2 && diffY === 1)) {
        attacked[0] = 1;
      }

      for (let j = 0; j < 8; j++) {
        if (attacked[j + 1]) continue;
        const nx = kingX + dx[j];
        const ny = kingY + dy[j];
        const dX = Math.abs(x - nx);
        const dY = Math.abs(y - ny);
        if ((dX === 1 && dY === 2) || (dX === 2 && dY === 1)) {
          attacked[j + 1] = 1;
        }
      }
    }

    if (attacked[0] === 0) {
      out.push('NO');
      continue;
    }

    let allNeighborsAttacked = true;
    for (let j = 1; j <= 8; j++) {
      if (attacked[j] === 0) {
        allNeighborsAttacked = false;
        break;
      }
    }

    out.push(allNeighborsAttacked ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();

