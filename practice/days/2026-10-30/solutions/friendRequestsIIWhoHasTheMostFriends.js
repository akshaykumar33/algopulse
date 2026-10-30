var mostFriends = function(requests) {
    if (!requests) return [];
    if (requests.length === 0) return [];
    const count = new Map();
    for (const row of requests) {
        const u = row.requester_id !== undefined ? row.requester_id : row[0];
        const v = row.accepter_id !== undefined ? row.accepter_id : row[1];
        count.set(u, (count.get(u) || 0) + 1);
        count.set(v, (count.get(v) || 0) + 1);
    }
    let maxNum = -1;
    for (const [id, num] of count.entries()) {
        if (num > maxNum) {
            maxNum = num;
        }
    }
    let ans = [];
    for (const [id, num] of count.entries()) {
        if (num === maxNum) {
            ans.push({ id: id, num: num });
            break;
        }
    }
    return ans;
};
var solve = function(requests) {
    return mostFriends(requests);
};
if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const parsed = JSON.parse(raw);
            console.log(JSON.stringify(solve(parsed)));
        }
    } catch (err) {}
}
module.exports = solve;
