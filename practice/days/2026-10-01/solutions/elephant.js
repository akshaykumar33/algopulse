const fs = require('fs');

function main() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const x = parseInt(input, 10);
  console.log(Math.ceil(x / 5));
}

main();
