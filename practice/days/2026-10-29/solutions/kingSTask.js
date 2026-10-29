const fs = require('fs');

function isSorted(p) {
  for (let i = 0; i < p.length; i++) {
    if (p[i] !== i + 1) return false;
  }
  return true;
}

function op1(p) {
  for (let i = 0; i < p.length; i += 2) {
    const tmp = p[i];
    p[i] = p[i + 1];
    p[i + 1] = tmp;
  }
}

function op2(p) {
  const half = p.length / 2;
  for (let i = 0; i < half; i++) {
    const tmp = p[i];
    p[i] = p[i + half];
    p[i + half] = tmp;
  }
}

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input[0] === '') return;

  const n = parseInt(input[0], 10);
  const total = 2 * n;
  const p = new Int32Array(total);
  for (let i = 0; i < total; i++) {
    p[i] = parseInt(input[i + 1], 10);
  }

  const p1 = new Int32Array(p);
  const p2 = new Int32Array(p);

  let ans1 = -1;
  let ans2 = -1;

  for (let step = 0; step <= 2 * total; step++) {
    if (isSorted(p1)) {
      ans1 = step;
      break;
    }
    if (step % 2 === 0) {
      op1(p1);
    } else {
      op2(p1);
    }
  }

  for (let step = 0; step <= 2 * total; step++) {
    if (isSorted(p2)) {
      ans2 = step;
      break;
    }
    if (step % 2 === 0) {
      op2(p2);
    } else {
      op1(p2);
    }
  }

  if (ans1 !== -1 && ans2 !== -1) {
    console.log(Math.min(ans1, ans2));
  } else if (ans1 !== -1) {
    console.log(ans1);
  } else if (ans2 !== -1) {
    console.log(ans2);
  } else {
    console.log(-1);
  }
}

solve();

