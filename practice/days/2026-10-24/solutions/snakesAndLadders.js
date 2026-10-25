var snakesAndLadders = function(board) {
  let n = board.length;
  let target = n * n;

  function getPos(s) {
    let rowFromBottom = Math.floor((s - 1) / n);
    let r = n - 1 - rowFromBottom;
    let col = (s - 1) % n;
    let c = rowFromBottom % 2 === 0 ? col : n - 1 - col;
    return [r, c];
  }

  let dist = new Array(target + 1).fill(-1);
  dist[1] = 0;
  let q = [1];
  let head = 0;

  while (head < q.length) {
    let curr = q[head++];
    if (curr === target) return dist[curr];

    for (let dice = 1; dice <= 6 && curr + dice <= target; dice++) {
      let next = curr + dice;
      let [r, c] = getPos(next);
      let dest = board[r][c] !== -1 ? board[r][c] : next;
      if (dist[dest] === -1) {
        dist[dest] = dist[curr] + 1;
        q.push(dest);
      }
    }
  }

  return dist[target];
};

var solve = snakesAndLadders;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const board = JSON.parse(line);
        const result = solve(board);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}

module.exports = snakesAndLadders;
