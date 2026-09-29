const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().split(' ').map(Number);
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const T = readInt(); 
  for (let t = 0; t < T; t++) {
    let [s , k, m]= readIntArray(); 
    
   const n = Math.floor(m / k);
  let rem;
  
  if (n === 0) {
    rem = s;
  } else {
    if (k >= s) {
      rem = s;
    } else {
      rem = (n % 2 === 0) ? s : k;
    }
  }
  
  const elapsed = m - n * k;
  let ans;
  if (elapsed >= rem) {
    ans = 0;
  } else {
    ans = rem - elapsed;
  }
  print(ans)
  }
}

solve();
printAll();