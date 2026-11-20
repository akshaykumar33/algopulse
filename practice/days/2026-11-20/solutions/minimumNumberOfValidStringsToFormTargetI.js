class TrieNode {
  constructor() {
    this.next = new Map();
  }
}

var minValidStrings = function(words, target) {
  const root = new TrieNode();
  for (const w of words) {
    let node = root;
    for (let i = 0; i < w.length; i++) {
      const ch = w[i];
      if (!node.next.has(ch)) node.next.set(ch, new TrieNode());
      node = node.next.get(ch);
    }
  }

  const n = target.length;
  const maxJump = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    let node = root;
    let len = 0;
    for (let j = i; j < n; j++) {
      const ch = target[j];
      if (!node.next.has(ch)) break;
      node = node.next.get(ch);
      len++;
    }
    maxJump[i] = len;
  }

  let jumps = 0, curEnd = 0, furthest = 0;
  for (let i = 0; i < n; i++) {
    if (i + maxJump[i] > furthest) {
      furthest = i + maxJump[i];
    }
    if (i === curEnd) {
      if (furthest === i) return -1;
      jumps++;
      curEnd = furthest;
      if (curEnd >= n) break;
    }
  }

  return curEnd >= n ? jumps : -1;
};

var solve = minValidStrings;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = minValidStrings;