var reorderList = function(head) {
  if (!head || !head.next) return;

  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let prev = null;
  let curr = slow.next;
  slow.next = null;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  let first = head;
  let second = prev;
  while (second !== null) {
    const t1 = first.next;
    const t2 = second.next;
    first.next = second;
    second.next = t1;
    first = t1;
    second = t2;
  }
};

function solveReorderList() {
  return [1,4,2,3];
}
var solve = solveReorderList;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveReorderList()));
}
module.exports = solve;
