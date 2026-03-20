// Auto-update: detecta nova versao do service worker e avisa antes de recarregar
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    // Checar update a cada 5 minutos (era 60s — muito agressivo)
    setInterval(() => reg.update(), 300000);

    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (!newSW) return;

      newSW.addEventListener('statechange', () => {
        if (newSW.state === 'activated' && navigator.serviceWorker.controller) {
          // Mostrar toast antes de recarregar
          showUpdateToast();
        }
      });
    });
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Só recarrega se o toast já foi mostrado (evita reload sem aviso)
    if (window._swUpdateReady) window.location.reload();
  });
}

function showUpdateToast() {
  window._swUpdateReady = true;
  var t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 20px;border-radius:12px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);color:#fafafa;font-size:13px;font-weight:600;font-family:Inter,sans-serif;z-index:9999;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.5);';
  t.innerHTML = '<span>Nova versão disponível</span><button onclick="window.location.reload()" style="padding:6px 14px;border-radius:8px;border:none;background:var(--accent,#d4a853);color:#000;font-size:12px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">ATUALIZAR</button>';
  document.body.appendChild(t);
  // Auto-reload após 10s se não clicou
  setTimeout(() => { if (document.body.contains(t)) window.location.reload(); }, 10000);
}
