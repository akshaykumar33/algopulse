class MyCalendarTwo {
    constructor() {
        this.books = [];
        this.overlaps = [];
    }

    book(start, end) {
        for (const [s, e] of this.overlaps) {
            if (Math.max(s, start) < Math.min(e, end)) {
                return false;
            }
        }
        for (const [s, e] of this.books) {
            const maxs = Math.max(s, start);
            const mine = Math.min(e, end);
            if (maxs < mine) {
                this.overlaps.push([maxs, mine]);
            }
        }
        this.books.push([start, end]);
        return true;
    }
}

var solve = function(commands, args) {
    const cal = new MyCalendarTwo();
    const res = [];
    for (let i = 0; i < commands.length; i++) {
        if (commands[i] === "MyCalendarTwo") {
            res.push(null);
        } else if (commands[i] === "book") {
            res.push(cal.book(args[i][0], args[i][1]));
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
      const commands = JSON.parse(lines[0]);
      const args = JSON.parse(lines[1]);
      console.log(JSON.stringify(solve(commands, args)));
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
