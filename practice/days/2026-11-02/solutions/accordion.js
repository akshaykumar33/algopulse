const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8');
  const tokens = input.trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;

  const s = tokens[0];
  const n = s.length;

  let leftBracket = -1;
  for (let i = 0; i < n; i++) {
    if (s[i] === '[') {
      leftBracket = i;
      break;
    }
  }

  let leftColon = -1;
  if (leftBracket !== -1) {
    for (let i = leftBracket + 1; i < n; i++) {
      if (s[i] === ':') {
        leftColon = i;
        break;
      }
    }
  }

  let rightBracket = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === ']') {
      rightBracket = i;
      break;
    }
  }

  let rightColon = -1;
  if (rightBracket !== -1) {
    for (let i = rightBracket - 1; i >= 0; i--) {
      if (s[i] === ':') {
        rightColon = i;
        break;
      }
    }
  }

  if (leftColon === -1 || rightColon === -1 || leftColon >= rightColon) {
    console.log(-1);
    return;
  }

  let pipes = 0;
  for (let i = leftColon + 1; i < rightColon; i++) {
    if (s[i] === '|') pipes++;
  }

  console.log(4 + pipes);
}

solve();

