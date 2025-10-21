/* energy.js — easter egg and overlay 404 */
const energyBtn = document.getElementById('energy-btn');
const energyOut = document.getElementById('energy-out');
const overlay = document.getElementById('overlay');
const overlayClose = document.getElementById('overlay-close');

energyBtn?.addEventListener('click', ()=> {
  energyOut.innerHTML = '<div class="small muted">Energy protokolü uyarlandı... bekleyin.</div>';
  setTimeout(()=> {
    energyOut.innerHTML = `<div class="card"><strong>Energy</strong> — Bir anıda saklı: "Sessizlik en yüksek sestir."</div>`;
    // theme pulse
    document.documentElement.animate([{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(20deg)'},{filter:'hue-rotate(0deg)'}], {duration:900, iterations:1});
  },900);
});

// overlay visibility on blur
document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    overlay.classList.remove('hidden');
    document.title = '💬 Yanlik seni bekliyor...';
  } else {
    setTimeout(()=> overlay.classList.add('hidden'), 400);
    document.title = 'Yanlik 2.1 (Leopar)';
  }
});
overlayClose?.addEventListener('click', ()=> overlay.classList.add('hidden'));

// also listen for "energy" typed in chat (main app appends messages and will call botReplyFor)