// ══════════════════════════════════════════
// NAREGUA — SISTEMA DE AJUDA CONTEXTUAL
// Botão "?" flutuante + painel slide-up
// ══════════════════════════════════════════

const AJUDA = {
  'dashboard': {
    titulo: 'Agenda do Dia',
    resumo: 'Aqui você gerencia o dia a dia — confirma clientes, registra consumo e encerra atendimentos.',
    passos: [
      { acao: 'Confirmar cliente', como: 'Quando o cliente chegar, clique em CONFIRMAR no card dele.' },
      { acao: 'Adicionar consumo', como: 'Clique em + CONSUMO pra registrar produtos ou serviços extras durante o atendimento.' },
      { acao: 'Concluir atendimento', como: 'Clique em CONCLUIR → escolha forma de pagamento → confirme. O consumo aparece no resumo.' },
      { acao: 'Agendar retorno', como: 'Após concluir, o sistema sugere datas disponíveis pro cliente voltar. Escolha data e horário junto com ele.' },
      { acao: 'Encaixe sem agendamento', como: 'Clique em + ENCAIXE pra atender quem chegou sem agendar.' }
    ],
    dicas: [
      'O próximo cliente aparece com borda dourada',
      'A agenda atualiza sozinha a cada 30 segundos',
      'O sino no topo avisa de novos agendamentos'
    ]
  },
  'agenda-semana': {
    titulo: 'Agenda Semanal',
    itens: [
      'Visão completa da semana por profissional',
      'Dias fechados e folgas são destacados em cinza',
      'Clique num card pra ir direto pro dia na agenda',
      'Use as setas pra navegar entre semanas',
      'Alterne entre "TODOS" e por profissional individual'
    ]
  },
  'financeiro': {
    titulo: 'Caixa',
    resumo: 'Controle o dinheiro que entra e sai do seu negócio, por dia ou por mês.',
    passos: [
      { acao: 'Ver faturamento', como: 'Alterne DIA ou MÊS nos filtros pra ver receita e despesas do período.' },
      { acao: 'Registrar despesa', como: 'Clique + DESPESA → preencha valor, categoria e forma de pagamento.' },
      { acao: 'Abrir/fechar caixa', como: 'No início do turno clique ABRIR CAIXA. No fim, clique FECHAR e confira os valores.' }
    ],
    dicas: [
      'A margem mostra quanto sobra após custos e comissões',
      'Confira valores esperados vs recebidos no fechamento'
    ]
  },
  'equipe': {
    titulo: 'Equipe',
    resumo: 'Cadastre profissionais, defina horários e comissões.',
    passos: [
      { acao: 'Adicionar profissional', como: 'Clique + PROFISSIONAL → preencha nome, telefone e comissão (%).' },
      { acao: 'Configurar horário', como: 'Clique no profissional → defina horário por dia da semana, pausa e folgas.' },
      { acao: 'Dar acesso ao app', como: 'O profissional acessa o link de cadastro (compartilhe via WhatsApp) e cria senha usando o telefone cadastrado.' }
    ],
    dicas: [
      'Desativar mantém o histórico, excluir apaga tudo',
      'A comissão pode ser editada depois em Comissões'
    ]
  },
  'servicos': {
    titulo: 'Serviços',
    itens: [
      'Cadastre os serviços/procedimentos que você oferece',
      'Defina nome, preço e duração em minutos',
      'Serviço "dia inteiro" bloqueia toda a agenda do dia',
      'Desativar esconde do agendamento mas mantém histórico',
      'Preço e duração podem ser editados sem afetar agendamentos já feitos'
    ]
  },
  'clientes': {
    titulo: 'Clientes',
    itens: [
      'Lista de todos os clientes que já agendaram',
      'Clique no card pra ver ficha completa, histórico e anamnese',
      'Use a busca pra encontrar por nome ou telefone',
      'VER FICHA abre o histórico detalhado do cliente',
      'ZAP abre conversa no WhatsApp direto com o cliente'
    ]
  },
  'estoque': {
    titulo: 'Estoque',
    itens: [
      'Controle de produtos com entradas e saídas',
      'Cadastre com preço de venda, custo e estoque mínimo',
      'Produtos com estoque baixo ficam em vermelho',
      '+ ENTRADA quando comprar, - SAÍDA quando vender/usar'
    ]
  },
  'relatorio': {
    titulo: 'Relatório',
    itens: [
      'Análise completa: ranking de profissionais, comparativo mensal',
      'Formas de pagamento mais usadas e despesas por categoria',
      'Gráfico de faturamento diário e horários de pico',
      'Use as setas pra navegar entre meses',
      'Exporte em PDF pra compartilhar'
    ]
  },
  'resumo': {
    titulo: 'Resumo',
    itens: [
      'Visão geral do negócio em 16 KPIs coloridos',
      'Faturamento, atendimentos, ticket médio, lucro',
      'Clientes sem cadastro, retorno previsto, abandonos',
      'Caixa aberto, assinaturas vencendo, estoque baixo',
      'Clique em qualquer card pra ir direto pra página relacionada'
    ]
  },
  'comandas': {
    titulo: 'Comandas',
    itens: [
      'Abra uma comanda quando o cliente chegar',
      'Adicione serviços e produtos à comanda',
      'Feche com a forma de pagamento quando terminar',
      'O valor é somado automaticamente no financeiro'
    ]
  },
  'pacotes': {
    titulo: 'Pacotes',
    itens: [
      'Crie pacotes como "5 cortes por R$100"',
      'Venda pro cliente e controle os usos restantes',
      'Quando o cliente agendar, o uso do pacote é descontado',
      'Pacotes vencidos ou esgotados ficam inativos'
    ]
  },
  'assinaturas': {
    titulo: 'Assinaturas',
    itens: [
      'Clubes mensais: o cliente paga fixo por mês',
      'Defina os serviços inclusos no plano',
      'Controle de validade e renovação automática',
      'Acompanhe assinantes ativos e receita recorrente'
    ]
  },
  'cupons': {
    titulo: 'Cupons',
    itens: [
      'Crie cupons de desconto em % ou valor fixo (R$)',
      'Compartilhe via WhatsApp com seus clientes',
      'Defina validade e limite de usos',
      'Acompanhe quantos foram usados e por quem'
    ]
  },
  'lembretes': {
    titulo: 'Lembretes',
    itens: [
      'Lista inteligente de clientes que precisam de lembrete',
      'Intervalo configurável por serviço (ex: corte 21 dias, barba 7 dias)',
      'Botão WhatsApp com mensagem pronta — 1 toque pra enviar',
      'Filtros por serviço, pendentes e já enviados',
      'Marque como enviado pra não repetir no mesmo dia',
      'Clique na engrenagem pra personalizar os intervalos'
    ]
  },
  'retencao': {
    titulo: 'Retenção',
    itens: [
      'Veja clientes que sumiram há mais de 30 dias',
      'Aniversariantes do mês pra mandar parabéns',
      'Nota de satisfação média do estabelecimento',
      'Chame clientes de volta pelo WhatsApp com um toque'
    ]
  },
  'satisfacao': {
    titulo: 'Satisfação',
    itens: [
      'Pesquisa de satisfação de 1 a 5 estrelas',
      'Envie o link pro cliente avaliar após o atendimento',
      'Veja a nota média e os comentários recebidos',
      'Identifique pontos de melhoria no atendimento'
    ]
  },
  'configuracoes': {
    titulo: 'Configurações',
    resumo: 'Personalize tudo do seu estabelecimento num lugar só.',
    passos: [
      { acao: 'Definir segmento', como: 'Escolha seu tipo de negócio (barbearia, estética, salão...). Isso muda os termos em todo o sistema.' },
      { acao: 'Ajustar agendamento', como: 'Defina intervalo entre horários (15-60 min), limite de dias futuro e máximo de agendamentos por cliente.' },
      { acao: 'Formas de pagamento', como: 'Ative/desative PIX, Dinheiro, Débito e Crédito. Só as ativas aparecem pro cliente.' },
      { acao: 'Horário de funcionamento', como: 'Defina abertura, fechamento e dias que abre.' }
    ],
    dicas: [
      'Comissão padrão é aplicada a profissionais novos automaticamente',
      'Limite de cancelamento define quantas horas antes o cliente pode cancelar'
    ]
  },
  'lista-espera': {
    titulo: 'Lista de Espera',
    itens: [
      'Fila pra clientes que chegam sem agendar',
      'Adicione o cliente e ele entra na fila',
      'Chame o próximo quando a cadeira liberar',
      'Reordene a fila arrastando os cards'
    ]
  },
  'comissoes': {
    titulo: 'Comissões',
    itens: [
      'Quanto cada profissional faturou no período',
      'Valor da comissão calculado automaticamente',
      'Edite a % de comissão direto nesta tela',
      'Filtre por mês pra fechar o pagamento'
    ]
  },
  'historico-cliente': {
    titulo: 'Ficha do Cliente',
    itens: [
      'Todas as visitas com data, serviço e valor',
      'Total gasto, ticket médio e frequência de visitas',
      'Tags automáticas: VIP (20+ visitas), Novo, Sumido',
      'Aniversário editável + observações livres',
      'Anamnese / Ficha de Avaliação: preencha dados de saúde e preferências',
      'Pacotes, assinaturas e avaliações vinculados',
      'Botão AGENDAR e ZAP direto na ficha'
    ]
  },
  'combos': {
    titulo: 'Combos',
    itens: [
      'Combine serviços com preço especial',
      'Ex: Cabelo + Barba por menos que os dois separados',
      'O combo aparece como opção no agendamento',
      'Edite ou desative a qualquer momento'
    ]
  },
  'promocoes': {
    titulo: 'Promoções',
    itens: [
      'Envie mensagens em massa pros seus clientes via WhatsApp',
      'Escolha o público-alvo: todos, sumidos, aniversariantes',
      'Use templates prontos ou escreva sua mensagem',
      'Acompanhe quantas mensagens foram enviadas'
    ]
  },
  'planos': {
    titulo: 'Meu Plano',
    itens: [
      'Veja seu plano atual e recursos disponíveis',
      'Dias restantes do período de teste (trial)',
      'Compare Básico (1 profissional), Profissional (até 3) e Premium (ilimitado)',
      'Contrate via WhatsApp direto com o suporte'
    ]
  },
  'busca': {
    titulo: 'Busca',
    itens: [
      'Encontre qualquer coisa: clientes, agendamentos, serviços',
      'Pesquise também produtos, profissionais e comandas',
      'Digite e veja os resultados em tempo real',
      'Atalho: Ctrl+K abre a busca de qualquer página'
    ]
  },
  'qrcode': {
    titulo: 'QR Code & Cartão Digital',
    itens: [
      'QR Code do seu estabelecimento pra imprimir',
      'Coloque no balcão, espelho ou cartão de visita',
      'Cada profissional tem seu QR Code individual',
      'O cliente escaneia e agenda direto pelo celular',
      'Cartão digital compartilhável via WhatsApp'
    ]
  },
  'notificacoes': {
    titulo: 'Notificações',
    itens: [
      'Alertas do sistema em tempo real',
      'Novos agendamentos e confirmações',
      'Clientes sumidos e estoque baixo',
      'Vencimentos de pacotes e assinaturas'
    ]
  },
  'galeria': {
    titulo: 'Galeria',
    itens: [
      'Portfólio de fotos dos trabalhos realizados',
      'Upload de imagens ou cole URL direto',
      'Categorize por tipo de trabalho',
      'As fotos aparecem no perfil público do estabelecimento'
    ]
  },
  'politicas': {
    titulo: 'Políticas',
    itens: [
      'Configure regras de cancelamento e atraso',
      'Defina política de pagamento e no-show',
      'O cliente vê as regras na hora de agendar',
      'Proteja seu tempo e reduza faltas'
    ]
  },
  'importar-clientes': {
    titulo: 'Importar Clientes',
    itens: [
      'Importe clientes de uma planilha CSV ou Excel',
      'Cole direto do Excel (nome e telefone)',
      'Clientes duplicados são identificados pelo telefone',
      'Revise antes de confirmar a importação'
    ]
  },
  'recibo-barbeiro': {
    titulo: 'Recibo de Comissão',
    itens: [
      'Recibo detalhado do profissional',
      'Detalhamento de atendimentos e valores',
      'Imprimível direto do navegador',
      'Compartilhável via WhatsApp'
    ]
  },
  'backup': {
    titulo: 'Backup',
    itens: [
      'Exporte todos os seus dados do estabelecimento',
      'Agendamentos em CSV, tudo em JSON',
      'Seus dados são seus, leve quando quiser',
      'Recomendamos fazer backup mensalmente'
    ]
  },
  'atividades': {
    titulo: 'Atividades',
    itens: [
      'Log de tudo que aconteceu no estabelecimento',
      'Agendamentos, despesas, estoque e comandas',
      'Filtre por período e tipo de atividade',
      'Acompanhe quem fez o quê e quando'
    ]
  },
  'metas': {
    titulo: 'Metas',
    itens: [
      'Defina metas mensais de faturamento',
      'Acompanhe atendimentos e novos clientes',
      'Barra de progresso mostra quanto falta',
      'Compare com o mês anterior pra ver evolução'
    ]
  },
  'folha-pagamento': {
    titulo: 'Folha de Pagamento',
    itens: [
      'Salário fixo + comissão - deduções = líquido a pagar',
      'Detalhamento completo por profissional',
      'Imprimível pra assinatura do profissional',
      'Filtre por mês e exporte se precisar'
    ]
  },
  'horarios-ociosos': {
    titulo: 'Horários Ociosos',
    itens: [
      'Descubra onde sua agenda tem buracos',
      'Veja quanto você perde em receita potencial',
      'Sugestões pra preencher os horários vazios',
      'Identifique padrões: dias e horários mais fracos'
    ]
  },
  'admin': {
    titulo: 'Painel Admin',
    itens: [
      'Gerenciamento de todos os estabelecimentos do NaRegua',
      'Crie, edite e acesse qualquer estabelecimento',
      'Veja stats globais: profissionais, agendamentos, faturamento',
      '"Entrar como" acessa o dashboard como se fosse o dono'
    ]
  },
  'barbeiro': {
    titulo: 'Minha Agenda',
    itens: [
      'Sua agenda pessoal do dia com horários e clientes',
      'Marque como ATENDIDO, FALTOU ou envie ZAP',
      'Stats no topo: agendados, atendidos e faturamento',
      'Use as setas pra ver a agenda de amanhã'
    ]
  },
  'agendar': {
    titulo: 'Agendar',
    itens: [
      'Escolha o profissional e o serviço desejado',
      'Selecione o dia e horário disponível',
      'Confirme com seu nome e telefone',
      'Aplique cupom de desconto se tiver',
      'Combos disponíveis com preço especial'
    ]
  },
  'barbearia': {
    titulo: 'Perfil Público',
    itens: [
      'Perfil público do seu estabelecimento',
      'Informações que o cliente vê antes de agendar',
      'Endereço, horário de funcionamento e contato',
      'Galeria de fotos e serviços oferecidos',
      'Botão AGENDAR AGORA leva direto pro agendamento'
    ]
  },
  'cliente': {
    titulo: 'Área do Cliente',
    itens: [
      'Veja seus agendamentos futuros e passados',
      'Cancele ou reagende se precisar',
      'Confira seus pacotes e assinaturas ativos',
      'Avalie o atendimento após cada visita'
    ]
  },
  'minha-conta': {
    titulo: 'Minha Conta',
    itens: [
      'Seus dados pessoais e de acesso',
      'Altere nome, telefone ou senha',
      'Veja e gerencie suas notificações',
      'Configurações de privacidade e preferências'
    ]
  },
  'onboarding': {
    titulo: 'Configuração Inicial',
    itens: [
      'Preencha os dados do seu estabelecimento passo a passo',
      'Configure horários, serviços e profissionais',
      'Ao final, seu estabelecimento estará pronto pra receber agendamentos',
      'Você pode ajustar tudo depois nas Configurações'
    ]
  },
  'barbeiro-cadastro': {
    titulo: 'Cadastro do Profissional',
    itens: [
      'Crie seu acesso como profissional',
      'Use o telefone cadastrado pelo dono do estabelecimento',
      'Defina sua senha de acesso (mínimo 8 caracteres + 1 número)',
      'Após o cadastro, acesse sua agenda pessoal'
    ]
  }
};

