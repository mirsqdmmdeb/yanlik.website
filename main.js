/* main.js — chat core + games + memory */
const input = document.getElementById('input');
const send = document.getElementById('send');
const chatBox = document.getElementById('chat-box');
const memoryListEl = document.getElementById('memory-list');
const exportBtn = document.getElementById('export-json');

let memory = JSON.parse(localStorage.getItem('yanlik_memory')) || [];
let cfg = {
  delay: parseInt(localStorage.getItem('yanlik_delay')) || 5,
  autoMins: parseInt(localStorage.getItem('yanlik_auto')) || 10,
  typewrite: JSON.parse(localStorage.getItem('yanlik_type') || 'true'),
  sound: JSON.parse(localStorage.getItem('yanlik_sound') || 'false'),
  serverMode: JSON.parse(localStorage.getItem('yanlik_server') || 'false')
};

// helpers
function saveMemory(){ localStorage.setItem('yanlik_memory', JSON.stringify(memory)); renderMemory(); }
function append(role, text, {typewrite=false}={}){
  const el = document.createElement('div'); el.className = 'msg ' + (role==='user'?'user':'bot');
  if(typewrite && cfg.typewrite){ el.textContent=''; chatBox.appendChild(el); typeWriter(el,text); }
  else { el.textContent = text; chatBox.appendChild(el); }
  chatBox.scrollTop = chatBox.scrollHeight;
  memory.push({role,text,t:Date.now()});
  if(memory.length>1000) memory.shift();
  saveMemory();
}
function typeWriter(el, text){
  let i=0; const speed = 16;
  function step(){ i++; el.textContent = text.slice(0,i); chatBox.scrollTop = chatBox.scrollHeight; if(i<text.length) setTimeout(step, speed + Math.random()*10); }
  setTimeout(step, 120);
}

// initial restore
(function restore(){
  if(memory.length===0){
    setTimeout(()=> append('bot','Merhaba! Ben Yanlik 2.1 (Leopar) — konuşmaya başla.', {typewrite:true}), 500);
  } else {
    memory.slice(-80).forEach(m => {
      const el = document.createElement('div'); el.className='msg '+m.role; el.textContent = m.text; chatBox.appendChild(el);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
    renderMemory();
  }
})();

// bot simple logic
const EMO = ["😎","🤔","🧠","💫","🎯","😏","💭","⚡️"];
function botReplyFor(text){
  const t = text.toLowerCase();
  if(t.includes('/help')) return "Komutlar: /energy, /tkm, /zar, /quiz, /rapor";
  if(t.includes('energy')) return "⚡️ Energy... Bu kelime bir kapı aralıyor. Sessiz kalıp dinlersem daha fazla hatırlıyorum.";
  if(t.includes('merhaba')||t.includes('selam')) return "Selam! Neler konuşalım?";
  if(t.includes('nasılsın')) return "İyiyim, teşekkürler — sen nasılsın?";
  if(t.includes('kahve')) return "Kahve güzel — ben filtre severim ☕";
  if(memory.length>6 && Math.random()<0.3){
    const picks = memory.filter(m=>m.role==='user').map(m=>m.text).slice(-10);
    if(picks.length) return `Geçen demiştin ki: "${picks[Math.floor(Math.random()*picks.length)]}" ` + EMO[Math.floor(Math.random()*EMO.length)];
  }
  return ["Bunu biraz açar mısın?","İlginç!","Devam et, dinliyorum."][Math.floor(Math.random()*3)] + ' ' + EMO[Math.floor(Math.random()*EMO.length)];
}

// send flow
function sendMessage(){
  const txt = input.value.trim(); if(!txt) return;
  append('user', txt);
  input.value='';
  const thinking = document.createElement('div'); thinking.className='msg bot'; thinking.textContent='Yanlik yazıyor...'; thinking.style.fontStyle='italic';
  chatBox.appendChild(thinking); chatBox.scrollTop = chatBox.scrollHeight;
  const delay = Math.min(15000, cfg.delay*1000 + Math.min(3000, txt.length*12));
  setTimeout(()=> {
    thinking.remove();
    // commands
    if(txt.startsWith('/tkm')) { handleTKM(txt); return; }
    if(txt.startsWith('/zar')) { append('bot','🎲 '+(Math.floor(Math.random()*6)+1)); return; }
    if(txt.startsWith('/rapor')) { append('bot', generateReport()); return; }
    if(txt.startsWith('/quiz')) { startQuiz(); return; }
    // normal
    if(cfg.serverMode){
      fetch('/api/message',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:txt})})
        .then(r=>r.json()).then(j=> append('bot', j.reply, {typewrite:true})).catch(e=> append('bot', botReplyFor(txt), {typewrite:true}));
    } else {
      append('bot', botReplyFor(txt), {typewrite:true});
    }
    if(cfg.sound) playPop();
  }, delay);
}
send.addEventListener('click', sendMessage);
input.addEventListener('keydown', e=> { if(e.key==='Enter') sendMessage(); });

