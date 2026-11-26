var countMentions = function(numberOfUsers, events) {
  events.sort((a, b) => {
    const ta = Number(a[1]);
    const tb = Number(b[1]);
    if (ta !== tb) return ta - tb;
    if (a[0] === b[0]) return 0;
    return a[0] === 'OFFLINE' ? -1 : 1;
  });
  const mentions = new Array(numberOfUsers).fill(0);
  const offlineUntil = new Int32Array(numberOfUsers);
  for (let i = 0; i < events.length; i++) {
    const type = events[i][0];
    const t = Number(events[i][1]);
    if (type === 'OFFLINE') {
      const u = Number(events[i][2]);
      offlineUntil[u] = t + 60;
    } else {
      const parts = events[i][2].split(' ');
      for (let j = 0; j < parts.length; j++) {
        const tok = parts[j];
        if (tok === 'ALL') {
          for (let u = 0; u < numberOfUsers; u++) mentions[u]++;
        } else if (tok === 'HERE') {
          for (let u = 0; u < numberOfUsers; u++) {
            if (offlineUntil[u] <= t) mentions[u]++;
          }
        } else {
          const u = Number(tok.slice(2));
          mentions[u]++;
        }
      }
    }
  }
  return mentions;
};
var solve = countMentions;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
    const args = [];
    let i = 0;
    while (i < raw.length) {
      while (i < raw.length && /\s/.test(raw[i])) i++;
      if (i >= raw.length) break;
      if (raw[i] === '[' || raw[i] === '{') {
        let depth = 0, start = i, inStr = false, quote = '';
        while (i < raw.length) {
          const c = raw[i];
          if (inStr) {
            if (c === '\\') i++;
            else if (c === quote) inStr = false;
          } else {
            if (c === '"' || c === "'") { inStr = true; quote = c; }
            else if (c === '[' || c === '{') depth++;
            else if (c === ']' || c === '}') {
              depth--;
              if (depth === 0) { i++; break; }
            }
          }
          i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else if (raw[i] === '"' || raw[i] === "'") {
        const quote = raw[i], start = i;
        i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        const start = i;
        while (i < raw.length && !/\s/.test(raw[i])) i++;
        const tok = raw.slice(start, i);
        if (tok === 'true') args.push(true);
        else if (tok === 'false') args.push(false);
        else if (tok === 'null') args.push(null);
        else if (!isNaN(Number(tok))) args.push(Number(tok));
        else args.push(tok);
      }
    }
    return args;
  }
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const parsed = parseArgs(raw);
    const res = countMentions(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = countMentions;
