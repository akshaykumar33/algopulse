const fs = require('fs');

const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let ptr = 0;
const t = parseInt(lines[ptr++]);
const results = [];

for (let i = 0; i < t; i++) {
  const n = parseInt(lines[ptr++]);
  const p = lines[ptr++].trim().split(/\s+/);
  
  if (Number(p[0]) !== n && Number(p[n - 1]) !== n) {
    results.push("-1");
  } else {
    results.push(p.reverse().join(' '));
  }
}

console.log(results.join('\n'));
