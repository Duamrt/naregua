// NaRegua — Helpers

// TODO: mover para backend/RPC — service key NÃO deve ficar no client
const _SK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzeWRwcnJjeXJqanhkbXpycXB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzc0MjIxNiwiZXhwIjoyMDg5MzE4MjE2fQ.q_0QPcoipD57qSH-SU7pbS7DELXiOeI9mHq85qvAncs';
const _SB_REST = 'https://jsydprrcyrjjxdmzrqpz.supabase.co/rest/v1';

// Verifica se há sessão ativa antes de expor service key — proteção mínima
function getServiceHeaders() {
  return {
    'apikey': _SK,
    'Authorization': 'Bearer ' + _SK,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };
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
