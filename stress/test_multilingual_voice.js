const agent = require('../src/ai/agent');

async function testMultilingual() {
  const testInputs = [
    { name: 'Hindi (Devanagari)', text: 'अगला प्रॉब्लम खोलो और कोड सबमिट करो' },
    { name: 'Hinglish (Romanized Hindi)', text: 'bhai agla problem dikhao aur test run karo' },
    { name: 'Kannada', text: 'ಮುಂದಿನ ಪ್ರಾಬ್ಲಮ್ ಓಪನ್ ಮಾಡಿ' },
    { name: 'Spanish', text: 'abre el siguiente problema por favor' },
    { name: 'Japanese', text: '次の問題を開いてください' },
    { name: 'English', text: 'open the next problem and run tests' }
  ];

  const ctx = {
    date: '2026-10-05',
    today: '2026-10-05',
    file: 'nextLevel.js',
    tab: 'story',
    problems: [
      { file: 'nextLevel.js', id: 'NEXTLEVEL', name: 'Next Level', rating: '800', done: true },
      { file: 'skipOneDay.js', id: 'SKIPONEDAY', name: 'Skip One Day', rating: '900', done: true }
    ],
    history: []
  };

  console.log('=== MULTILINGUAL AGENT & SPEED BENCHMARK ===\n');

  for (const item of testInputs) {
    const start = performance.now();
    try {
      const plan = await agent.plan({ text: item.text }, ctx);
      const duration = performance.now() - start;
      console.log(`[${item.name}] "${item.text}"`);
      console.log(`  ⏱️ Speed: ${duration.toFixed(2)} ms`);
      console.log(`  🗣️ Reply: "${plan.reply}"`);
      console.log(`  🌐 Lang: "${plan.lang}"`);
      console.log(`  😊 Mood: "${plan.mood}"`);
      console.log(`  ⚙️ Steps: ${JSON.stringify(plan.steps)}\n`);
    } catch (err) {
      console.error(`[${item.name}] ERROR:`, err.message, '\n');
    }
  }
}

testMultilingual();
