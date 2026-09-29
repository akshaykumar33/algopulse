function solve() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let input = [];
    rl.on('line', (line) => {
        input.push(line);
    });
    
    rl.on('close', () => {
        let t = parseInt(input[0]);
        let index = 1;
        let results = [];
        
        for (let test = 0; test < t; test++) {
            let n = parseInt(input[index++]);
            let arr = input[index++].split(' ').map(Number);
            
            let count0 = arr.filter(x => x === 0).length;
            let has1 = arr.includes(1);
            
            if (count0 > 1 && !has1) {
                results.push("NO");
            } else {
                results.push("YES");
            }
        }
        
        console.log(results.join('\n'));
    });
}

solve();