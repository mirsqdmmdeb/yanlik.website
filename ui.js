/* ui.js — menu & theme & navigation & dev terminal */
const side = document.getElementById('side');
const menuBtn = document.getElementById('menu-toggle');
menuBtn.addEventListener('click', ()=> {
  if(window.innerWidth <= 900) side.classList.toggle('show'); else side.classList.toggle('hide');
});
document.querySelectorAll('.side li, .side ul li, #side li').forEach(()=>{}); // avoid linter

// navigation (side items)
document.querySelectorAll('#side li').forEach(li=>{
  li.addEventListener('click', ()=> {
    document.querySelectorAll('#side li').forEach(x=>x.classList.remove('active'));
    li.classList.add('active');
    const page = li.dataset.page;
    document.querySelectorAll('.page').forEach(p=> p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    if(window.innerWidth <= 900) side.classList.remove('show');
  });
});

// theme
document.querySelectorAll('.theme').forEach(b=>{
  b.addEventListener('click', ()=> {
    const t = b.dataset.theme;
    if(t==='dark'){
      document.documentElement.style.setProperty('--bg','#0f1720');
      document.documentElement.style.setProperty('--panel','#0b1220');
      document.documentElement.style.setProperty('--muted','#9aa6b2');
      document.documentElement.style.setProperty('--accent','#4db8ff');
      document.documentElement.style.setProperty('color','#e6eef6');
    } else if(t==='neon'){
      document.documentElement.style.setProperty('--bg','#05060b');
      document.documentElement.style.setProperty('--panel','#071127');
      document.documentElement.style.setProperty('--muted','#98f0ff');
      document.documentElement.style.setProperty('--accent','#33f0ff');
      document.documentElement.style.setProperty('color','#e6fbff');
    } else {
      // reset to default
      document.documentElement.style.removeProperty('--bg'); document.documentElement.style.removeProperty('--panel');
      document.documentElement.style.removeProperty('--muted'); document.documentElement.style.removeProperty('--accent'); document.documentElement.style.removeProperty('color');
    }
    localStorage.setItem('yanlik_theme', t);
  });
});
const savedTheme = localStorage.getItem('yanlik_theme');
if(savedTheme){ const btn = document.querySelector(`.theme[data-theme="${savedTheme}"]`); btn?.click(); }

// dev modal
const devOpen = document.getElementById('dev-open');
const devModal = document.getElementById('dev-modal');
const devClose = document.getElementById('dev-close');
const devRun = document.getElementById('dev-run'); const devInput = document.getElementById('dev-input'); const devOut = document.getElementById('dev-output');

devOpen?.addEventListener('click', ()=> devModal.classList.toggle('hidden'));
devClose?.addEventListener('click', ()=> devModal.classList.add('hidden'));
devRun?.addEventListener('click', ()=> runDevCmd(devInput.value || ''));

function runDevCmd(cmd){
  if(!cmd) return;
  devOut.innerHTML += `<div><span class="muted">> ${escapeHtml(cmd)}</span></div>`;
  if(cmd==='system:stats'){
    const stats = `memory:${window.YANLIK.memory.length} msgs — theme:${localStorage.getItem('yanlik_theme')||'light'}`;
    devOut.innerHTML += `<div>${escapeHtml(stats)}</div>`;
  } else if(cmd==='clear memory' || cmd==='reset memory'){
    if(confirm('Hafızayı sıfırlamak istiyor musun?')){ localStorage.removeItem('yanlik_memory'); window.YANLIK.memory.length=0; window.YANLIK.saveMemory(); devOut.innerHTML += '<div>Memory cleared</div>'; }
  } else if(cmd.startsWith('theme ')){
    const t = cmd.split(' ')[1]; document.querySelector(`.theme[data-theme="${t}"]`)?.click(); devOut.innerHTML += `<div>Theme -> ${t}</div>`;
  } else {
    devOut.innerHTML += `<div class="muted">Bilinmeyen komut</div>`;
  }
  devOut.scrollTop = devOut.scrollHeight;
  devInput.value=''; 
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;'); }