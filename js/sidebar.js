/* NaRegua — Sidebar V3 (Desktop) — Lista plana sem accordion */
(function () {
  'use strict';

  var NAV = [
    { group: 'PRINCIPAL', items: [
      { icon: 'calendar_month', label: 'Agenda', href: 'dashboard.html' },
      { icon: 'bar_chart', label: 'Resumo', href: 'resumo.html' }
    ]},
    { group: 'GESTÃO', items: [
      { icon: 'group', label: 'Equipe', href: 'equipe.html' },
      { icon: 'content_cut', label: 'Serviços', href: 'servicos.html' },
      { icon: 'shuffle', label: 'Combos', href: 'combos.html' },
      { icon: 'people', label: 'Clientes', href: 'clientes.html' },
      { icon: 'inventory_2', label: 'Estoque', href: 'estoque.html' }
    ]},
    { group: 'FINANCEIRO', items: [
      { icon: 'account_balance_wallet', label: 'Caixa', href: 'financeiro.html' },
      { icon: 'receipt_long', label: 'Comandas', href: 'comandas.html' },
      { icon: 'paid', label: 'Comissões', href: 'comissoes.html' },
      { icon: 'payments', label: 'Folha Pagamento', href: 'folha-pagamento.html' },
      { icon: 'flag', label: 'Metas', href: 'metas.html' }
    ]},
    { group: 'COMERCIAL', items: [
      { icon: 'redeem', label: 'Pacotes', href: 'pacotes.html' },
      { icon: 'workspace_premium', label: 'Assinaturas', href: 'assinaturas.html' },
      { icon: 'local_offer', label: 'Cupons', href: 'cupons.html' },
      { icon: 'campaign', label: 'Promoções', href: 'promocoes.html' }
    ]},
    { group: 'CLIENTES', items: [
      { icon: 'notifications', label: 'Lembretes', href: 'lembretes.html' },
      { icon: 'loyalty', label: 'Retenção', href: 'retencao.html' },
      { icon: 'thumb_up', label: 'Satisfação', href: 'satisfacao.html' },
      { icon: 'hourglass_empty', label: 'Lista de Espera', href: 'lista-espera.html' },
      { icon: 'upload', label: 'Importar', href: 'importar-clientes.html' }
    ]},
    { group: 'ANÁLISE', items: [
      { icon: 'analytics', label: 'Relatório', href: 'relatorio.html' },
      { icon: 'schedule', label: 'Horários Ociosos', href: 'horarios-ociosos.html' },
      { icon: 'history', label: 'Atividades', href: 'atividades.html' }
    ]},
    { group: 'CONFIGURAR', items: [
      { icon: 'settings', label: 'Configurações', href: 'configuracoes.html' },
      { icon: 'qr_code', label: 'QR Code', href: 'qrcode.html' },
      { icon: 'photo_library', label: 'Galeria', href: 'galeria.html' },
      { icon: 'policy', label: 'Políticas', href: 'politicas.html' },
      { icon: 'cloud_download', label: 'Backup', href: 'backup.html' },
      { icon: 'credit_card', label: 'Meu Plano', href: 'planos.html' },
      { icon: 'search', label: 'Busca', href: 'busca.html' },
      { icon: 'notifications_active', label: 'Notificações', href: 'notificacoes.html' }
    ]}
  ];

  var SEG_LABELS = {
    barbearia: 'Gestão para barbearias',
    manicure:  'Gestão para manicures',
    unha:      'Gestão para nail designers',
    sobrancelha: 'Gestão para designers de sobrancelha',
    estetica:  'Gestão para estética',
    salao:     'Gestão para salões',
    outro:     'Gestão para seu negócio'
  };

  var currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
  var sidebar = null;

  function buildSidebar() {
    if (sidebar) return;

    var segKey = localStorage.getItem('naregua_segment') || 'outro';

    sidebar = document.createElement('aside');
    sidebar.className = 'nr-sidebar';

    // Brand
    var brand = document.createElement('div');
    brand.className = 'nr-sidebar-brand';
    brand.innerHTML = '<div class="nr-logo">Na<span>Regua</span></div><div class="nr-logo-sub">' + (SEG_LABELS[segKey] || SEG_LABELS.outro) + '</div>';
    sidebar.appendChild(brand);

    // Nav — lista plana
    var nav = document.createElement('nav');
    nav.className = 'nr-sidebar-nav';

    NAV.forEach(function (group) {
      // Label do grupo
      var label = document.createElement('span');
      label.className = 'nr-sidebar-group-label';
      label.textContent = group.group;
      nav.appendChild(label);

      // Itens do grupo
      group.items.forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'nr-sidebar-link' + (item.href === currentPage ? ' active' : '');
        a.href = item.href;
        a.innerHTML = '<span class="nr-icon material-symbols-outlined">' + item.icon + '</span><span class="nr-label">' + item.label + '</span>';
        nav.appendChild(a);
      });
    });

    sidebar.appendChild(nav);

    // Footer
    var footer = document.createElement('div');
    footer.className = 'nr-sidebar-footer';
    var shopLabel = 'Meu Negócio';
    if (typeof getTermos === 'function' && segKey !== 'outro') {
      try { var _t = getTermos(segKey); if (_t && _t.Estabelecimento) shopLabel = 'Meu ' + _t.Estabelecimento; } catch(e) {}
    }
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    footer.innerHTML =
      '<div class="nr-sidebar-shop">' + shopLabel + '</div>' +
      '<div class="nr-sidebar-footer-btns">' +
        '<button id="nr-theme-toggle" class="nr-sidebar-theme" title="Alternar tema"><span class="material-symbols-outlined" style="font-size:16px">' + (isLight ? 'dark_mode' : 'light_mode') + '</span></button>' +
        '<button class="nr-sidebar-logout" onclick="if(typeof logout===\'function\')logout();else{window.location.href=\'app.html\';}">Sair</button>' +
      '</div>';

    footer.querySelector('#nr-theme-toggle').addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      if (next === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      try { localStorage.setItem('naregua_theme', next); } catch(e) {}
      this.querySelector('.material-symbols-outlined').textContent = next === 'light' ? 'dark_mode' : 'light_mode';
    });

    sidebar.appendChild(footer);

    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.classList.add('nr-has-sidebar');

    updateShopName();
  }

  function updateShopName() {
    if (!sidebar) return;
    var el = document.querySelector('#shop-name, .shop-name');
    var shopDiv = sidebar.querySelector('.nr-sidebar-shop');
    if (el && shopDiv && el.textContent.trim()) {
      shopDiv.textContent = el.textContent.trim();
    }
    var bt = (window.shop && window.shop.business_type) || (window.shopData && window.shopData.business_type);
    if (bt) { try { localStorage.setItem('naregua_segment', bt); } catch(e) {} }
    var segKey = localStorage.getItem('naregua_segment') || 'outro';
    var subEl = sidebar.querySelector('.nr-logo-sub');
    if (subEl) subEl.textContent = SEG_LABELS[segKey] || SEG_LABELS.outro;
  }

  function removeSidebar() {
    if (!sidebar) return;
    sidebar.remove();
    sidebar = null;
    document.body.classList.remove('nr-has-sidebar');
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      if (!sidebar) buildSidebar();
    } else {
      if (sidebar) removeSidebar();
    }
  }

  function init() {
    handleResize();
    if (window._sidebarResizeHandler) window.removeEventListener('resize', window._sidebarResizeHandler);
    window._sidebarResizeHandler = handleResize;
    window.addEventListener('resize', window._sidebarResizeHandler);
    var _sidebarCheckCount = 0;
    var _sidebarChecker = setInterval(function () {
      _sidebarCheckCount++;
      var el = document.querySelector('#shop-name, .shop-name');
      if ((el && el.textContent.trim()) || _sidebarCheckCount > 20) {
        updateShopName();
        clearInterval(_sidebarChecker);
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
