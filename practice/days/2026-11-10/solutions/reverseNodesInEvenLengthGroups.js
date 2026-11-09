function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

var reverseEvenLengthGroups = function(head) {
  const vals = [];
  let cur = head;
  while (cur) {
    vals.push(cur.val);
    cur = cur.next;
  }
  let i = 0;
  let g = 1;
  while (i < vals.length) {
    let actual = Math.min(g, vals.length - i);
    if (actual % 2 === 0) {
      let left = i, right = i + actual - 1;
      while (left < right) {
        let tmp = vals[left];
        vals[left] = vals[right];
        vals[right] = tmp;
        left++;
        right--;
      }
    }
    i += actual;
    g++;
  }
  cur = head;
  for (let k = 0; k < vals.length; k++) {
    cur.val = vals[k];
    cur = cur.next;
  }
  return head;
};

var solve = reverseEvenLengthGroups;

if (require.main === module) {
  function arrayToList(arr) {
    let dummy = new ListNode(0);
    let cur = dummy;
    for (const v of arr) {
      cur.next = new ListNode(v);
      cur = cur.next;
    }
    return dummy.next;
  }
  function listToArray(head) {
    const res = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  }
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const parsed = JSON.parse(line);
        const arr = Array.isArray(parsed[0]) ? parsed[0] : parsed;
        const head = arrayToList(arr);
        const res = reverseEvenLengthGroups(head);
        console.log(JSON.stringify(listToArray(res)));
      }
    }
  } catch (err) {}
}
module.exports = solve;