// ── DETECTAR PÁGINA ────────────────────────────────
function getPageId() {
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return AJUDA[path] ? path : null;
}

// ── RENDERIZAR CONTEÚDO ────────────────────────────
function renderAjuda(pageId) {
  const data = AJUDA[pageId];
  if (!data) return '<p style="color:var(--texto-muted);">Sem ajuda disponível pra esta tela.</p>';

  let html = '';

  // Resumo
  if (data.resumo) {
    html += '<p style="font-size:13px;color:var(--texto-secundario,#aaa);margin:0 0 16px;line-height:1.5;">' + data.resumo + '</p>';
  }

  // Passos (novo formato)
  if (data.passos && data.passos.length) {
    html += '<div style="margin-bottom:16px;">';
    data.passos.forEach((p, i) => {
      html += '<div style="display:flex;gap:10px;margin-bottom:12px;align-items:flex-start;">' +
        '<div style="min-width:24px;height:24px;border-radius:50%;background:rgba(212,168,83,0.15);color:#d4a853;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + (i+1) + '</div>' +
        '<div><div style="font-size:13px;font-weight:700;color:var(--texto-principal,#fff);margin-bottom:2px;">' + p.acao + '</div>' +
        '<div style="font-size:12px;color:var(--texto-secundario,#aaa);line-height:1.4;">' + p.como + '</div></div>' +
      '</div>';
    });
    html += '</div>';
  }

  // Dicas
  if (data.dicas && data.dicas.length) {
    html += '<div style="background:rgba(212,168,83,0.06);border:1px solid rgba(212,168,83,0.15);border-radius:8px;padding:10px 12px;margin-bottom:8px;">' +
      '<div style="font-size:10px;font-weight:700;letter-spacing:1px;color:#d4a853;margin-bottom:6px;">DICAS</div>';
    data.dicas.forEach(d => {
      html += '<div style="font-size:12px;color:var(--texto-secundario,#aaa);margin-bottom:4px;padding-left:12px;position:relative;"><span style="position:absolute;left:0;">•</span>' + d + '</div>';
    });
    html += '</div>';
  }

  // Fallback pro formato antigo (itens simples)
  if (data.itens && !data.passos) {
    html += '<ul style="margin:0;padding:0 0 0 18px;font-size:13px;color:var(--texto-secundario,#aaa);line-height:2;">';
    data.itens.forEach(i => html += '<li>' + i + '</li>');
    html += '</ul>';
  }

  return html;
}

