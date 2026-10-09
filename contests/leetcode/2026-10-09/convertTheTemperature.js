var convertTemperature = function(celsius) {
    return [celsius + 273.15, celsius * 1.80 + 32.00];
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
          const result = Array.isArray(parsed) && convertTemperature.length > 1 ? convertTemperature(...parsed) : convertTemperature(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(convertTemperature(Number(line))));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = convertTemperature;
