var breakPalindrome = function(palindrome) {
  if (palindrome.length <= 1) return '';
  const arr = palindrome.split('');
  const half = Math.floor(arr.length / 2);

  for (let i = 0; i < half; i++) {
    if (arr[i] !== 'a') {
      arr[i] = 'a';
      return arr.join('');
    }
  }

  arr[arr.length - 1] = 'b';
  return arr.join('');
};

var solve = breakPalindrome;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log(JSON.stringify(solve(...parsed)));
      } else {
        console.log(JSON.stringify(solve(parsed)));
      }
    }
  } catch (e) {}
}