// ── ABRIR/FECHAR PAINEL ────────────────────────────
function toggleAjudaPainel() {
  const existing = document.getElementById('ajuda-painel');
  if (existing) { fecharAjuda(); return; }

  const pageId = getPageId();
  if (!pageId || !AJUDA[pageId]) return;

  const data = AJUDA[pageId];
  const conteudo = renderAjuda(pageId);

  // Overlay escuro
  const overlay = document.createElement('div');
  overlay.id = 'ajuda-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9998;opacity:0;transition:opacity .2s ease;';
  overlay.onclick = fecharAjuda;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.style.opacity = '1');

  // Painel slide-in lateral direito
  const painel = document.createElement('div');
  painel.id = 'ajuda-painel';
  painel.style.cssText = 'position:fixed;top:0;right:0;width:340px;max-width:90vw;height:100vh;background:var(--bg-card,#1a1a1a);border-left:2px solid rgba(212,168,83,0.3);z-index:9999;overflow-y:auto;padding:0 20px 24px;transform:translateX(100%);transition:transform .25s cubic-bezier(0.4,0,0.2,1);';

  // Botão de tour guiado (se disponível no dashboard)
  const tourBtn = (typeof window.startDashboardTour === 'function' && pageId === 'dashboard')
    ? '<button onclick="fecharAjuda();setTimeout(function(){window.startDashboardTour();},300);" style="display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:12px;border-radius:10px;border:1px solid rgba(212,168,83,0.3);background:rgba(212,168,83,0.08);color:#d4a853;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;margin:0 0 16px;transition:.15s;">&#9654; VER TOUR GUIADO</button>'
    : '';

  painel.innerHTML =
    // Handle bar
    '<div style="display:flex;justify-content:center;padding:12px 0 8px;">' +
      '<div style="width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,0.15);"></div>' +
    '</div>' +
    // Header
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
        '<span style="font-size:18px;">&#10068;</span>' +
        '<span style="font-weight:800;font-size:17px;color:var(--texto-principal,#fff);">' + data.titulo + '</span>' +
      '</div>' +
      '<button onclick="fecharAjuda()" style="background:none;border:none;color:var(--texto-muted,#666);font-size:22px;cursor:pointer;padding:4px 8px;line-height:1;">&times;</button>' +
    '</div>' +
    tourBtn +
    conteudo;

  document.body.appendChild(painel);
  requestAnimationFrame(() => painel.style.transform = 'translateX(0)');

  // Swipe right pra fechar
  let startX = 0;
  painel.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  painel.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 60) fecharAjuda();
  }, { passive: true });
}

