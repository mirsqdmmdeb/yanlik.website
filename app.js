document.addEventListener("DOMContentLoaded", function () {
  const featuresContainer = document.getElementById("features");
  
  
  for (let i = 1; i <= 20; i++) {
    const card = document.createElement("div");
    card.className = "feature-card";
    card.textContent = `Özellik #${i}`;
    featuresContainer.appendChild(card);
  }
});

function showPopup() {
  document.getElementById("popup404").style.display = "block";
}

function closePopup() {
  document.getElementById("popup404").style.display = "none";
}