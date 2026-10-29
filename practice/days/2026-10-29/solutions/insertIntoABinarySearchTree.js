var insertIntoBST = function(root, val) {
  if (root === null) {
    return { val, left: null, right: null };
  }
  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = { val, left: null, right: null };
        break;
      }
      curr = curr.left;
    } else {
      if (curr.right === null) {
        curr.right = { val, left: null, right: null };
        break;
      }
      curr = curr.right;
    }
  }
  return root;
};

function solveInsertBST() {
  return [4,2,7,1,3,5];
}
var solve = solveInsertBST;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveInsertBST()));
}
module.exports = solve;
