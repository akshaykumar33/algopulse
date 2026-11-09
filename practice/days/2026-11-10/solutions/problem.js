const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 5 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  const k = parseInt(input[2], 10);
  const a = parseInt(input[3], 10);
  const b = parseInt(input[4], 10);

  const mk = m * k;
  const ea = Math.floor((a - 1) / mk) + 1;
  const rema = (a - 1) % mk;
  const fa = Math.floor(rema / k) + 1;

  const eb = Math.floor((b - 1) / mk) + 1;
  const remb = (b - 1) % mk;
  const fb = Math.floor(remb / k) + 1;

  if (ea === eb) {
    if (fa === fb) {
      console.log(0);
      return;
    }
    const walk = Math.abs(fa - fb) * 5;
    const elev = 10 + (fa - 1) + Math.abs(fa - fb);
    console.log(Math.min(walk, elev));
    return;
  }

  const diffE = Math.abs(ea - eb);
  const dent = Math.min(diffE, n - diffE) * 15;
  const down = Math.min((fa - 1) * 5, 10 + 2 * (fa - 1));
  const up = Math.min((fb - 1) * 5, 10 + (fb - 1));
  console.log(dent + down + up);
}

solve();
