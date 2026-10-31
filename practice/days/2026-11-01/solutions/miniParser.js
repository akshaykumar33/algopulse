function NestedInteger(value) {
    this.val = value === undefined ? null : value;
    this.list = value === undefined ? [] : null;
    this.isInteger = function() {
        return this.val !== null;
    };
    this.getInteger = function() {
        return this.val;
    };
    this.setInteger = function(value) {
        this.val = value;
        this.list = null;
    };
    this.add = function(ni) {
        if (this.val !== null) {
            this.list = [new NestedInteger(this.val)];
            this.val = null;
        }
        if (this.list === null) {
            this.list = [];
        }
        this.list.push(ni);
    };
    this.getList = function() {
        if (this.val !== null) {
            return [new NestedInteger(this.val)];
        }
        return this.list;
    };
}

var deserialize = function(s) {
    if (s[0] !== '[') {
        return new NestedInteger(parseInt(s, 10));
    }
    const stack = [];
    let cur = null;
    let l = 0;
    for (let r = 0; r < s.length; r++) {
        const c = s[r];
        if (c === '[') {
            const ni = new NestedInteger();
            if (cur !== null) {
                cur.add(ni);
                stack.push(cur);
            }
            cur = ni;
            l = r + 1;
        } else if (c === ',' || c === ']') {
            if (r > l) {
                const val = parseInt(s.substring(l, r), 10);
                cur.add(new NestedInteger(val));
            }
            l = r + 1;
            if (c === ']' && stack.length > 0) {
                const parent = stack.pop();
                if (r === s.length - 1) {
                    return cur;
                }
                cur = parent;
            }
        }
    }
    return cur;
};

var solve = typeof deserialize !== 'undefined' ? deserialize : null;

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
          const res = solve(parsed);
          console.log(JSON.stringify(res));
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
