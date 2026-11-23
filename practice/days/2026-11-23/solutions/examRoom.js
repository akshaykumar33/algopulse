var ExamRoom = function(n) {
  this.n = n;
  this.seats = [];
};
ExamRoom.prototype.seat = function() {
  if (this.seats.length === 0) {
    this.seats.push(0);
    return 0;
  }
  let maxDist = this.seats[0];
  let bestSeat = 0;
  for (let i = 0; i < this.seats.length - 1; i++) {
    const dist = Math.floor((this.seats[i + 1] - this.seats[i]) / 2);
    if (dist > maxDist) {
      maxDist = dist;
      bestSeat = this.seats[i] + dist;
    }
  }
  const lastDist = (this.n - 1) - this.seats[this.seats.length - 1];
  if (lastDist > maxDist) {
    maxDist = lastDist;
    bestSeat = this.n - 1;
  }
  let pos = 0;
  while (pos < this.seats.length && this.seats[pos] < bestSeat) pos++;
  this.seats.splice(pos, 0, bestSeat);
  return bestSeat;
};
ExamRoom.prototype.leave = function(p) {
  const idx = this.seats.indexOf(p);
  if (idx !== -1) this.seats.splice(idx, 1);
};
function runExamRoom(cmds, args) {
  let obj = null;
  const res = [];
  for (let i = 0; i < cmds.length; i++) {
    if (cmds[i] === 'ExamRoom') {
      obj = new ExamRoom(args[i][0]);
      res.push(null);
    } else if (cmds[i] === 'seat') {
      res.push(obj.seat());
    } else if (cmds[i] === 'leave') {
      obj.leave(args[i][0]);
      res.push(null);
    }
  }
  return res;
}
ExamRoom.run = runExamRoom;
ExamRoom.solve = runExamRoom;
var solve = ExamRoom.run;
if (require.main === module) {
  const fs = require('fs');
  function parseArgs(raw) {
    raw = raw.trim();
    try {
      const p = JSON.parse(raw);
      if (Array.isArray(p) && solve.length > 1 && !raw.startsWith('[[')) return p;
    } catch (e) {}
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
        let quote = raw[i], start = i; i++;
        while (i < raw.length) {
          if (raw[i] === '\\') i += 2;
          else if (raw[i] === quote) { i++; break; }
          else i++;
        }
        args.push(JSON.parse(raw.slice(start, i)));
      } else {
        let start = i;
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
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = parseArgs(raw);
      const res = solve(...parsed);
      console.log(JSON.stringify(res));
    }
  } catch (e) {}
}
module.exports = ExamRoom;
