const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const q = parseInt(input[ptr++], 10);
  let flipped = false;
  const out = [];
  for (let i = 0; i < q; i++) {
    const type = input[ptr++];
    if (type === 'Qi') {
      flipped = !flipped;
    } else {
      let x = parseInt(input[ptr++], 10);
      let y = parseInt(input[ptr++], 10);
      const pathX = [];
      let cur = x;
      while (cur >= 1) {
        pathX.push(cur);
        cur = Math.floor(cur / 2);
      }
      const pathY = [];
      cur = y;
      while (cur >= 1) {
        pathY.push(cur);
        cur = Math.floor(cur / 2);
      }
      pathX.reverse();
      pathY.reverse();
      let lcaDepth = 0;
      while (lcaDepth < pathX.length && lcaDepth < pathY.length && pathX[lcaDepth] === pathY[lcaDepth]) {
        lcaDepth++;
      }
      let blackCnt = 0;
      let redCnt = 0;
      for (let j = lcaDepth - 1; j < pathX.length; j++) {
        const d = Math.floor(Math.log2(pathX[j]));
        const isBlack = (d % 2 === 0) ^ flipped;
        if (isBlack) blackCnt++;
        else redCnt++;
      }
      for (let j = lcaDepth; j < pathY.length; j++) {
        const d = Math.floor(Math.log2(pathY[j]));
        const isBlack = (d % 2 === 0) ^ flipped;
        if (isBlack) blackCnt++;
        else redCnt++;
      }
      if (type === 'Qb') out.push(blackCnt);
      else out.push(redCnt);
    }
  }
  console.log(out.join('\n'));
}

solve();
