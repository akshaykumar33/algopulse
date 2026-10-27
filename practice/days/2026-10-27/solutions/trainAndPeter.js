const fs = require('fs');

function canSee(str, a, b) {
  const idxA = str.indexOf(a);
  if (idxA === -1) return false;
  const idxB = str.indexOf(b, idxA + a.length);
  return idxB !== -1;
}

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 3) return;
  const s = lines[0].trim();
  const a = lines[1].trim();
  const b = lines[2].trim();

  const fwd = canSee(s, a, b);
  const revS = s.split('').reverse().join('');
  const bwd = canSee(revS, a, b);

  if (fwd && bwd) {
    console.log('both');
  } else if (fwd) {
    console.log('forward');
  } else if (bwd) {
    console.log('backward');
  } else {
    console.log('fantasy');
  }
}

solve();
