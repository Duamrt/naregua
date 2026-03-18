// Auto-update: detecta nova versao do service worker e recarrega
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    // Checar update a cada 60 segundos
    setInterval(() => reg.update(), 60000);

    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (!newSW) return;

      newSW.addEventListener('statechange', () => {
        // Novo SW ativou = nova versao disponivel
        if (newSW.state === 'activated' && navigator.serviceWorker.controller) {
          // Recarregar silenciosamente
          window.location.reload();
        }
      });
    });
  });

  // Se o SW controlador mudar (outro tab atualizou), recarregar
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
