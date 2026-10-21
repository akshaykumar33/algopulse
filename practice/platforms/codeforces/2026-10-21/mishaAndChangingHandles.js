const input = require('fs').readFileSync(0, 'utf-8').trim().split(/\r?\n/);

function solve() {
  const n = Number(input[0]);
  const finalMap = new Map(); // Maps original handle to current handle
  const currentToOriginal = new Map(); // Maps current handle to original handle

  for (let i = 1; i <= n; i++) {
    const [oldH, newH] = input[i].split(' ');

    if (currentToOriginal.has(oldH)) {
      // If oldH was a new handle from a previous change,
      // find its original handle and update its mapping.
      const originalH = currentToOriginal.get(oldH);
      finalMap.set(originalH, newH);
      currentToOriginal.delete(oldH);
      currentToOriginal.set(newH, originalH);
    } else {
      // If oldH has not been a new handle before,
      // it means oldH is an original handle.
      finalMap.set(oldH, newH);
      currentToOriginal.set(newH, oldH);
    }
  }

  const out = [];
  out.push(finalMap.size);
  for (const [original, current] of finalMap) {
    out.push(`${original} ${current}`);
  }
  console.log(out.join('\n'));
}

solve();
