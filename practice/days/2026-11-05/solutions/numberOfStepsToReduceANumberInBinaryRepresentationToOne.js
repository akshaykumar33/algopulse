var numSteps = function(s) {
    let steps = 0;
    let carry = 0;
    for (let i = s.length - 1; i > 0; i--) {
        let bit = parseInt(s[i]) + carry;
        if (bit % 2 === 1) {
            steps += 2;
            carry = 1;
        } else {
            steps += 1;
        }
    }
    return steps + carry;
};

var solve = numSteps;

if (require.main === module) {
    const fs = require('fs');
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    for (let line of lines) {
        if (!line) continue;
        let s = JSON.parse(line);
        console.log(solve(s));
    }
}
module.exports = solve;
