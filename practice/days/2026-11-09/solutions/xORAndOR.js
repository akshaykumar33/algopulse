const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 2 || input[0] === '') return;
  const a = input[0];
  const b = input[1];

  if (a.length !== b.length) {
    console.log('NO');
    return;
  }

  let oneA = false;
  for (let i = 0; i < a.length; i++) {
    if (a.charCodeAt(i) === 49) {
      oneA = true;
      break;
    }
  }

  let oneB = false;
  for (let i = 0; i < b.length; i++) {
    if (b.charCodeAt(i) === 49) {
      oneB = true;
      break;
    }
  }

  console.log(oneA === oneB ? 'YES' : 'NO');
}

solve();
