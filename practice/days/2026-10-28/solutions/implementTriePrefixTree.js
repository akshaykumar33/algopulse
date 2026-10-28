var Trie = function() {
  this.root = {};
};

Trie.prototype.insert = function(word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    if (!node[c]) node[c] = {};
    node = node[c];
  }
  node.isEnd = true;
};

Trie.prototype.search = function(word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    if (!node[c]) return false;
    node = node[c];
  }
  return !!node.isEnd;
};

Trie.prototype.startsWith = function(prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    const c = prefix[i];
    if (!node[c]) return false;
    node = node[c];
  }
  return true;
};

var solve = function(commands, args) {
  let trie = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'Trie') {
      trie = new Trie();
      res.push(null);
    } else if (cmd === 'insert') {
      trie.insert(arg[0]);
      res.push(null);
    } else if (cmd === 'search') {
      res.push(trie.search(arg[0]));
    } else if (cmd === 'startsWith') {
      res.push(trie.startsWith(arg[0]));
    }
  }
  return res;
};

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;

