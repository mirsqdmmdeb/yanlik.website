export class YanlikState {
  constructor() {
    this.memory = JSON.parse(localStorage.getItem('yanlik_memory') || '[]');
    this.mood = 'calm';
  }

  remember(text) {
    this.memory.push(text);
    if (this.memory.length > 30) this.memory.shift();
    localStorage.setItem('yanlik_memory', JSON.stringify(this.memory));
  }

  resetMemory() {
    this.memory = [];
    localStorage.removeItem('yanlik_memory');
  }

  getMood() {
    return this.mood;
  }

  updateMood(emotion) {
    const transitions = {
      calm: { sad: 'sad', happy: 'playful', angry: 'serious' },
      sad: { happy: 'calm' },
      playful: { sad: 'calm', angry: 'serious' },
      serious: { happy: 'calm' },
    };
    if (transitions[this.mood] && transitions[this.mood][emotion])
      this.mood = transitions[this.mood][emotion];
  }

  pickEmoji() {
    const sets = {
      calm: ['🙂', '😌', '🌿'],
      sad: ['😔', '🥀', '💧'],
      happy: ['😄', '🎉', '🌞'],
      playful: ['😏', '😜', '🎭'],
      serious: ['🧠', '🤨', '💬'],
    };
    const list = sets[this.mood] || ['😎'];
    return list[Math.floor(Math.random() * list.length)];
  }
}