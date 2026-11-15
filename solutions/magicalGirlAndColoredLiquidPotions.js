const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (input.length === 1 && input[0] === '') process.exit(0);
let ptr = 0;
const T = parseInt(input[ptr++], 10);
const out = [];

for (let t = 0; t < T; t++) {
  const R = parseInt(input[ptr++], 10);
  const G = parseInt(input[ptr++], 10);
  const B = parseInt(input[ptr++], 10);
  const M = parseInt(input[ptr++], 10);

  let rMax = 0;
  for (let i = 0; i < R; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > rMax) rMax = v;
  }
  let gMax = 0;
  for (let i = 0; i < G; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > gMax) gMax = v;
  }
  let bMax = 0;
  for (let i = 0; i < B; i++) {
    const v = parseInt(input[ptr++], 10);
    if (v > bMax) bMax = v;
  }

  for (let m = 0; m < M; m++) {
    const maxVal = Math.max(rMax, gMax, bMax);
    if (maxVal === rMax) rMax = Math.floor(rMax / 2);
    else if (maxVal === gMax) gMax = Math.floor(gMax / 2);
    else bMax = Math.floor(bMax / 2);
  }

  out.push(Math.max(rMax, gMax, bMax));
}
console.log(out.join('\n'));
