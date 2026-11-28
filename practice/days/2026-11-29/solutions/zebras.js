const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
let inputIndex = 0;

const readLine = () => input[inputIndex++];
const readInt = () => parseInt(readLine(), 10);
const readIntArray = () => readLine().trim().split(/\s+/).map(Number);

const output = [];
const print = (val) => output.push(val);
const printAll = () => console.log(output.join('\n'));

function solve() {
  const s = readLine().trim();
  const seqs = [];
  const end0 = [], end1 = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "0") {
      let id;
      if (end1.length) id = end1.pop();
      else { id = seqs.length; seqs.push([]); }
      seqs[id].push(i + 1);
      end0.push(id);
    } else {
      if (!end0.length) { print(-1); return; }
      const id = end0.pop();
      seqs[id].push(i + 1);
      end1.push(id);
    }
  }
  if (end1.length) { print(-1); return; }
  print(seqs.length);
  for (const v of seqs) print(v.length + " " + v.join(" "));
}

solve();
printAll();
