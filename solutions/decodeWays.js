var numDecodings = function(s) {
    if (!s || s[0] === '0') return 0;
    let n = s.length;
    let dp0 = 1;
    let dp1 = 1;
    for (let i = 1; i < n; i++) {
        let cur = 0;
        let d1 = parseInt(s[i]);
        let d2 = parseInt(s.slice(i - 1, i + 1));
        if (d1 >= 1 && d1 <= 9) {
            cur += dp1;
        }
        if (d2 >= 10 && d2 <= 26) {
            cur += dp0;
        }
        dp0 = dp1;
        dp1 = cur;
    }
    return dp1;
};

var solve = typeof numDecodings !== 'undefined' ? numDecodings : null;

const fs = require('fs');
function runLocal() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    console.log(solve(input));
}
if (require.main === module) {
    runLocal();
}
module.exports = solve;
