const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let line = 0;

    const T = parseInt(input[line++]);
    const out = [];

    for (let t = 0; t < T; t++) {
        const N = parseInt(input[line++]);
        const A = input[line++].split(' ').map(Number);
        const B = input[line++].split(' ').map(Number);

        const counts = new Map();
        for (let i = 0; i < N; i++) {
            counts.set(A[i], (counts.get(A[i]) || 0) + 1);
        }

        let maxNutrition = 0;
        for (let i = 0; i < N; i++) {
            const foodType = A[i];
            const nutritionValue = B[i];
            if (counts.get(foodType) === 1) {
                maxNutrition += nutritionValue;
            }
        }
        out.push(maxNutrition);
    }
    console.log(out.join('\n'));
}

solve();
