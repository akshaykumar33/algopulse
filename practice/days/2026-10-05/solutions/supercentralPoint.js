const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const n = parseInt(lines[0], 10);
    const points = [];
    for (let i = 1; i <= n; i++) {
        const [x, y] = lines[i].split(/\s+/).map(Number);
        points.push({ x, y });
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        let hasLeft = false;
        let hasRight = false;
        let hasLower = false;
        let hasUpper = false;

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            if (points[j].x < points[i].x && points[j].y === points[i].y) hasLeft = true;
            if (points[j].x > points[i].x && points[j].y === points[i].y) hasRight = true;
            if (points[j].x === points[i].x && points[j].y < points[i].y) hasLower = true;
            if (points[j].x === points[i].x && points[j].y > points[i].y) hasUpper = true;
        }

        if (hasLeft && hasRight && hasLower && hasUpper) {
            ans++;
        }
    }

    console.log(ans);
}

solve();
