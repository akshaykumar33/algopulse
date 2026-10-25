class Solution {
  findMaximumPairs(s) {
    let pairs = 0;
    let i = 0;
    while (i < s.length - 1) {
      if ((s[i] === 'x' && s[i + 1] === 'y') || (s[i] === 'y' && s[i + 1] === 'x')) {
        pairs++;
        i += 2;
      } else {
        i++;
      }
    }
    return pairs;
  }
}
