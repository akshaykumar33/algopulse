const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split(/\s+/);
let idx = 0;
const nextInt = () => parseInt(input[idx++], 10);


const C = Array.from({ length: 31 }, () => []);
for (let i = 0; i <= 30; i++) {
  C[i][0] = C[i][i] = 1;
  for (let j = 1; j < i; j++) {
    C[i][j] = C[i-1][j-1] + C[i-1][j];
  }
}

const t = nextInt();
const out = [];

for (let i = 0; i < t; i++) {
  const n = nextInt();
  const k = nextInt();
  

  let d = 0;
  let temp = n;
  while (temp > 1) {
    temp >>= 1;
    d++;
  }
  
  let countGood = 0;
  
  for (let L = 1; L <= d; L++) {
    const maxP = Math.min(L, k + 1 - L);
    if (maxP >= 1) {
      
      let sum = 0;
      for (let j = 0; j < maxP; j++) {
        sum += C[L-1][j];
      }
      countGood += sum;
    }
  }
  

  if (k >= d + 1) {
    countGood += 1;
  }
  
  const answer = n - countGood;
  out.push(answer);
}

console.log(out.join('\n'));