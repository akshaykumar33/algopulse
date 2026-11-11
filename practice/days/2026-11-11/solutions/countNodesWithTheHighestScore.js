var countHighestScoreNodes = function(parents) {
  const n = parents.length;
  const left = new Int32Array(n).fill(-1);
  const right = new Int32Array(n).fill(-1);
  for (let i = 1; i < n; i++) {
    const p = parents[i];
    if (left[p] === -1) left[p] = i;
    else right[p] = i;
  }

  const order = new Int32Array(n);
  let head = 0;
  let tail = 0;
  order[tail++] = 0;
  while (head < tail) {
    const u = order[head++];
    if (left[u] !== -1) order[tail++] = left[u];
    if (right[u] !== -1) order[tail++] = right[u];
  }

  const size = new Int32Array(n);
  let maxScore = 0;
  let ans = 0;

  for (let i = n - 1; i >= 0; i--) {
    const u = order[i];
    const l = left[u] !== -1 ? size[left[u]] : 0;
    const r = right[u] !== -1 ? size[right[u]] : 0;
    const sub = 1 + l + r;
    size[u] = sub;
    const up = n - sub;
    const score = (l > 0 ? l : 1) * (r > 0 ? r : 1) * (up > 0 ? up : 1);
    if (score > maxScore) {
      maxScore = score;
      ans = 1;
    } else if (score === maxScore) {
      ans++;
    }
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(countHighestScoreNodes(JSON.parse(line))));
    }
  }
}
