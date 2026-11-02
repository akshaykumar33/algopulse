var copyRandomList = function(head) {
    if (!head) return null;
    const Ctor = typeof _Node !== 'undefined' ? _Node : (typeof Node !== 'undefined' ? Node : function(val, next, random) {
        this.val = val;
        this.next = next || null;
        this.random = random || null;
    });
    const map = new Map();
    let cur = head;
    while (cur) {
        map.set(cur, new Ctor(cur.val));
        cur = cur.next;
    }
    cur = head;
    while (cur) {
        const copy = map.get(cur);
        copy.next = map.get(cur.next) || null;
        copy.random = map.get(cur.random) || null;
        cur = cur.next;
    }
    return map.get(head);
};

if (require.main === module) {
  function Node(val, next, random) {
    this.val = val;
    this.next = next || null;
    this.random = random || null;
  }
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const map = new Map();
          let head = null, tail = null;
          for (let i = 0; i < parsed.length; i++) {
            const node = new Node(parsed[i][0]);
            map.set(i, node);
            if (!head) head = node;
            else tail.next = node;
            tail = node;
          }
          let cur = head, i = 0;
          while (cur) {
            if (parsed[i][1] !== null) {
              cur.random = map.get(parsed[i][1]);
            }
            cur = cur.next;
            i++;
          }
          const copied = copyRandomList(head);
          const res = [];
          const copyMap = new Map();
          let c = copied, idx = 0;
          while (c) {
            copyMap.set(c, idx++);
            c = c.next;
          }
          c = copied;
          while (c) {
            res.push([c.val, c.random ? copyMap.get(c.random) : null]);
            c = c.next;
          }
          console.log(JSON.stringify(res));
        } catch {
          console.log(JSON.stringify(copyRandomList(line)));
        }
      }
    }
  } catch (err) {}
}
module.exports = copyRandomList;
