function updateMatrix(matrix) {
    const n = matrix.length;
    if (n === 0) return matrix;
    const m = matrix[0].length;

    const dist = Array.from({ length: n }, () => new Int32Array(m).fill(-1));
    const queue = new Int32Array(n * m);
    let head = 0;
    let tail = 0;

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            if (matrix[r][c] === 0) {
                dist[r][c] = 0;
                queue[tail++] = r * m + c;
            }
        }
    }

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    while (head < tail) {
        const curr = queue[head++];
        const r = Math.floor(curr / m);
        const c = curr % m;
        const d = dist[r][c];

        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            if (nr >= 0 && nr < n && nc >= 0 && nc < m && dist[nr][nc] === -1) {
                dist[nr][nc] = d + 1;
                queue[tail++] = nr * m + nc;
            }
        }
    }

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            matrix[r][c] = dist[r][c];
        }
    }

    return matrix;
}

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
});

rl.on('close', () => {
    const [n, m] = input[0].split(' ').map(Number);

    const matrix = [];
    for (let i = 1; i <= n; i++) {
        const row = input[i].split(' ').map(Number);
        matrix.push(row);
    }

    updateMatrix(matrix);

    for (const row of matrix) {
        console.log(row.join(' '));
    }
});
