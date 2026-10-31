var nextPermutation = function(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    if (i >= 0) {
        let j = nums.length - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }
        let tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
        let tmp = nums[l];
        nums[l] = nums[r];
        nums[r] = tmp;
        l++;
        r--;
    }
};
var solve = function(nums) {
    nextPermutation(nums);
    return nums;
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
                    const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
                    console.log(JSON.stringify(result));
                } catch {
                    console.log(JSON.stringify(solve(line)));
                }
            }
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}
module.exports = solve;
