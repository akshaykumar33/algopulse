const fs = require('fs');

function getSuffix(s, k) {
  let cnt = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i];
    if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
      cnt++;
      if (cnt === k) return s.slice(i);
    }
  }
  return null;
}

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const n = parseInt(data[ptr++], 10);
  const k = parseInt(data[ptr++], 10);
  let okAABB = true;
  let okABAB = true;
  let okABBA = true;
  for (let i = 0; i < n; i++) {
    const s0 = getSuffix(data[ptr++], k);
    const s1 = getSuffix(data[ptr++], k);
    const s2 = getSuffix(data[ptr++], k);
    const s3 = getSuffix(data[ptr++], k);
    if (s0 === null || s1 === null || s2 === null || s3 === null) {
      console.log('NO');
      return;
    }
    if (s0 !== s1 || s2 !== s3) okAABB = false;
    if (s0 !== s2 || s1 !== s3) okABAB = false;
    if (s0 !== s3 || s1 !== s2) okABBA = false;
  }
  if (okAABB && okABAB && okABBA) console.log('aaaa');
  else if (okAABB) console.log('aabb');
  else if (okABAB) console.log('abab');
  else if (okABBA) console.log('abba');
  else console.log('NO');
}

solve();