function fecharAjuda() {
  const painel = document.getElementById('ajuda-painel');
  const overlay = document.getElementById('ajuda-overlay');
  if (painel) {
    painel.style.transform = 'translateX(100%)';
    setTimeout(() => painel.remove(), 250);
  }
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 200);
  }
}

// ── BOTÃO FLUTUANTE ────────────────────────────────
function initAjuda() {
  if (document.getElementById('ajuda-fab')) return;
  if (!getPageId() || !AJUDA[getPageId()]) return;

  if (!document.getElementById('ajuda-css')) {
    const style = document.createElement('style');
    style.id = 'ajuda-css';
    style.textContent =
      '#ajuda-fab { position:fixed;bottom:80px;right:16px;width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,168,83,0.3);background:rgba(212,168,83,0.9);color:#1a1a1a;font-size:20px;font-weight:900;cursor:pointer;z-index:999;display:flex;align-items:center;justify-content:center;font-family:inherit;transition:.2s;box-shadow:0 2px 12px rgba(212,168,83,0.3); }' +
      '#ajuda-fab:hover { background:rgba(212,168,83,1);transform:scale(1.1);box-shadow:0 4px 20px rgba(212,168,83,0.5); }' +
      '#ajuda-fab:active { transform:scale(0.95); }' +
      '@media(max-width:768px) { #ajuda-painel { width:100vw !important;max-width:100vw !important; } }';
    document.head.appendChild(style);
  }

  const fab = document.createElement('button');
  fab.id = 'ajuda-fab';
  fab.textContent = '?';
  fab.title = 'Ajuda';
  fab.setAttribute('aria-label', 'Ajuda');
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
