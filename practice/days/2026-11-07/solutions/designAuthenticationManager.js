class AuthenticationManager {
  constructor(timeToLive) {
    this.ttl = timeToLive;
    this.tokens = new Map();
  }
  
  generate(tokenId, currentTime) {
    this.tokens.set(tokenId, currentTime + this.ttl);
  }
  
  renew(tokenId, currentTime) {
    if (this.tokens.has(tokenId)) {
      const exp = this.tokens.get(tokenId);
      if (currentTime < exp) {
        this.tokens.set(tokenId, currentTime + this.ttl);
      }
    }
  }
  
  countUnexpiredTokens(currentTime) {
    let count = 0;
    for (const exp of this.tokens.values()) {
      if (exp > currentTime) count++;
    }
    return count;
  }
}

function solve(commands, args) {
  let mgr = null;
  const res = [];
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    const arg = args[i];
    if (cmd === 'AuthenticationManager') {
      mgr = new AuthenticationManager(arg[0]);
      res.push(null);
    } else if (cmd === 'generate') {
      mgr.generate(arg[0], arg[1]);
      res.push(null);
    } else if (cmd === 'renew') {
      mgr.renew(arg[0], arg[1]);
      res.push(null);
    } else if (cmd === 'countUnexpiredTokens') {
      res.push(mgr.countUnexpiredTokens(arg[0]));
    }
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const cmds = JSON.parse(lines[i]);
        const a = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(cmds, a)));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = AuthenticationManager;

