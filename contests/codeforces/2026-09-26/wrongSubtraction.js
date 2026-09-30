const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;


const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);
const readStringArray = () => readLine().trim().split(/\s+/);
const readBigInt = () => BigInt(readLine().trim());
const readBigIntArray = () => readLine().trim().split(/\s+/).map(BigInt);


const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));




function solve() {
 
  let [n,k] = readIntArray();

  for(let i=0;i<k;i++){
    if(n%10==0){
      n/=10;
    }
    else{
      n--;
    }
  }
  print(n);
}


solve();
printAll();

