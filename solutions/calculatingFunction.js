const fs = require('fs');
const raw = fs.readFileSync(0, 'utf-8').trim();
if (!raw) process.exit(0);

const n = BigInt(raw.split(/\s+/)[0]);
if (n % 2n === 0n) {
  console.log((n / 2n).toString());
} else {
  console.log((-(n + 1n) / 2n).toString());
}
