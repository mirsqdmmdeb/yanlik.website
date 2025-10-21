const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('user-input');
const memory = [];
const emojis = ["😎","🤔","🧠","💫","🎯","😏","💭"];

function botReply(msg){
  let text = msg.toLowerCase();
  if(text.includes("energy")) return "😿 Ah... Energy... Unutmadım onu 💔";
  if(text.includes("merhaba")) return "Selam! Nasılsın? 😄";
  if(text.includes("nasılsın")) return "İyiyim, sen nasılsın? 🤖";
  if(memory.length>5) return "Bana daha önce '"+memory[Math.floor(Math.random()*memory.length)]+"' demiştin 😏";
  return ["Hmm...","İlginç...","Devam et anlat 🎧"][Math.floor(Math.random()*3)];
}

sendBtn.onclick = ()=>{
  const text = input.value.trim();
  if(!text) return;
  const userMsg = document.createElement('p');
  userMsg.className='user-msg'; userMsg.textContent=text;
  chatBox.appendChild(userMsg); input.value=''; chatBox.scrollTo({top:chatBox.scrollHeight,behavior:'smooth'});
  memory.push(text);
  const botMsg = document.createElement('p'); botMsg.className='bot-msg'; botMsg.textContent="Yanlik yazıyor...";
  chatBox.appendChild(botMsg);
  setTimeout(()=>{botMsg.textContent=botReply(text)+" "+emojis[Math.floor(Math.random()*emojis.length)];
  chatBox.scrollTo({top:chatBox.scrollHeight,behavior:'smooth'});},1000+Math.random()*1000);
};

// 10 dk sonra otomatik tepki
setInterval(()=>{
  const msg = document.createElement('p');
  msg.className='bot-msg'; msg.textContent="Hâlâ buradaysan, sessizliği sevdim. 🧘";
  chatBox.appendChild(msg);
},600000);