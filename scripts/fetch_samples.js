const https = require('https');
const fs = require('fs');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseSamples(html) {
  const samples = [];
  const inRe = /<div class="input"><div class="title">Input<\/div><pre>([\s\S]*?)<\/pre><\/div>/g;
  const outRe = /<div class="output"><div class="title">Output<\/div><pre>([\s\S]*?)<\/pre><\/div>/g;
  let mIn, mOut;
  while ((mIn = inRe.exec(html)) && (mOut = outRe.exec(html))) {
    const clean = s => s.replace(/<div class="test-example-line[^"]*">/gi, '')
                        .replace(/<\/div>/gi, '\n')
                        .replace(/<br\s*\/?>/gi, '\n')
                        .replace(/<[^>]+>/g, '')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&amp;/g, '&')
                        .trim();
    samples.push({ input: clean(mIn[1]) + '\n', output: clean(mOut[1]) + '\n' });
  }
  return samples;
}

async function main() {
  const problems = [
    { id: '317A', contest: 317, index: 'A', file: 'perfectPair' },
    { id: '659E', contest: 659, index: 'E', file: 'newReform' },
    { id: '1862E', contest: 1862, index: 'E', file: 'kolyaAndMovieTheatre' },
    { id: '353C', contest: 353, index: 'C', file: 'findMaximum' },
    { id: '1455D', contest: 1455, index: 'D', file: 'sequenceAndSwaps' },
    { id: '1017C', contest: 1017, index: 'C', file: 'thePhoneNumber' },
    { id: '2061C', contest: 2061, index: 'C', file: 'kevinAndPuzzle' },
    { id: '678C', contest: 678, index: 'C', file: 'jotyAndChocolate' },
    { id: '1603B', contest: 1603, index: 'B', file: 'moderateModularMode' },
    { id: '1077D', contest: 1077, index: 'D', file: 'cuttingOut' },
    { id: '2034D', contest: 2034, index: 'D', file: 'dariusWisdom' }
  ];

  const results = {};
  for (const p of problems) {
    const url = `https://codeforces.com/problemset/problem/${p.contest}/${p.index}`;
    try {
      const html = await get(url);
      const samples = parseSamples(html);
      results[p.file] = samples;
      console.log(`✓ Fetched ${p.file} (${p.id}): ${samples.length} sample(s)`);
    } catch (e) {
      console.error(`✗ Error ${p.file}: ${e.message}`);
    }
  }
  fs.writeFileSync('scripts/cf_batch3_samples.json', JSON.stringify(results, null, 2), 'utf8');
}

main();
