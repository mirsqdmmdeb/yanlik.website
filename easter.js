window.addEventListener("blur", () => {
  // 404 efekti: başka sekmeye geçince
  const msg = document.createElement("div");
  msg.className = "overlay";
  msg.innerHTML = "<h1>404 😅</h1><p>Oops! Sayfa kayboldu...</p>";
  Object.assign(msg.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    zIndex: 9999,
  });
  document.body.appendChild(msg);
  msg.onclick = () => msg.remove();
});