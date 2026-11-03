const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const subtaskId = parseInt(tokens[ptr++], 10);
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const x1 = parseInt(tokens[ptr++], 10);
        const y1 = parseInt(tokens[ptr++], 10);
        const x2 = parseInt(tokens[ptr++], 10);
        const y2 = parseInt(tokens[ptr++], 10);
        const x3 = parseInt(tokens[ptr++], 10);
        const y3 = parseInt(tokens[ptr++], 10);

        const d12 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        const d23 = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
        const d31 = (x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1);

        const d = [d12, d23, d31];
        d.sort((a, b) => a - b);

        let sideType;
        if (d[0] === d[1] || d[1] === d[2]) {
            sideType = 'Isosceles';
        } else {
            sideType = 'Scalene';
        }

        if (subtaskId === 1) {
            out.push(`${sideType} triangle`);
        } else {
            let angleType;
            if (d[0] + d[1] > d[2]) {
                angleType = 'acute';
            } else if (d[0] + d[1] === d[2]) {
                angleType = 'right';
            } else {
                angleType = 'obtuse';
            }
            out.push(`${sideType} ${angleType} triangle`);
        }
    }

    console.log(out.join('\n'));
}

solve();
