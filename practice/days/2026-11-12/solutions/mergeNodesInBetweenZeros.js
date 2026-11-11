var mergeNodes = function(head) {
  let write = head;
  let prev = null;
  let cur = head.next;
  let sum = 0;
  while (cur) {
    if (cur.val === 0) {
      write.val = sum;
      prev = write;
      write = write.next;
      sum = 0;
    } else {
      sum += cur.val;
    }
    cur = cur.next;
  }
  if (prev) prev.next = null;
  return head;
};

if (require.main === module) {
  function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }

  const arrayToList = (arr) => {
    if (!arr || arr.length === 0) return null;
    const dummy = new ListNode(0);
    let cur = dummy;
    for (let i = 0; i < arr.length; i++) {
      cur.next = new ListNode(arr[i]);
      cur = cur.next;
    }
    return dummy.next;
  };

  const listToArray = (head) => {
    const res = [];
    while (head) {
      res.push(head.val);
      head = head.next;
    }
    return res;
  };

  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(listToArray(mergeNodes(arrayToList(JSON.parse(line))))));
    }
  }
}

module.exports = mergeNodes;
