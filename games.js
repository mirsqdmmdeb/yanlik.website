document.getElementById("roll-dice").onclick = () => {
  const n = Math.floor(Math.random() * 6) + 1;
  document.getElementById("game-result").textContent = `🎲 Zar: ${n}`;
};
document.getElementById("tkm").onclick = () => {
  const choices = ["Taş", "Kağıt", "Makas"];
  const cpu = choices[Math.floor(Math.random() * 3)];
  document.getElementById("game-result").textContent = `🤖 Bot: ${cpu}`;
};
document.getElementById("quiz").onclick = () => {
  const q = prompt("Türkiye'nin başkenti neresidir?");
  if (q && q.toLowerCase().includes("ankara"))
    alert("✅ Doğru!");
  else alert("❌ Yanlış! Cevap Ankara.");
};