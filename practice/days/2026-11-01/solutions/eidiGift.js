const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const a = [], b = [];
    for (let j = 0; j < 3; j++) a.push(parseInt(tokens[ptr++], 10));
    for (let j = 0; j < 3; j++) b.push(parseInt(tokens[ptr++], 10));
    const kids = [];
    for (let j = 0; j < 3; j++) {
      kids.push({ age: a[j], money: b[j] });
    }
    kids.sort((x, y) => x.age - y.age);
    let ok = true;
    for (let j = 0; j < 2; j++) {
      if (kids[j].age === kids[j + 1].age) {
        if (kids[j].money !== kids[j + 1].money) {
          ok = false;
        }
      } else {
        if (kids[j].money >= kids[j + 1].money) {
          ok = false;
        }
      }
    }
    if (ok) {
      out.push('FAIR');
    } else {
      out.push('NOT FAIR');
    }
  }
  console.log(out.join('\n'));
}
solve();
