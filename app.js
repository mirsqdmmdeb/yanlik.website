const menuBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('side-menu');
const pages = document.querySelectorAll('.page');
menuBtn.onclick = ()=> menu.classList.toggle('show');

document.querySelectorAll('nav li').forEach(li=>{
  li.onclick=()=>{
    document.querySelector('.page.active')?.classList.remove('active');
    document.getElementById(li.dataset.page).classList.add('active');
    menu.classList.remove('show');
  };
});