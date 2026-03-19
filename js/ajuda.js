// ══════════════════════════════════════════
// NAREGUA — SISTEMA DE AJUDA CONTEXTUAL
// Botão "?" flutuante + painel lateral
// ══════════════════════════════════════════

const AJUDA = {
  'dashboard': {
    titulo: 'Agenda do Dia',
    secoes: [
      { titulo: 'Visão geral', itens: [
        'Veja todos os agendamentos do dia organizados por profissional',
        'O próximo cliente aparece destacado com borda dourada',
        'Use as setas para navegar entre dias'
      ]},
      { titulo: 'Ações nos agendamentos', passos: [
        'CONCLUIR — marca como atendido e registra o pagamento',
        'CANCELAR — cancela e oferece avisar o próximo cliente da fila',
        'FALTOU — marca que o cliente não compareceu',
        'ZAP — envia confirmação pelo WhatsApp do cliente'
      ]},
      { titulo: 'Encaixe rápido', passos: [
        'Clique em + ENCAIXE no topo',
        'Selecione o profissional e o serviço',
        'Nome e telefone são opcionais (cliente avulso)',
        'O sistema encaixa no próximo horário disponível'
      ]},
      { titulo: 'Compartilhar', itens: [
        'ENVIAR LINK DE AGENDAMENTO — manda o link pro cliente pelo WhatsApp',
        'CADASTRAR BARBEIRO — envia link de acesso pro profissional',
        'Copiar link — copia pra colar onde quiser'
      ]},
      { dica: 'A agenda atualiza automaticamente a cada 30 segundos. Novos agendamentos aparecem sem precisar recarregar.' }
    ]
  },

  'equipe': {
    titulo: 'Equipe / Profissionais',
    secoes: [
      { titulo: 'Adicionar profissional', passos: [
        'Clique em + NOVO',
        'Preencha o nome e telefone',
        'Configure os dias e horários de trabalho',
        'Escolha o modo: Agendamento (cliente escolhe horário) ou Ordem de chegada',
        'Clique em SALVAR — o link de acesso será copiado automaticamente'
      ]},
      { titulo: 'Horários por dia', itens: [
        'Cada dia pode ter horário diferente (entrada, saída, pausa)',
        'Agendamento: cliente escolhe horário online',
        'Ordem de chegada: atendimento sem horário fixo, por ordem'
      ]},
      { titulo: 'Desativar / Excluir', itens: [
        'Desativar — profissional some da agenda mas mantém histórico',
        'Excluir — remove permanentemente (agendamentos pendentes serão cancelados)',
        'O dono (is_owner) não pode ser excluído'
      ]},
      { dica: 'O telefone é necessário pra o profissional criar seu próprio acesso pelo app.' }
    ]
  },

  'financeiro': {
    titulo: 'Caixa / Financeiro',
    secoes: [
      { titulo: 'Visão geral', itens: [
        'Veja receita, despesas, comissões e lucro do dia ou do mês',
        'Use os filtros DIA / MÊS pra alternar o período',
        'A margem mostra quanto sobra após custos e comissões'
      ]},
      { titulo: 'Lançar despesa', passos: [
        'Clique em + DESPESA',
        'Preencha: descrição, valor, data e categoria',
        'Clique em SALVAR'
      ]},
      { titulo: 'Comissões', itens: [
        'Calculadas automaticamente com base no percentual de cada profissional',
        'Configure o percentual na tela de Equipe'
      ]},
      { dica: 'A receita vem dos atendimentos marcados como CONCLUÍDO no dashboard.' }
    ]
  },

  'servicos': {
    titulo: 'Serviços',
    secoes: [
      { titulo: 'Gerenciar serviços', passos: [
        'Clique em + NOVO pra criar um serviço',
        'Defina: nome, preço e duração em minutos',
        'Dia inteiro: reserva todos os profissionais (ex: noiva, evento)',
        'Desativar: serviço some do agendamento mas mantém histórico'
      ]},
      { dica: 'O preço e a duração podem ser editados a qualquer momento sem afetar agendamentos já feitos.' }
    ]
  },

  'clientes': {
    titulo: 'Clientes',
    secoes: [
      { titulo: 'Lista de clientes', itens: [
        'Todos os clientes que já agendaram aparecem aqui',
        'Consolidados por telefone (mesmo cliente = mesmo número)',
        'Veja quantos atendimentos cada um fez e quando foi a última visita'
      ]},
      { titulo: 'Ações', itens: [
        'ZAP — abre conversa no WhatsApp direto com o cliente',
        'COPIAR TEL — copia o telefone pra área de transferência'
      ]},
      { dica: 'Use a busca pra encontrar rapidamente por nome ou telefone.' }
    ]
  },

  'estoque': {
    titulo: 'Estoque de Produtos',
    secoes: [
      { titulo: 'Gerenciar produtos', passos: [
        'Clique em + NOVO pra cadastrar um produto',
        'Defina: nome, preço de venda, custo, quantidade e estoque mínimo',
        'Produtos com estoque abaixo do mínimo ficam destacados em vermelho'
      ]},
      { titulo: 'Movimentações', passos: [
        '+ ENTRADA — quando comprar/receber produtos',
        '- SAÍDA — quando vender/usar produtos',
        'O estoque atualiza automaticamente'
      ]},
      { dica: 'O lucro por produto é calculado automaticamente (preço de venda - custo).' }
    ]
  },

  'relatorio': {
    titulo: 'Relatório Mensal',
    secoes: [
      { titulo: 'O que mostra', itens: [
        'Faturamento total e ticket médio do mês',
        'Taxa de falta (no-show) e margem de lucro',
        'Gráfico de faturamento diário',
        'Ranking dos profissionais por faturamento',
        'Formas de pagamento mais usadas',
        'Despesas por categoria',
        'Comparação com o mês anterior'
      ]},
      { dica: 'Use as setas pra navegar entre meses e comparar evolução.' }
    ]
  },

  'barbeiro': {
    titulo: 'Agenda do Barbeiro',
    secoes: [
      { titulo: 'Seu dia', itens: [
        'Veja seus agendamentos do dia com horário, cliente e serviço',
        'Stats no topo: quantos agendados, atendidos e quanto faturou'
      ]},
      { titulo: 'Ações', passos: [
        'ATENDIDO — marca que você atendeu o cliente (registra pagamento)',
        'FALTOU — marca que o cliente não apareceu',
        'ZAP — manda mensagem de confirmação pro cliente'
      ]},
      { dica: 'Use as setas pra ver a agenda de amanhã e se preparar.' }
    ]
  }
};

