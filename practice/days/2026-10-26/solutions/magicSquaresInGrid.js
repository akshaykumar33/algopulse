var numMagicSquaresInside = function(grid) {
    let r = grid.length;
    let c = grid[0].length;
    let cnt = 0;
    
    function isMagic(i, j) {
        let s = new Set();
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                let v = grid[i + x][j + y];
                if (v < 1 || v > 9 || s.has(v)) return false;
                s.add(v);
            }
        }
        
        let sum = grid[i][j] + grid[i][j+1] + grid[i][j+2];
        
        for (let x = 0; x < 3; x++) {
            if (grid[i+x][j] + grid[i+x][j+1] + grid[i+x][j+2] !== sum) return false;
            if (grid[i][j+x] + grid[i+1][j+x] + grid[i+2][j+x] !== sum) return false;
        }
        
        if (grid[i][j] + grid[i+1][j+1] + grid[i+2][j+2] !== sum) return false;
        if (grid[i][j+2] + grid[i+1][j+1] + grid[i+2][j] !== sum) return false;
        
        return true;
    }
    
    for (let i = 0; i <= r - 3; i++) {
        for (let j = 0; j <= c - 3; j++) {
            if (isMagic(i, j)) cnt++;
        }
    }
    
    return cnt;
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
          const result = Array.isArray(parsed) && numMagicSquaresInside.length > 1 ? numMagicSquaresInside(...parsed) : numMagicSquaresInside(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(numMagicSquaresInside(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = numMagicSquaresInside;
