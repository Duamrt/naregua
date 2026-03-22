// NaRegua — Helpers

// Silenciar console.log em produção (manter console.warn e console.error)
if (location.hostname === 'usenaregua.com.br') {
  console.log = function() {};
}

function formatMoney(v) {
  return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('pt-BR');
}

function formatTime(d) {
  if (!d) return '—';
  return new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function gerarSlug(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

// ── Termos dinâmicos por tipo de negócio ─────────────────────
function getTermos(tipo) {
  const _pro = { profissional: 'profissional', Profissional: 'Profissional', PROFISSIONAL: 'PROFISSIONAL', profissionais: 'profissionais', Profissionais: 'Profissionais', do_profissional: 'do profissional' };
  const map = {
    barbearia:   { ..._pro, profissional: 'barbeiro', Profissional: 'Barbeiro', PROFISSIONAL: 'BARBEIRO', profissionais: 'barbeiros', Profissionais: 'Barbeiros', do_profissional: 'do barbeiro', estabelecimento: 'barbearia', Estabelecimento: 'Barbearia', placeholder_combo: 'Ex: Cabelo + Barba Premium', placeholder_pacote: 'Ex: 5 Cortes por R$100' },
    manicure:    { ..._pro, profissional: 'manicure', Profissional: 'Manicure', PROFISSIONAL: 'MANICURE', profissionais: 'manicures', Profissionais: 'Manicures', do_profissional: 'da manicure', estabelecimento: 'studio', Estabelecimento: 'Studio', placeholder_combo: 'Ex: Mão + Pé Completo', placeholder_pacote: 'Ex: 5 Manicures por R$100' },
    unha:        { ..._pro, profissional: 'nail designer', Profissional: 'Nail Designer', PROFISSIONAL: 'NAIL DESIGNER', profissionais: 'nail designers', Profissionais: 'Nail Designers', do_profissional: 'da nail designer', estabelecimento: 'studio', Estabelecimento: 'Studio', placeholder_combo: 'Ex: Mão + Pé Completo', placeholder_pacote: 'Ex: 5 Manicures por R$100' },
    sobrancelha: { ..._pro, profissional: 'designer', Profissional: 'Designer', PROFISSIONAL: 'DESIGNER', profissionais: 'designers', Profissionais: 'Designers', do_profissional: 'do designer', estabelecimento: 'studio', Estabelecimento: 'Studio', placeholder_combo: 'Ex: Design + Henna', placeholder_pacote: 'Ex: 5 Designs por R$100' },
    estetica:    { ..._pro, profissional: 'esteticista', Profissional: 'Esteticista', PROFISSIONAL: 'ESTETICISTA', profissionais: 'esteticistas', Profissionais: 'Esteticistas', do_profissional: 'da esteticista', estabelecimento: 'clínica', Estabelecimento: 'Clínica', placeholder_combo: 'Ex: Limpeza + Hidratação', placeholder_pacote: 'Ex: 5 Sessões por R$200' },
    salao:       { ..._pro, estabelecimento: 'salão', Estabelecimento: 'Salão', placeholder_combo: 'Ex: Escova + Hidratação', placeholder_pacote: 'Ex: 5 Escovas por R$120' },
    outro:       { ..._pro, estabelecimento: 'estabelecimento', Estabelecimento: 'Estabelecimento', placeholder_combo: 'Ex: Combo Premium', placeholder_pacote: 'Ex: 5 Sessões por R$100' },
  };
  return map[tipo] || map.outro;
}

// ── Google Analytics 4 ──────────────────────────────────────
(function() {
  var GA_ID = 'G-XXXXXXXXXX'; // TODO: substituir pelo GA ID real do NaRegua
  if (GA_ID === 'G-XXXXXXXXXX') return; // Não carrega se não configurado
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { send_page_view: true });
})();
