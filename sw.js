// NaRegua — Service Worker (cache-first para assets, network-first para API)
const CACHE_NAME = 'naregua-v7';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/barbeiro.html',
  '/cliente.html',
  '/relatorio.html',
  '/agendar.html',
  '/servicos.html',
  '/equipe.html',
  '/financeiro.html',
  '/onboarding.html',
  '/css/style.css',
  '/js/supabase.js',
  '/js/auth.js',
  '/js/utils.js',
  '/img/logo.png',
  '/img/icon-192.png',
  '/img/icon-512.png',
  '/manifest.json'
];

// Instala e pré-cacheia assets estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Limpa caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first para Supabase, cache-first para o resto
self.addEventListener('fetch', e => {
  const url = e.request.url;

  // Supabase e APIs sempre vão pra rede
  if (url.includes('supabase.co') || url.includes('/rest/') || url.includes('/auth/')) {
    return;
  }

  // Google Fonts — cache-first
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return resp;
      }))
    );
    return;
  }

  // HTMLs e JS — network-first (sempre pega atualizado, cache como fallback)
  if (url.endsWith('.html') || url.endsWith('.js') || e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp.ok && e.request.method === 'GET') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return resp;
      }).catch(() => caches.match(e.request).then(cached => {
        if (cached) return cached;
        if (e.request.mode === 'navigate') return caches.match('/index.html');
      }))
    );
    return;
  }

  // Imagens e outros assets — cache-first, fallback rede
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(resp => {
      if (resp.ok && e.request.method === 'GET') {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
      }
      return resp;
    })).catch(() => {})
  );
});

// ── Push Notifications ──────────────────────────────────────
self.addEventListener('push', e => {
  let data = { title: 'NaRegua', body: 'Novo agendamento!' };
  try {
    if (e.data) data = e.data.json();
  } catch (err) {
    if (e.data) data.body = e.data.text();
  }

  const options = {
    body: data.body,
    icon: '/img/icon-192.png',
    badge: '/img/icon-192.png',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'naregua-' + (data.tag || Date.now()),
    renotify: true,
    data: { url: data.url || '/dashboard.html' }
  };

  e.waitUntil(self.registration.showNotification(data.title, options));
});

// Ao clicar na notificacao, abre o app
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification.data?.url || '/dashboard.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Se ja tem aba aberta, foca nela
      for (const client of list) {
        if (client.url.includes('naregua') || client.url.includes('usenaregua')) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      // Senao abre nova aba
      return clients.openWindow(url);
    })
  );
});
