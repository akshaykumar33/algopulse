var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
  let minLand = Infinity;
  for (let i = 0; i < landStartTime.length; i++) {
    const f = landStartTime[i] + landDuration[i];
    if (f < minLand) minLand = f;
  }
  let minWater = Infinity;
  for (let j = 0; j < waterStartTime.length; j++) {
    const f = waterStartTime[j] + waterDuration[j];
    if (f < minWater) minWater = f;
  }
  let ans = Infinity;
  for (let j = 0; j < waterStartTime.length; j++) {
    const start = minLand > waterStartTime[j] ? minLand : waterStartTime[j];
    const fin = start + waterDuration[j];
    if (fin < ans) ans = fin;
  }
  for (let i = 0; i < landStartTime.length; i++) {
    const start = minWater > landStartTime[i] ? minWater : landStartTime[i];
    const fin = start + landDuration[i];
    if (fin < ans) ans = fin;
  }
  return ans;
};
var solve = earliestFinishTime;
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
    const res = earliestFinishTime(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = earliestFinishTime;
