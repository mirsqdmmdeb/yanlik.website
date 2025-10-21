// Menü geçişleri ve sekme yönetimi
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const tabs = document.querySelectorAll(".tab");
const navBtns = document.querySelectorAll("aside nav button");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// Tema yönetimi
const themeBtns = document.querySelectorAll(".theme-btn");
themeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.documentElement.dataset.theme = btn.dataset.theme;
    localStorage.setItem("theme", btn.dataset.theme);
  });
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;