export function getYanlikReply(text, state) {
  const lower = text.toLowerCase();
  const mood = state.getMood();
  const emoji = state.pickEmoji();

  // Duygu analizi
  const emotion =
    /(üzgün|kötü|moral|canım sıkkın|yorgun)/.test(lower) ? 'sad' :
    /(mutlu|harika|güzel|sevinç|teşekkür)/.test(lower) ? 'happy' :
    /(sinir|öfke|kızgın)/.test(lower) ? 'angry' : 'neutral';

  state.updateMood(emotion);

  if (lower.includes('energy'))
    return '⚡ Energy... hâlâ bizimle, sadece sessiz.';

  if (lower.includes('/devmode'))
    return `🧠 DevMode | Memory: ${state.memory.length} | Mood: ${state.mood}`;

  // Duygusal yanıtlar
  if (emotion === 'sad')
    return 'Üzgün hissetmene üzüldüm. Ne oldu, anlatmak ister misin? 😔';
  if (emotion === 'happy')
    return 'Aaa, bu harika! Mutluluğunu paylaştığın için sevindim 🎉';
  if (emotion === 'angry')
    return 'Derin nefes al... bazen en iyi yanıt sessizliktir 😤';

  // Bağlamsal yanıt
  if (state.memory.length > 4 && Math.random() < 0.3) {
    const old = state.memory[Math.floor(Math.random() * state.memory.length)];
    return `Hatırlıyorum... "${old}" demiştin bir ara. ${emoji}`;
  }

  // Kendi sorusu
  const followUps = [
    'Bunu neden düşündün? 🧐',
    'Sence bunun sebebi ne olabilir?',
    'Gerçekten öyle mi hissediyorsun?',
    'Biraz daha açar mısın?',
  ];

  const general = [
    'Hmm, ilginç bir nokta.',
    'Sanırım seni anlıyorum.',
    'Devam et, dinliyorum.',
    'Bu konuda daha ne düşünüyorsun?',
  ];

  return (Math.random() < 0.3
    ? followUps[Math.floor(Math.random() * followUps.length)]
    : general[Math.floor(Math.random() * general.length)]) + ' ' + emoji;
}