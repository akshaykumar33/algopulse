const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  const n = Number(input[0]);
  const initialX = Number(input[1]);

  const type = new Int32Array(n);
  const height = new Int32Array(n);
  const mass = new Int32Array(n);

  let ptr = 2;
  for (let i = 0; i < n; i++) {
    type[i] = Number(input[ptr++]);
    height[i] = Number(input[ptr++]);
    mass[i] = Number(input[ptr++]);
  }

  function simulate(startType) {
    const used = new Uint8Array(n);
    let curX = initialX;
    let curType = startType;
    let count = 0;

    while (true) {
      let bestIdx = -1;
      let maxMass = -1;

      for (let i = 0; i < n; i++) {
        if (!used[i] && type[i] === curType && height[i] <= curX) {
          if (mass[i] > maxMass) {
            maxMass = mass[i];
            bestIdx = i;
          }
        }
      }

      if (bestIdx === -1) break;

      used[bestIdx] = 1;
      curX += mass[bestIdx];
      count++;
      curType = 1 - curType;
    }

    return count;
  }

  const ans = Math.max(simulate(0), simulate(1));
  console.log(ans);
}

solve();
