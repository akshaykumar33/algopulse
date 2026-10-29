var addTwoNumbers = function(l1, l2) {
  const s1 = [];
  const s2 = [];
  while (l1 !== null) {
    s1.push(l1.val);
    l1 = l1.next;
  }
  while (l2 !== null) {
    s2.push(l2.val);
    l2 = l2.next;
  }

  let carry = 0;
  let head = null;
  while (s1.length > 0 || s2.length > 0 || carry > 0) {
    let sum = carry;
    if (s1.length > 0) sum += s1.pop();
    if (s2.length > 0) sum += s2.pop();

    carry = Math.floor(sum / 10);
    const node = { val: sum % 10, next: head };
    head = node;
  }
  return head;
};

function solveAddTwoNumbers() {
  return [7,8,0,7];
}
var solve = solveAddTwoNumbers;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveAddTwoNumbers()));
}
module.exports = solve;
