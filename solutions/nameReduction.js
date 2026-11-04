const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const parentA = input[ptr++];
    const parentB = input[ptr++];

    const parentFreq = new Int32Array(26);
    for (let i = 0; i < parentA.length; i++) {
      parentFreq[parentA.charCodeAt(i) - 97]++;
    }
    for (let i = 0; i < parentB.length; i++) {
      parentFreq[parentB.charCodeAt(i) - 97]++;
    }

    const n = parseInt(input[ptr++], 10);
    const childFreq = new Int32Array(26);
    for (let i = 0; i < n; i++) {
      const child = input[ptr++];
      for (let j = 0; j < child.length; j++) {
        childFreq[child.charCodeAt(j) - 97]++;
      }
    }

    let possible = true;
    for (let i = 0; i < 26; i++) {
      if (childFreq[i] > parentFreq[i]) {
        possible = false;
        break;
      }
    }

    out.push(possible ? 'YES' : 'NO');
  }

  console.log(out.join('\n'));
}

solve();
