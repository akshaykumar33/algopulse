const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = Number(input[ptr++]);
  const m = Number(input[ptr++]);
  const chefToCountry = new Map();
  for (let i = 0; i < n; i++) {
    const chef = input[ptr++];
    const country = input[ptr++];
    chefToCountry.set(chef, country);
  }
  const chefVotes = new Map();
  const countryVotes = new Map();
  for (let j = 0; j < m; j++) {
    const chef = input[ptr++];
    const country = chefToCountry.get(chef);
    chefVotes.set(chef, (chefVotes.get(chef) || 0) + 1);
    countryVotes.set(country, (countryVotes.get(country) || 0) + 1);
  }
  let winCountry = '';
  let maxCVotes = -1;
  for (const [country, votes] of countryVotes.entries()) {
    if (votes > maxCVotes || (votes === maxCVotes && (winCountry === '' || country < winCountry))) {
      winCountry = country;
      maxCVotes = votes;
    }
  }
  let winChef = '';
  let maxVotes = -1;
  for (const [chef, votes] of chefVotes.entries()) {
    if (votes > maxVotes || (votes === maxVotes && (winChef === '' || chef < winChef))) {
      winChef = chef;
      maxVotes = votes;
    }
  }
  console.log(winCountry + '\n' + winChef);
}

function main() {}

solve();
