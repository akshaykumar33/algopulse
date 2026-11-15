function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val);
  this.next = (next===undefined ? null : next);
}

var mergeInBetween = function(list1, a, b, list2) {
  let prevA = null;
  let afterB = null;
  let curr = list1;
  let idx = 0;

  while (curr) {
    if (idx === a - 1) prevA = curr;
    if (idx === b + 1) {
      afterB = curr;
      break;
    }
    curr = curr.next;
    idx++;
  }

  prevA.next = list2;
  let tail2 = list2;
  while (tail2.next) tail2 = tail2.next;
  tail2.next = afterB;

  return list1;
};

function buildList(arr) {
  if (!arr || arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; i++) {
    curr.next = new ListNode(arr[i]);
    curr = curr.next;
  }
  return head;
}

function serializeList(head) {
  const res = [];
  let curr = head;
  while (curr) {
    res.push(curr.val);
    curr = curr.next;
  }
  return res;
}

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 4) {
      const l1 = buildList(JSON.parse(lines[i]));
      const a = JSON.parse(lines[i + 1]);
      const b = JSON.parse(lines[i + 2]);
      const l2 = buildList(JSON.parse(lines[i + 3]));
      console.log(JSON.stringify(serializeList(mergeInBetween(l1, a, b, l2))));
    }
  }
}

module.exports = mergeInBetween;