// ── RENDERIZAR CONTEÚDO ────────────────────────────
function renderAjuda(pageId) {
  const data = AJUDA[pageId];
  if (!data) return '<p style="color:var(--texto-muted);">Sem ajuda disponível pra esta tela.</p>';

  let html = '';
  data.secoes.forEach(s => {
    if (s.titulo) {
      html += '<div style="font-weight:700;font-size:13px;color:var(--verde-acao);margin:16px 0 8px;">' + s.titulo + '</div>';
    }
    if (s.itens) {
      html += '<ul style="margin:0 0 8px 16px;font-size:12px;color:var(--texto-secundario);line-height:1.8;">';
      s.itens.forEach(i => html += '<li>' + i + '</li>');
      html += '</ul>';
    }
    if (s.passos) {
      html += '<ol style="margin:0 0 8px 16px;font-size:12px;color:var(--texto-secundario);line-height:1.8;">';
      s.passos.forEach(p => html += '<li>' + p + '</li>');
      html += '</ol>';
    }
    if (s.dica) {
      html += '<div style="background:rgba(212,168,83,0.08);border:1px solid rgba(212,168,83,0.2);border-radius:8px;padding:10px 12px;margin:8px 0;font-size:11px;color:var(--verde-acao);">💡 ' + s.dica + '</div>';
    }
  });
  return html;
}

