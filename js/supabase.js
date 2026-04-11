// NaRegua — Cliente Supabase
// TODO: Substituir pelas credenciais do projeto NaRegua no Supabase
const SUPABASE_URL = 'https://jsydprrcyrjjxdmzrqpz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeWRwcnJjeXJqanhkbXpycXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDIyMTYsImV4cCI6MjA4OTMxODIxNn0.ATGAx5AwErEZr2Lw4anu_JYHfwxlDLxiDK7hkgAwuus';

// Cria o cliente — window.supabase vem do CDN, sb é o nosso cliente
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Detectar sessão expirada e redirecionar com feedback
(function() {
  var _publicPages = ['app.html','agendar.html','satisfacao.html','barbearia.html','landing.html','index.html',''];
  sb.auth.onAuthStateChange(function(event) {
    if (event === 'SIGNED_OUT') {
      var pg = window.location.pathname.split('/').pop() || '';
      if (_publicPages.indexOf(pg) !== -1) return;
      var toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#ef4444;color:#fff;padding:12px 24px;border-radius:10px;font-size:13px;font-weight:700;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,0.4);pointer-events:none;';
      toast.textContent = 'Sessão expirada. Redirecionando...';
      document.body ? document.body.appendChild(toast) : document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(toast); });
      setTimeout(function() { window.location.href = 'app.html'; }, 1800);
    }
  });
})();
