let installPrompt;
const installButton = document.querySelector("#installButton");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});

installButton?.addEventListener("click", async () => {
  if (!installPrompt) {
    window.alert("To install Court Legends on Android, open this site in Chrome, tap the menu (⋮), then choose Install app or Add to Home screen.");
    return;
  }

  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
});

window.addEventListener("appinstalled", () => {
  installPrompt = null;
});

if ("serviceWorker" in navigator && window.isSecureContext) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.error("Court Legends could not enable offline support:", error);
    });
  });
}
