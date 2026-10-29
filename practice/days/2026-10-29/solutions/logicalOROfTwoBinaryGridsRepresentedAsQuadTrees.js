function _Node(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
  this.val = val;
  this.isLeaf = isLeaf;
  this.topLeft = topLeft;
  this.topRight = topRight;
  this.bottomLeft = bottomLeft;
  this.bottomRight = bottomRight;
}

var intersect = function(quadTree1, quadTree2) {
  const Ctor = typeof _Node !== 'undefined' ? _Node : (typeof Node !== 'undefined' ? Node : Object);

  if (quadTree1.isLeaf) {
    return quadTree1.val ? new Ctor(true, true, null, null, null, null) : quadTree2;
  }
  if (quadTree2.isLeaf) {
    return quadTree2.val ? new Ctor(true, true, null, null, null, null) : quadTree1;
  }

  const tl = intersect(quadTree1.topLeft, quadTree2.topLeft);
  const tr = intersect(quadTree1.topRight, quadTree2.topRight);
  const bl = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
  const br = intersect(quadTree1.bottomRight, quadTree2.bottomRight);

  if (tl.isLeaf && tr.isLeaf && bl.isLeaf && br.isLeaf &&
      tl.val === tr.val && tr.val === bl.val && bl.val === br.val) {
    return new Ctor(tl.val, true, null, null, null, null);
  }

  return new Ctor(false, false, tl, tr, bl, br);
};

var solve = typeof intersect !== 'undefined' ? intersect : null;
module.exports = solve;
