const fs = require('fs');

function main() {}

function solve() {
  const rb = Buffer.allocUnsafe(65536);
  const out = [];
  let t = 0;
  let tc = 0;
  let phase = 0;
  let bal = 0;
  let ans = 0;
  let pos = 0;
  let broken = false;

  while (true) {
    let nRead = 0;
    try {
      nRead = fs.readSync(0, rb, 0, rb.length, null);
    } catch (e) {
      if (e.code === 'EAGAIN') continue;
      if (e.code === 'EOF') break;
      throw e;
    }
    if (nRead === 0) break;

    for (let i = 0; i < nRead; i++) {
      const c = rb[i];
      if (phase === 0) {
        if (c > 32) {
          t = c - 48;
          phase = 1;
        }
      } else if (phase === 1) {
        if (c >= 48 && c <= 57) {
          t = t * 10 + (c - 48);
        } else if (c <= 32) {
          phase = 2;
        }
      } else if (phase === 2) {
        if (c > 32) {
          phase = 3;
          bal = 0;
          ans = 0;
          pos = 1;
          if (c === 60) {
            bal = 1;
            broken = false;
          } else {
            bal = -1;
            broken = true;
          }
        }
      } else {
        if (c <= 32) {
          out.push(ans);
          tc++;
          if (tc === t) {
            console.log(out.join('\n'));
            return;
          }
          phase = 2;
        } else if (!broken) {
          pos++;
          if (c === 60) {
            bal++;
          } else {
            bal--;
            if (bal < 0) {
              broken = true;
            } else if (bal === 0) {
              ans = pos;
            }
          }
        }
      }
    }
  }

  if (phase === 3) {
    out.push(ans);
    tc++;
  }
  while (tc < t) {
    out.push(0);
    tc++;
  }
  if (out.length > 0) console.log(out.join('\n'));
}

solve();
