const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;

    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const grid = [];
    const chatMembers = Array.from({ length: m }, () => []);
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) {
            const val = parseInt(tokens[ptr++], 10);
            row.push(val);
            if (val === 1) {
                chatMembers[j].push(i);
            }
        }
        grid.push(row);
    }

    const chatMsgCount = new Array(m).fill(0);
    const userExtra = new Array(n).fill(0);
    const userMsgCountFromChats = new Array(n).fill(0);

    for (let i = 0; i < k; i++) {
        const x = parseInt(tokens[ptr++], 10) - 1;
        const y = parseInt(tokens[ptr++], 10) - 1;
        chatMsgCount[y]++;
        userExtra[x]++;
    }

    for (let j = 0; j < m; j++) {
        const cnt = chatMsgCount[j];
        if (cnt === 0) continue;
        const members = chatMembers[j];
        for (let idx = 0; idx < members.length; idx++) {
            userMsgCountFromChats[members[idx]] += cnt;
        }
    }

    const ans = [];
    for (let i = 0; i < n; i++) {
        let total = userMsgCountFromChats[i] + userExtra[i];
        const row = grid[i];
        for (let j = 0; j < m; j++) {
            if (row[j] === 1) {
                total -= userExtra[i];
            }
        }
        ans.push(total);
    }

    console.log(ans.join(' '));
}

solve();
