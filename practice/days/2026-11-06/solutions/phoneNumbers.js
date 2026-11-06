const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const friends = new Map();
  
  for (let i = 0; i < n; i++) {
    const name = input[ptr++];
    const k = parseInt(input[ptr++], 10);
    if (!friends.has(name)) {
      friends.set(name, new Set());
    }
    const set = friends.get(name);
    for (let j = 0; j < k; j++) {
      set.add(input[ptr++]);
    }
  }
  
  const out = [];
  out.push(friends.size);
  
  for (const [name, set] of friends.entries()) {
    const nums = Array.from(set).sort((a, b) => b.length - a.length);
    const kept = [];
    
    for (const num of nums) {
      let isSuffix = false;
      for (const k of kept) {
        if (k.endsWith(num)) {
          isSuffix = true;
          break;
        }
      }
      if (!isSuffix) {
        kept.push(num);
      }
    }
    
    out.push(`${name} ${kept.length} ${kept.join(' ')}`);
  }
  
  console.log(out.join('\n'));
}

solve();

