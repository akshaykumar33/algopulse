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
            
            let possible = true;
            for (let i = 0; i < n - 1; i++) {
                if ((arr[i] % 2) === (arr[i + 1] % 2)) {
                    possible = false;
                    break;
                }
            }
            
            results.push(possible ? "YES" : "NO");
        }
        
        console.log(results.join('\n'));
    });
}

solve();
