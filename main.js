import { getYanlikReply } from './dialogue.js';
import { YanlikState } from './state.js';

const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const yanlik = new YanlikState();

function append(sender, text, typewrite = true) {
  const p = document.createElement('p');
  p.className = sender === 'bot' ? 'bot-msg' : 'user-msg';
  p.textContent = '';
  chatBox.appendChild(p);

  let i = 0;
  const interval = setInterval(() => {
    p.textContent = text.slice(0, i++);
    if (i > text.length) clearInterval(interval);
  }, typewrite ? 25 : 0);

  chatBox.scrollTo({ top: chatBox.scrollHeight, behavior: 'smooth' });
}

window.sendMessage = function () {
  const text = input.value.trim();
  if (!text) return;
  append('user', text);
  yanlik.remember(text);
  input.value = '';

  setTimeout(() => {
    const reply = getYanlikReply(text, yanlik);
    append('bot', reply);
  }, 1000 + Math.random() * 1000);
};

window.clearChat = function () {
  chatBox.innerHTML = '';
  yanlik.resetMemory();
  append('bot', '🧹 Yeni bir başlangıç! Sohbet temizlendi.');
};

// İlk mesaj
append('bot', 'Merhaba! Ben Yanlik 2.1 (Leopar). Sohbete hazır mısın? 🐆');