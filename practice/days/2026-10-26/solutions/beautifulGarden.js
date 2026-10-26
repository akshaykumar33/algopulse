const fs = require('fs');

class MinHeap {
    constructor(cmp = (a, b) => a - b) {
        this.data = [];
        this.cmp = cmp;
    }
    push(val) {
        this.data.push(val);
        this._up(this.data.length - 1);
    }
    pop() {
        if (this.data.length === 0) return null;
        const top = this.data[0];
        const bottom = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = bottom;
            this._down(0);
        }
        return top;
    }
    peek() {
        return this.data[0];
    }
    size() {
        return this.data.length;
    }
    _up(i) {
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.cmp(this.data[i], this.data[p]) < 0) {
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }
    _down(i) {
        const n = this.data.length;
        while ((i << 1) + 1 < n) {
            let l = (i << 1) + 1;
            let r = l + 1;
            let best = i;
            if (this.cmp(this.data[l], this.data[best]) < 0) best = l;
            if (r < n && this.cmp(this.data[r], this.data[best]) < 0) best = r;
            if (best !== i) {
                [this.data[i], this.data[best]] = [this.data[best], this.data[i]];
                i = best;
            } else break;
        }
    }
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const k = parseInt(input[ptr++], 10);
        const d = parseInt(input[ptr++], 10);
        
        const bloomPQ = new MinHeap((a, b) => a - b);
        const regrowPQ = new MinHeap((a, b) => a.day - b.day);
        
        for (let i = 0; i < n; i++) {
            bloomPQ.push(parseInt(input[ptr++], 10));
        }
        
        let total = 0;
        for (let day = 1; day <= d; day++) {
            while (regrowPQ.size() > 0 && regrowPQ.peek().day <= day) {
                bloomPQ.push(regrowPQ.pop().v);
            }
            const canPluck = Math.max(0, bloomPQ.size() - k);
            for (let j = 0; j < canPluck; j++) {
                const val = bloomPQ.pop();
                total++;
                regrowPQ.push({ day: day + val, v: val });
            }
        }
        out.push(total);
    }
    
    console.log(out.join('\n'));
}

solve();
