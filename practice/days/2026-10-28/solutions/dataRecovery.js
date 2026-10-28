const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const minVal = parseInt(tokens[ptr++], 10);
  const maxVal = parseInt(tokens[ptr++], 10);

  let curMin = Infinity;
  let curMax = -Infinity;
  let hasMin = false;
  let hasMax = false;

  for (let i = 0; i < m; i++) {
    const val = parseInt(tokens[ptr++], 10);
    if (val < curMin) curMin = val;
    if (val > curMax) curMax = val;
    if (val === minVal) hasMin = true;
    if (val === maxVal) hasMax = true;
  }

  if (curMin < minVal || curMax > maxVal) {
    console.log('Incorrect');
    return;
  }

  const missing = n - m;
  let required = 0;
  if (!hasMin) required++;
  if (!hasMax) required++;
  if (minVal === maxVal && !hasMin) {
    required = 1;
  }

  if (missing >= required) {
    console.log('Correct');
  } else {
    console.log('Incorrect');
  }
}

solve();