// memory render
function renderMemory(){
  if(!memoryListEl) return;
  memoryListEl.innerHTML = '';
  memory.slice().reverse().slice(0,80).forEach(m=>{
    const d = new Date(m.t); const line = document.createElement('div'); line.className='small'; line.innerHTML = `<strong>${m.role}</strong>: ${escapeHtml(m.text)} <span class="muted">(${d.toLocaleString()})</span>`;
    memoryListEl.appendChild(line);
  });
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

// simple games
document.getElementById('dice').addEventListener('click', ()=> append('bot','🎲 '+(Math.floor(Math.random()*6)+1)));
document.getElementById('tkm').addEventListener('click', ()=> {
  const p = prompt('Taş, Kağıt veya Makas?')||'';
  if(!p) return;
  handleTKM('/tkm '+p);
});
document.getElementById('quiz').addEventListener('click', ()=> startQuiz());

function handleTKM(txt){
  const parts = txt.split(/\s+/); let user = parts[1] ? parts[1].toLowerCase() : prompt('Taş/Kağıt/Makas')?.toLowerCase();
  if(!user){ append('bot','Oyun iptal edildi.'); return; }
  const arr=['taş','kağıt','makas']; if(!arr.includes(user)) { append('bot','Geçersiz seçim.'); return; }
  const cpu = arr[Math.floor(Math.random()*3)]; let res='Berabere';
  if((user==='taş'&&cpu==='makas')||(user==='makas'&&cpu==='kağıt')||(user==='kağıt'&&cpu==='taş')) res='Kazandın 🎉'; else if(user!==cpu) res='Kaybettin 😅';
  append('bot', `Sen: ${user} — Bot: ${cpu} → ${res}`);
}

// quiz
let quizActive=false, quizIndex=0;
const quizBank=[{q:"Türkiye'nin başkenti neresidir?",a:"ankara"},{q:"Dünya'nın uydusu nedir?",a:"ay"},{q:"HTML açılımı nedir?",a:"hypertext"}];
function startQuiz(){ quizActive=true; quizIndex=0; append('bot','Quiz başlıyor — cevap yaz.', {typewrite:true}); setTimeout(askQ,700); }
function askQ(){ if(quizIndex>=quizBank.length){ append('bot','Quiz bitti!'); quizActive=false; return; } append('bot', 'Soru: '+quizBank[quizIndex].q, {typewrite:true}); }
function handleQuizAnswer(txt){ if(!quizActive) return; const c=quizBank[quizIndex].a; if(txt.toLowerCase().includes(c)) append('bot','Doğru! ✅'); else append('bot','Yanlış. Doğru: '+c); quizIndex++; if(quizIndex<quizBank.length) setTimeout(askQ,700); else { quizActive=false; append('bot','Quiz tamam!'); } }

// capture user messages for quiz
(function hook(){
  const origAppend = append;
  window.append = function(role, text, opts){ origAppend(role,text,opts); if(role==='user' && quizActive) handleQuizAnswer(text); }
})();

// report
function generateReport(){
  const msgs = memory.length; const u = memory.filter(m=>m.role==='user').length; const b = memory.filter(m=>m.role==='bot').length;
  const words={}; memory.forEach(m=> (m.text||'').split(/\s+/).forEach(w=>{ w=w.toLowerCase().replace(/\W/g,''); if(w.length>3) words[w]=(words[w]||0)+1; }));
  const top = Object.entries(words).sort((a,b)=>b[1]-a[1])[0]?.[0] || '—';
  return `Rapor: toplam ${msgs} mesaj (Sen ${u}, Yanlik ${b}). En sık kelime: "${top}"`;
}

// export memory
exportBtn?.addEventListener('click', ()=> {
  const blob = new Blob([JSON.stringify(memory, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'yanlik_memory.json'; a.click();
});

// auto messages
let autoTimer = null;
function restartAuto(){
  if(autoTimer) clearInterval(autoTimer);
  if(cfg.autoMins && cfg.autoMins>0) autoTimer = setInterval(()=> { append('bot',['Kısa bir düşünce istersin?','Yeni bir fikir üretelim!'][Math.floor(Math.random()*2)], {typewrite:true}); }, cfg.autoMins*60*1000);
}
restartAuto();

// sound
function playPop(){ try{ const ctx = new (window.AudioContext||window.webkitAudioContext)(); const o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine'; o.frequency.value=600; g.gain.value=0.02; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+0.06); }catch(e){} }

// unixlike: expose config update
window.YANLIK_UPDATE = function(o){ cfg = {...cfg, ...o}; localStorage.setItem('yanlik_delay', cfg.delay); localStorage.setItem('yanlik_auto', cfg.autoMins); localStorage.setItem('yanlik_type', cfg.typewrite); localStorage.setItem('yanlik_sound', cfg.sound); localStorage.setItem('yanlik_server', cfg.serverMode); restartAuto(); };

// keyboard quick send (↑ edit last not implemented to keep simple)
document.addEventListener('keydown', e=> {
  if(e.key==='Enter' && document.activeElement === input) sendMessage();
});

// expose for other modules
window.YANLIK = { append, memory, cfg, saveMemory, generateReport };