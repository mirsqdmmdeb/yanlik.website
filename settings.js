document.getElementById("sound-toggle").onchange = (e) => {
  localStorage.setItem("sound", e.target.checked);
};
document.getElementById("auto-msg").onchange = (e) => {
  localStorage.setItem("auto", e.target.checked);
};
document.getElementById("slow-mode").onchange = (e) => {
  localStorage.setItem("slow", e.target.checked);
};