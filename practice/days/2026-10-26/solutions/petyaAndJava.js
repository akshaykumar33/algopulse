const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    
    let s = input;
    let n;
    try {
        n = BigInt(s);
    } catch (e) {
        console.log("BigInteger");
        return;
    }
    
    const b127 = 127n;
    const b32767 = 32767n;
    const b2147483647 = 2147483647n;
    const b9223372036854775807n = 9223372036854775807n;
    
    if (n >= -128n && n <= b127) {
        console.log("byte");
    } else if (n >= -32768n && n <= b32767) {
        console.log("short");
    } else if (n >= -2147483648n && n <= b2147483647) {
        console.log("int");
    } else if (n >= -9223372036854775808n && n <= b9223372036854775807n) {
        console.log("long");
    } else {
        console.log("BigInteger");
    }
}

solve();
