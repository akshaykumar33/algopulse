var findAllPossibleRecipesFromGivenSupplies = function(recipes, ingredients, supplies) {
    const sup = new Set(supplies);
    const adj = new Map();
    const inDegree = new Map();
    const recSet = new Set(recipes);
    
    for (let i = 0; i < recipes.length; i++) {
        const r = recipes[i];
        inDegree.set(r, 0);
        for (const ing of ingredients[i]) {
            if (!sup.has(ing)) {
                if (!adj.has(ing)) adj.set(ing, []);
                adj.get(ing).push(r);
                inDegree.set(r, inDegree.get(r) + 1);
            }
        }
    }
    
    const q = [];
    for (const [r, deg] of inDegree.entries()) {
        if (deg === 0) q.push(r);
    }
    
    const ans = [];
    const made = new Set();
    
    while (q.length > 0) {
        const cur = q.shift();
        if (recSet.has(cur)) {
            ans.push(cur);
            made.add(cur);
        }
        
        if (adj.has(cur)) {
            for (const nxt of adj.get(cur)) {
                inDegree.set(nxt, inDegree.get(nxt) - 1);
                if (inDegree.get(nxt) === 0) {
                    q.push(nxt);
                }
            }
        }
    }
    
    return ans;
};

var solve = typeof findAllPossibleRecipesFromGivenSupplies !== 'undefined' ? findAllPossibleRecipesFromGivenSupplies : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      let recipes, ingredients, supplies;
      for (let i = 0; i < lines.length; i += 3) {
        recipes = JSON.parse(lines[i]);
        ingredients = JSON.parse(lines[i+1]);
        supplies = JSON.parse(lines[i+2]);
        const result = solve(recipes, ingredients, supplies);
        console.log(JSON.stringify(result));
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
