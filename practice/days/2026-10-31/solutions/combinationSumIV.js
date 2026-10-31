var combinationSum4 = function(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (i - num >= 0) {
                dp[i] += dp[i - num];
            }
        }
    }
    return dp[target];
};

var solve = combinationSum4;

if (require.main === module) {
    const fs = require('fs');
    try {
        const input = fs.readFileSync(0, 'utf-8').trim();
        if (input) {
            const lines = input.split(/\r?\n/);
            if (lines.length >= 2) {
                const nums = JSON.parse(lines[0]);
                const target = JSON.parse(lines[1]);
                console.log(solve(nums, target));
            }
        }
    } catch (e) {}
}

module.exports = solve;
