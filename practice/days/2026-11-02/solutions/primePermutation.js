const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const s = tokens[0];
    const n = s.length;

    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            for (let j = 2 * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primeList = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primeList.push(i);
    }

    const parent = new Array(n + 1);
    for (let i = 1; i <= n; i++) parent[i] = i;
    function find(i) {
        let root = i;
        while (root !== parent[root]) root = parent[root];
        let curr = i;
        while (curr !== root) {
            let nxt = parent[curr];
            parent[curr] = root;
            curr = nxt;
        }
        return root;
    }
    function union(i, j) {
        let rootI = find(i);
        let rootJ = find(j);
        if (rootI !== rootJ) parent[rootI] = rootJ;
    }

    for (let p of primeList) {
        for (let k = 2; p * k <= n; k++) {
            union(p, p * k);
        }
    }

    const groups = new Map();
    for (let i = 1; i <= n; i++) {
        let root = find(i);
        if (!groups.has(root)) groups.set(root, []);
        groups.get(root).push(i);
    }

    const freq = new Array(26).fill(0);
    for (let i = 0; i < n; i++) {
        freq[s.charCodeAt(i) - 97]++;
    }

    let maxGroupRoot = -1;
    let maxGroupSize = -1;
    for (let [root, members] of groups.entries()) {
        if (members.length > maxGroupSize) {
            maxGroupSize = members.length;
            maxGroupRoot = root;
        }
    }

    const ans = new Array(n);
    let bestChar = -1;
    for (let c = 0; c < 26; c++) {
        if (freq[c] >= maxGroupSize) {
            bestChar = c;
            break;
        }
    }

    if (bestChar === -1) {
        console.log("NO");
        return;
    }

    freq[bestChar] -= maxGroupSize;
    for (let idx of groups.get(maxGroupRoot)) {
        ans[idx - 1] = String.fromCharCode(97 + bestChar);
    }
    groups.delete(maxGroupRoot);

    let charPtr = 0;
    for (let [root, members] of groups.entries()) {
        while (charPtr < 26 && freq[charPtr] < members.length) {
            charPtr++;
        }
        if (charPtr === 26) {
            console.log("NO");
            return;
        }
        freq[charPtr] -= members.length;
        for (let idx of members) {
            ans[idx - 1] = String.fromCharCode(97 + charPtr);
        }
    }

    for (let i = 0; i < n; i++) {
        if (!ans[i]) {
            while (charPtr < 26 && freq[charPtr] === 0) charPtr++;
            freq[charPtr]--;
            ans[i] = String.fromCharCode(97 + charPtr);
        }
    }

    console.log("YES");
    console.log(ans.join(''));
}

solve();
