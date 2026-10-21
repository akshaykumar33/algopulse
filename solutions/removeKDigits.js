var removeKdigits = function(num, k) {
    let st = [];
    for (let i = 0; i < num.length; i++) {
        let c = num[i];
        while (k > 0 && st.length > 0 && st[st.length - 1] > c) {
            st.pop();
            k--;
        }
        st.push(c);
    }
    while (k > 0) {
        st.pop();
        k--;
    }
    let ans = st.join('').replace(/^0+/, '');
    return ans === '' ? '0' : ans;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && removeKdigits.length > 1 ? removeKdigits(...parsed) : removeKdigits(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(removeKdigits(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = removeKdigits;
