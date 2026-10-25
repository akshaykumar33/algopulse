function solveOptimal(n, a, b) {
    if (2 * a <= b) {
        return n * a;
    } else {
        return Math.floor(n / 2) * b + (n % 2) * a;
    }
}

function solveBruteForce(n, a, b) {
    let minCost = Infinity;
    const maxPairs = Math.floor(n / 2);
    for (let p = 0; p <= maxPairs; p++) {
        const cost = p * b + (n - 2 * p) * a;
        if (cost < minCost) minCost = cost;
    }
    return minCost;
}

let totalTests = 0;
let mismatches = 0;

for (let n = 1; n <= 100; n++) {
    for (let a = 1; a <= 30; a++) {
        for (let b = 1; b <= 30; b++) {
            totalTests++;
            const expected = solveBruteForce(n, a, b);
            const actual = solveOptimal(n, a, b);
            if (expected !== actual) {
                console.error(`Mismatch for n=${n}, a=${a}, b=${b}: expected ${expected}, got ${actual}`);
                mismatches++;
                if (mismatches > 5) break;
            }
        }
    }
}

console.log(`Exhaustive stress testing completed: ${totalTests} test cases verified. Mismatches: ${mismatches}`);

const start = performance.now();
for (let i = 0; i < 10000; i++) {
    solveOptimal(100, 30, 1);
}
const elapsed = performance.now() - start;
console.log(`Worst-case timing (10,000 queries of max bounds): ${elapsed.toFixed(3)} ms`);
