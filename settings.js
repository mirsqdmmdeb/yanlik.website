/* settings.js — connects settings UI to main config */
const delayRange = document.getElementById('delay-range');
const delayVal = document.getElementById('delay-val');
const autoMins = document.getElementById('auto-mins');
const optType = document.getElementById('opt-type');
const optSound = document.getElementById('opt-sound');
const optServer = document.getElementById('opt-server');
const saveBtn = document.getElementById('save-settings');
const resetBtn = document.getElementById('reset-memory');

const cfgLocal = window.YANLIK?.cfg || {};
delayRange.value = cfgLocal.delay || 5; delayVal.textContent = delayRange.value;
autoMins.value = cfgLocal.autoMins || 10;
optType.checked = cfgLocal.typewrite; optSound.checked = cfgLocal.sound; optServer.checked = cfgLocal.serverMode;

delayRange.addEventListener('input', ()=> { delayVal.textContent = delayRange.value; });
saveBtn.addEventListener('click', ()=> {
  const newCfg = { delay: parseInt(delayRange.value), autoMins: parseInt(autoMins.value)||0, typewrite: optType.checked, sound: optSound.checked, serverMode: optServer.checked };
  window.YANLIK_UPDATE?.(newCfg);
  alert('Ayarlar kaydedildi');
});
resetBtn.addEventListener('click', ()=> {
  if(confirm('Hafızayı sıfırlamak istediğine emin misin?')){ localStorage.removeItem('yanlik_memory'); window.YANLIK.memory.length=0; window.YANLIK.saveMemory(); alert('Hafıza sıfırlandı'); }
});