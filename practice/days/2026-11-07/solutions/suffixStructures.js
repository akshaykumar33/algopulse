const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length < 2 || tokens[0] === '') return;
  const s = tokens[0];
  const t = tokens[1];

  let j = 0;
  for (let i = 0; i < s.length && j < t.length; i++) {
    if (s[i] === t[j]) j++;
  }
  if (j === t.length) {
    console.log('automaton');
    return;
  }

  const cntS = new Int32Array(26);
  const cntT = new Int32Array(26);
  for (let i = 0; i < s.length; i++) cntS[s.charCodeAt(i) - 97]++;
  for (let i = 0; i < t.length; i++) cntT[t.charCodeAt(i) - 97]++;

  let sameFreq = true;
  for (let i = 0; i < 26; i++) {
    if (cntS[i] !== cntT[i]) {
      sameFreq = false;
      break;
    }
  }
  if (sameFreq) {
    console.log('array');
    return;
  }

  let canBoth = true;
  for (let i = 0; i < 26; i++) {
    if (cntT[i] > cntS[i]) {
      canBoth = false;
      break;
    }
  }
  if (canBoth) {
    console.log('both');
  } else {
    console.log('need tree');
  }
}

solve();
