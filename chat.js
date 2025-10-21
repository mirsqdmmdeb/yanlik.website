const chatWin = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
let memory = [];

function appendMsg(role, text) {
  const p = document.createElement("p");
  p.className = `msg ${role}`;
  p.textContent = text;
  chatWin.appendChild(p);
  chatWin.scrollTop = chatWin.scrollHeight;
}

function botResponse(text) {
  const t = text.toLowerCase();
  if (t.includes("energy")) return "😿 Energy... Onu kimse unutmuyor...";
  if (t.includes("merhaba")) return "Selam! Nasılsın?";
  if (t.includes("oyun")) return "🎮 Oyun sekmesine bak!";
  if (t.includes("hava")) return "☀️ Güzel bir gün, değil mi?";
  return ["Hmm...","İlginç dedin.","Devam et."][Math.floor(Math.random()*3)];
}

function sendMsg() {
  const txt = userInput.value.trim();
  if (!txt) return;
  appendMsg("user", txt);
  userInput.value = "";
  const botThinking = document.createElement("p");
  botThinking.className = "msg bot";
  botThinking.textContent = "Yazıyor...";
  chatWin.appendChild(botThinking);
  setTimeout(() => {
    botThinking.remove();
    appendMsg("bot", botResponse(txt));
  }, 5000);
}

sendBtn.addEventListener("click", sendMsg);
userInput.addEventListener("keydown", (e) => e.key === "Enter" && sendMsg());

appendMsg("bot", "Merhaba! Ben Yanlik 2.1 (Leopar) 🦁");