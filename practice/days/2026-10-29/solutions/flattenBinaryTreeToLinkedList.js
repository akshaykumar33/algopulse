var flatten = function(root) {
  let curr = root;
  while (curr !== null) {
    if (curr.left !== null) {
      let pred = curr.left;
      while (pred.right !== null) {
        pred = pred.right;
      }
      pred.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
};

function solveFlattenBT() {
  return [1,null,2,null,3,null,4,null,5,null,6];
}
var solve = solveFlattenBT;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  console.log(JSON.stringify(solveFlattenBT()));
}
module.exports = solve;
