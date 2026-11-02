const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  const n = parseInt(tokens[0], 10);
  let c3 = Math.floor(n / 3);
  let c2 = Math.floor((n % 3) / 2);
  let c1 = n % 3 % 2;
  let ans = 0;
  while (c3 > 0 || c2 > 0 || c1 > 0) {
    ans++;
    let rem = 3;
    if (c3 > 0) {
      c3--;
      rem -= 3;
    } else if (c2 > 0) {
      c2--;
      rem -= 2;
    } else if (c1 > 0) {
      c1--;
      rem -= 1;
    }
    while (true) {
      if (rem >= 3 && c3 > 0) {
        c3--;
        rem -= 3;
      } else if (rem >= 2 && c2 > 0) {
        c2--;
        rem -= 2;
      } else if (rem >= 1 && c1 > 0) {
        c1--;
        rem -= 1;
      } else {
        break;
      }
    }
  }
  console.log(ans);
}
solve();
