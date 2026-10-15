function LNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var middleNode = function(head) {
  let s = head;
  let f = head;
  while (f && f.next) {
    s = s.next;
    f = f.next.next;
  }
  return s;
};

var middleOfTheLinkedList = middleNode;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        let str = line.trim();
        if (str.includes('=')) {
          str = str.slice(str.indexOf('=') + 1).trim();
        }
        try {
          const parsed = JSON.parse(str);
          if (Array.isArray(parsed)) {
            const d = new LNode(0);
            let c = d;
            for (const x of parsed) {
              c.next = new LNode(x);
              c = c.next;
            }
            let res = middleNode(d.next);
            const ans = [];
            while (res) {
              ans.push(res.val);
              res = res.next;
            }
            console.log(JSON.stringify(ans));
          }
        } catch {}
      }
    }
  } catch {}
}

if (typeof module !== 'undefined') {
  module.exports = middleNode;
}
