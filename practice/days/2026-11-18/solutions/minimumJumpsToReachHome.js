var minimumJumps = function(forbidden, a, b, x) {
  const forb = new Set(forbidden);
  let maxPos = x;
  for (let i = 0; i < forbidden.length; i++) {
    if (forbidden[i] > maxPos) maxPos = forbidden[i];
  }
  maxPos = Math.max(x, maxPos) + a + b + 2000;

  const vis0 = new Uint8Array(maxPos + 1);
  const vis1 = new Uint8Array(maxPos + 1);

  const qPos = [0];
  const qBack = [1];
  const qDist = [0];
  vis1[0] = 1;
  let head = 0;

  while (head < qPos.length) {
    const pos = qPos[head];
    const canBack = qBack[head];
    const dist = qDist[head++];

    if (pos === x) return dist;

    const fwd = pos + a;
    if (fwd <= maxPos && !forb.has(fwd) && !vis1[fwd]) {
      vis1[fwd] = 1;
      qPos.push(fwd);
      qBack.push(1);
      qDist.push(dist + 1);
    }

    if (canBack) {
      const bwd = pos - b;
      if (bwd >= 0 && !forb.has(bwd) && !vis0[bwd]) {
        vis0[bwd] = 1;
        qPos.push(bwd);
        qBack.push(0);
        qDist.push(dist + 1);
      }
    }
  }

  return -1;
};

var solve = minimumJumps;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = minimumJumps;
