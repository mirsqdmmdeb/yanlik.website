const overlay = document.getElementById('overlay-404');
const closeBtn = document.getElementById('overlay-close');

document.addEventListener('visibilitychange', ()=>{
  if(document.hidden){
    overlay.classList.remove('hidden');
    document.title = '💬 Yanlik seni arıyor...';
  } else {
    setTimeout(()=>overlay.classList.add('hidden'),400);
    document.title = 'Yanlik 2.1 (Leopar)';
  }
});

closeBtn.onclick = ()=> overlay.classList.add('hidden');