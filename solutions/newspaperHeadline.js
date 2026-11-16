const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2) return;
  const s1 = input[0];
  const s2 = input[1];

  const n = s1.length;
  const nextPos = Array.from({ length: n + 1 }, () => new Int32Array(26).fill(-1));

  for (let c = 0; c < 26; c++) {
    nextPos[n][c] = -1;
  }

  for (let i = n - 1; i >= 0; i--) {
    for (let c = 0; c < 26; c++) {
      nextPos[i][c] = nextPos[i + 1][c];
    }
    nextPos[i][s1.charCodeAt(i) - 97] = i;
  }

  let copies = 1;
  let cur = 0;

  for (let i = 0; i < s2.length; i++) {
    const ch = s2.charCodeAt(i) - 97;
    if (nextPos[0][ch] === -1) {
      console.log(-1);
      return;
    }
    let nxt = nextPos[cur][ch];
    if (nxt === -1) {
      copies++;
      cur = 0;
      nxt = nextPos[0][ch];
    }
    cur = nxt + 1;
    if (cur > n) cur = n;
  }
  console.log(copies);
}

solve();
