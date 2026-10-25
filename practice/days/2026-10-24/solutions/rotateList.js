function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val);
  this.next = (next===undefined ? null : next);
}

function buildList(arr) {
  if (!arr || arr.length === 0) {
    return null;
  }
  let head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

function listToArray(head) {
  const arr = [];
  let cur = head;
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }
  return arr;
}

var rotateRight = function(head, k) {
  if (!head || k === 0) {
    return head;
  }

  let len = 1;
  let tail = head;
  while (tail.next) {
    tail = tail.next;
    len++;
  }

  k %= len;
  if (k === 0) {
    return head;
  }

  let newTailIdx = len - k - 1;
  let newTail = head;
  for (let i = 0; i < newTailIdx; i++) {
    newTail = newTail.next;
  }

  let newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const [listArr, k] = parsed;
          let head = buildList(listArr);
          const result = rotateRight(head, k);
          console.log(JSON.stringify(listToArray(result)));
        } catch (e) {
          console.error("Error processing line:", line, e);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = rotateRight;
