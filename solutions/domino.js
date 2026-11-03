const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

const n = parseInt(tokens[ptr++], 10);
const out = [];

if (n === 1) {
  out.push('aa');
  out.push('bb');
  out.push('cc');
  out.push('dd');
} else {
  let s1 = '';
  let s2 = '';
  let s3 = '';
  let s4 = '';

  for (let i = 0; i < n; ++i) {
    const char1 = String.fromCharCode(97 + (i % 2));
    const char2 = String.fromCharCode(97 + ((i + 1) % 2));
    s1 += char1;
    s2 += char1;
    s3 += char2;
    s4 += char2;
  }

  out.push(s1);
  out.push(s2);
  out.push(s3);
  out.push(s4);
}

console.log(out.join('\n'));