// ── DETECTAR PÁGINA ────────────────────────────────
function getPageId() {
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  const map = {
    'dashboard': 'dashboard',
    'equipe': 'equipe',
    'financeiro': 'financeiro',
    'servicos': 'servicos',
    'clientes': 'clientes',
    'estoque': 'estoque',
    'relatorio': 'relatorio',
    'barbeiro': 'barbeiro'
  };
  return map[path] || null;
}

// ── ABRIR/FECHAR PAINEL ────────────────────────────
function toggleAjudaPainel() {
  const existing = document.getElementById('ajuda-painel');
  if (existing) { existing.remove(); return; }

  const pageId = getPageId();
  if (!pageId || !AJUDA[pageId]) return;

  const data = AJUDA[pageId];
  const conteudo = renderAjuda(pageId);
  const painel = document.createElement('div');
  painel.id = 'ajuda-painel';
  painel.style.cssText = 'position:fixed;top:0;right:0;width:340px;max-width:90vw;height:100vh;background:rgba(10,10,10,0.95);border-left:1px solid rgba(212,168,83,0.15);z-index:9999;overflow-y:auto;padding:20px;backdrop-filter:blur(12px);animation:ajudaSlide .2s ease;';
  painel.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
      '<div style="font-weight:700;font-size:13px;color:var(--verde-acao);letter-spacing:1px;">❓ AJUDA</div>' +
      '<button onclick="fecharAjuda()" style="background:none;border:none;color:var(--texto-muted);font-size:20px;cursor:pointer;padding:4px 8px;">&times;</button>' +
    '</div>' +
    '<div style="font-weight:800;font-size:16px;color:var(--texto-principal);margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--borda);">' + data.titulo + '</div>' +
    conteudo;
  document.body.appendChild(painel);

  setTimeout(() => document.addEventListener('click', fecharAjudaFora), 100);
}

function fecharAjuda() {
  const p = document.getElementById('ajuda-painel');
  if (p) p.remove();
  document.removeEventListener('click', fecharAjudaFora);
}

function fecharAjudaFora(e) {
  const painel = document.getElementById('ajuda-painel');
  if (!painel) return;
  if (!painel.contains(e.target) && !e.target.closest('#ajuda-fab')) fecharAjuda();
}

// ── BOTÃO FLUTUANTE ────────────────────────────────
function initAjuda() {
  if (document.getElementById('ajuda-fab')) return;
  if (!getPageId() || !AJUDA[getPageId()]) return;

  if (!document.getElementById('ajuda-css')) {
    const style = document.createElement('style');
    style.id = 'ajuda-css';
    style.textContent =
      '@keyframes ajudaSlide { from { transform:translateX(100%);opacity:0; } to { transform:translateX(0);opacity:1; } }' +
      '#ajuda-fab { position:fixed;bottom:80px;right:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,168,83,0.2);background:rgba(10,10,10,0.9);color:var(--verde-acao);font-size:18px;font-weight:800;cursor:pointer;z-index:900;display:flex;align-items:center;justify-content:center;font-family:inherit;backdrop-filter:blur(8px);transition:.2s;box-shadow:0 2px 12px rgba(0,0,0,0.4); }' +
      '#ajuda-fab:hover { background:rgba(212,168,83,0.1);border-color:rgba(212,168,83,0.4);transform:scale(1.1); }' +
      '@media(max-width:768px) { #ajuda-painel { width:100vw !important;max-width:100vw !important; } }';
    document.head.appendChild(style);
  }

  const fab = document.createElement('button');
  fab.id = 'ajuda-fab';
  fab.textContent = '?';
  fab.title = 'Ajuda';
  fab.onclick = toggleAjudaPainel;
  document.body.appendChild(fab);
}

// ESC fecha
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('ajuda-painel')) {
    fecharAjuda();
    e.stopPropagation();
  }
}, true);

// Init quando DOM pronto
document.addEventListener('DOMContentLoaded', initAjuda);
