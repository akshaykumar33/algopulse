var suggestedProducts = function(products, searchWord) {
    products.sort();
    let res = [];
    let cur = "";
    for (let i = 0; i < searchWord.length; i++) {
        cur += searchWord[i];
        let list = [];
        for (let j = 0; j < products.length; j++) {
            if (products[j].startsWith(cur)) {
                list.push(products[j]);
                if (list.length === 3) break;
            }
        }
        res.push(list);
    }
    return res;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const products = JSON.parse(lines[i]);
        const searchWord = JSON.parse(lines[i+1]);
        const result = suggestedProducts(products, searchWord);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = suggestedProducts;
