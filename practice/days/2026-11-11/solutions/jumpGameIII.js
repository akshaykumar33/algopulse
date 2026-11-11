var canReach = function(arr, start) {
  const n = arr.length;
  const vis = new Uint8Array(n);
  const q = new Int32Array(n);
  let head = 0;
  let tail = 0;
  vis[start] = 1;
  q[tail++] = start;
  while (head < tail) {
    const u = q[head++];
    const step = arr[u];
    if (step === 0) return true;
    const r = u + step;
    if (r < n && !vis[r]) {
      vis[r] = 1;
      q[tail++] = r;
    }
    const l = u - step;
    if (l >= 0 && !vis[l]) {
      vis[l] = 1;
      q[tail++] = l;
    }
  }
  return false;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = canReach.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(canReach(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(canReach(...args)));
      }
    }
  }
}
