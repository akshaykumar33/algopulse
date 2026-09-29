const fs = require('fs');
const input = fs.readFileSync(0).toString().trim().split('\n');
let inputIndex = 0;

// Fast input functions
const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().split(' ').map(Number);
const readStringArray = () => readLine().split(' ').map();
const readBigInt = () => BigInt(readLine());
const readBigIntArray = () => readLine().split(' ').map(BigInt);

// Fast output
const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

// Main function
function solve() {
  const T = readInt(); 
  
  for (let t = 0; t < T; t++) {
    const n = readInt();
    const arr = readIntArray(); 
    
    
    const minVal = Math.min(...arr);
    
 
    let secondTerm = Infinity;
    
   
    for (let i = 0; i < n; i++) {
      if (arr[i] > minVal) {
        const diff = arr[i] - minVal;
        
        
        let largestDivisor = 0;
        
        
        for (let d = 1; d * d <= diff; d++) {
          if (diff % d === 0) {
            
            if (d > minVal) {
              largestDivisor = Math.max(largestDivisor, d);
            }
            
            const pairedDivisor = diff / d;
            if (pairedDivisor > minVal) {
              largestDivisor = Math.max(largestDivisor, pairedDivisor);
            }
          }
        }
        
        
        secondTerm = Math.min(secondTerm, largestDivisor);
      }
    }
    
   
    if (secondTerm === Infinity) {
      secondTerm = 0;
    }
    
  
    const ans = Math.max(minVal, secondTerm);
    print(ans);
  }
}

// Execute and output
solve();
printAll();