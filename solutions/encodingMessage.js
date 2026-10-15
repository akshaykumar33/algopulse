const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let i = 0; i < t; i++) {
    let tok = tokens[ptr++];
    let s;
    if (/^\d+$/.test(tok) && ptr < tokens.length && !/^\d+$/.test(tokens[ptr])) {
      s = tokens[ptr++];
    } else {
      s = tok;
    }
    
    const arr = s.split('');
    const n = arr.length;
    for (let j = 0; j < n - 1; j += 2) {
      const tmp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = tmp;
    }
    
    let res = '';
    for (let j = 0; j < n; j++) {
      res += String.fromCharCode(219 - arr[j].charCodeAt(0));
    }
    out.push(res);
  }

  console.log(out.join('\n'));
}

solve();
