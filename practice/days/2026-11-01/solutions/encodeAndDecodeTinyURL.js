var encode = function(longUrl) {
    return longUrl;
};

var decode = function(shortUrl) {
    return shortUrl;
};

var solve = function(url) {
    return decode(encode(url));
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
          console.log(JSON.stringify(solve(parsed)));
        } catch (_) {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
