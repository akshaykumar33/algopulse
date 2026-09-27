// Very fast input for JavaScript (critical!)
const input = () => {
    let buf = '', ptr = 0;
    const stdin = process.stdin;
    stdin.setEncoding('utf8');
    stdin.on('data', chunk => buf += chunk);
    stdin.on('end', () => main());
    return () => {
        while (ptr < buf.length && (buf[ptr] === ' ' || buf[ptr] === '\n')) ptr++;
        let s = '';
        while (ptr < buf.length && buf[ptr] !== ' ' && buf[ptr] !== '\n') s += buf[ptr++];
        return s;
    };
};

const read = input();
const ri = () => +read();
const rs = () => read();

class SegmentTree {
    constructor(n, a) {
        this.n = n;
        this.tree = Array(n*4).fill(0);
        this.build(1, 1, n, a);
    }

    build(node, l, r, a) {
        if (l === r) {
            this.tree[node] = a[l];
            return;
        }
        const mid = l + r >> 1;
        this.build(node*2,   l, mid, a);
        this.build(node*2+1, mid+1, r, a);
        this.tree[node] = Math.min(this.tree[node*2], this.tree[node*2+1]);
    }

    update(node, l, r, idx, val) {
        if (l === r) {
            this.tree[node] = val;
            return;
        }
        const mid = l + r >> 1;
        if (idx <= mid)
            this.update(node*2, l, mid, idx, val);
        else
            this.update(node*2+1, mid+1, r, idx, val);
        this.tree[node] = Math.min(this.tree[node*2], this.tree[node*2+1]);
    }

    queryMin(node, l, r, ql, qr) {
        if (ql > r || qr < l) return Infinity;
        if (ql <= l && r <= qr) return this.tree[node];
        const mid = l + r >> 1;
        return Math.min(
            this.queryMin(node*2,   l, mid, ql, qr),
            this.queryMin(node*2+1, mid+1, r, ql, qr)
        );
    }
}

// Main logic - the hard part
function countNasty(l, r, st) {
    let len = r - l + 1;
    let ans = 0;

    // Very important optimization: if min[l..r] > len-1, answer is 0 or 1
    let wholeMin = st.queryMin(1, 1, st.n, l, r);
    if (wholeMin >= len) return 1; // only d=0 is always nasty

    let pos = l;
    while (pos <= r) {
        // Binary search the furthest we can go from pos
        let low = pos, high = r;
        let best = pos - 1;

        while (low <= high) {
            let mid = low + high >> 1;
            let d = mid - pos;
            let mn = st.queryMin(1, 1, st.n, pos, mid);
            if (mn <= d) {
                best = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        // Now best is the rightmost position where min[pos..best] <= best-pos
        if (best >= pos) {
            let d = best - pos;
            let realMin = st.queryMin(1, 1, st.n, pos, best);
            if (realMin === d) ans++;
        }

        // Very important greedy jump
        pos = best + 2; // +2 because +1 is almost never useful
    }

    return ans;
}

function solve() {
    const n = ri();
    const q = ri();
    const a = [0];
    for (let i = 1; i <= n; i++) {
        a.push(ri());
    }

    const st = new SegmentTree(n, a);

    for (let qi = 0; qi < q; qi++) {
        const tp = ri();
        if (tp === 1) {
            const i = ri();
            const x = ri();
            st.update(1, 1, n, i, x);
            a[i] = x;
        } else {
            const l = ri();
            const r = ri();
            const res = countNasty(l, r, st);
            console.log(res);
        }
    }
}

function main() {
    const t = ri();
    for (let test = 0; test < t; test++) {
        solve();
    }
}

main();