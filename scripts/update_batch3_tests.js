const fs = require('fs');
const path = require('path');

const batch3Updates = [
  {
    file: 'kolyaAndMovieTheatre',
    tests: [
      {
        input: '1\n5 2 2\n2 3 2 5 4\n',
        output: '1\n'
      },
      {
        input: '1\n6 4 3\n2 1 1 1 1 1\n',
        output: '0\n'
      }
    ]
  },
  {
    file: 'findMaximum',
    tests: [
      {
        input: '5\n17 0 10 2 1\n11010\n',
        output: '27\n'
      }
    ]
  },
  {
    file: 'sequenceAndSwaps',
    tests: [
      {
        input: '6\n5 1\n0 2 3 5 4\n4 2\n2 2 8 9\n3 3\n5 2 9\n4 1\n1 2 3 4\n1 5\n5\n5 5\n1 2 3 4 5\n',
        output: '3\n0\n-1\n0\n0\n0\n'
      }
    ]
  },
  {
    file: 'moderateModularMode',
    tests: [
      {
        input: '4\n4 2\n2 4\n6 6\n10 42\n',
        output: '6\n4\n6\n41\n'
      }
    ]
  }
];

const dayTestsDir = path.resolve(__dirname, '..', 'practice', 'days', '2026-11-24', 'tests');
for (const p of batch3Updates) {
  fs.writeFileSync(path.join(dayTestsDir, p.file + '.json'), JSON.stringify(p.tests, null, 2), 'utf8');
  console.log('✓ Updated tests for', p.file);
}
