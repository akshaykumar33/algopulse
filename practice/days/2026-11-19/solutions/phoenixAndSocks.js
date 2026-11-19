const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;

  let ptr = 0;
  const t = Number(input[ptr++]);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = Number(input[ptr++]);
    const l = Number(input[ptr++]);
    const r = Number(input[ptr++]);

    const leftCnt = new Map();
    for (let i = 0; i < l; i++) {
      const c = Number(input[ptr++]);
      leftCnt.set(c, (leftCnt.get(c) || 0) + 1);
    }

    const rightCnt = new Map();
    for (let i = 0; i < r; i++) {
      const c = Number(input[ptr++]);
      rightCnt.set(c, (rightCnt.get(c) || 0) + 1);
    }

    for (const [c, cnt] of leftCnt.entries()) {
      const rcnt = rightCnt.get(c) || 0;
      const common = Math.min(cnt, rcnt);
      leftCnt.set(c, cnt - common);
      rightCnt.set(c, rcnt - common);
    }

    let lSide = [];
    let rSide = [];
    for (const [c, cnt] of leftCnt.entries()) {
      for (let i = 0; i < cnt; i++) lSide.push(c);
    }
    for (const [c, cnt] of rightCnt.entries()) {
      for (let i = 0; i < cnt; i++) rSide.push(c);
    }

    if (lSide.length < rSide.length) {
      const tmp = lSide;
      lSide = rSide;
      rSide = tmp;
    }

    const diff = (lSide.length - rSide.length) >> 1;
    const counts = new Map();
    for (const c of lSide) counts.set(c, (counts.get(c) || 0) + 1);
    let pairs = 0;
    for (const [, cnt] of counts.entries()) pairs += cnt >> 1;

    const canPair = Math.min(diff, pairs);
    const ans = diff + ((lSide.length + rSide.length) >> 1) - canPair;
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
