const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// here we add an event handler to the `beforeinstallprompt` event
    window.addEventListener("beforeinstallprompt", (event) => {
        window.deferredPrompt = event;
        butInstall.classList.toggle("hidden", false);
      });

//here we implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
    const initializeEvent = window.deferredPrompt;
    if (!initializeEvent) return;
    initializeEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle("hidden", true);
  });
  
// here we add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    window.deferredPrompt = null;
  });