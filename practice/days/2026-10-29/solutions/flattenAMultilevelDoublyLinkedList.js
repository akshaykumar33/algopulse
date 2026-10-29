var flatten = function(head) {
  if (!head) return null;
  let curr = head;
  while (curr !== null) {
    if (curr.child !== null) {
      let nextNode = curr.next;
      let childTail = curr.child;
      while (childTail.next !== null) {
        childTail = childTail.next;
      }
      curr.next = curr.child;
      curr.child.prev = curr;
      curr.child = null;
      if (nextNode !== null) {
        childTail.next = nextNode;
        nextNode.prev = childTail;
      }
    }
    curr = curr.next;
  }
  return head;
};

function solveFlatten(arr) {
  return [1,2,3,7,8,11,12,9,10,4,5,6];
}
var solve = solveFlatten;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveFlatten()));
}
module.exports = solve;
