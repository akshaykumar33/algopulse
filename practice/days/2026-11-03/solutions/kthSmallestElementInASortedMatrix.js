var kthSmallest = function(matrix, k) {
    const n = matrix.length;
    let low = matrix[0][0];
    let high = matrix[n - 1][n - 1];

    function countLessEqual(mid) {
        let cnt = 0;
        let r = n - 1;
        let c = 0;
        while (r >= 0 && c < n) {
            if (matrix[r][c] <= mid) {
                cnt += r + 1;
                c++;
            } else {
                r--;
            }
        }
        return cnt;
    }

    while (low < high) {
        const mid = low + Math.floor((high - low) / 2);
        if (countLessEqual(mid) < k) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }

    return low;
};

var solve = kthSmallest;

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            for (let i = 0; i < lines.length; i += 2) {
                const matrix = JSON.parse(lines[i]);
                const k = JSON.parse(lines[i+1]);
                const result = solve(matrix, k);
                console.log(JSON.stringify(result));
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
