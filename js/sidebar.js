/* NaRegua — Sidebar (Desktop) — Gerado via JS */
(function () {
  'use strict';

  // Only render on desktop
  function isDesktop() { return window.innerWidth >= 768; }

  // Navigation structure
  var NAV = [
    { group: 'PRINCIPAL', open: true, items: [
      { icon: '\uD83D\uDCC5', label: 'Agenda', href: 'dashboard.html' },
      { icon: '\uD83D\uDCC5', label: 'Agenda Semanal', href: 'agenda-semana.html' },
      { icon: '\uD83D\uDCCA', label: 'Resumo', href: 'resumo.html' }
    ]},
    { group: 'GEST\u00C3O', open: true, items: [
      { icon: '\uD83D\uDC65', label: 'Equipe', href: 'equipe.html' },
      { icon: '\u2702\uFE0F', label: 'Servi\u00E7os', href: 'servicos.html' },
      { icon: '\uD83D\uDD00', label: 'Combos', href: 'combos.html' },
      { icon: '\uD83D\uDCCB', label: 'Clientes', href: 'clientes.html' },
      { icon: '\uD83D\uDCE6', label: 'Estoque', href: 'estoque.html' }
    ]},
    { group: 'FINANCEIRO', open: true, items: [
      { icon: '\uD83D\uDCB0', label: 'Caixa', href: 'financeiro.html' },
      { icon: '\uD83D\uDCDD', label: 'Comandas', href: 'comandas.html' },
      { icon: '\uD83D\uDCB5', label: 'Comiss\u00F5es', href: 'comissoes.html' },
      { icon: '\uD83D\uDCC4', label: 'Folha Pagamento', href: 'folha-pagamento.html' },
      { icon: '\uD83C\uDFAF', label: 'Metas', href: 'metas.html' }
    ]},
    { group: 'COMERCIAL', open: false, items: [
      { icon: '\uD83D\uDCE6', label: 'Pacotes', href: 'pacotes.html' },
      { icon: '\uD83D\uDC51', label: 'Assinaturas', href: 'assinaturas.html' },
      { icon: '\uD83C\uDFAB', label: 'Cupons', href: 'cupons.html' },
      { icon: '\uD83D\uDCE3', label: 'Promo\u00E7\u00F5es', href: 'promocoes.html' }
    ]},
    { group: 'CLIENTES', open: false, items: [
      { icon: '\uD83D\uDD04', label: 'Reten\u00E7\u00E3o', href: 'retencao.html' },
      { icon: '\u2B50', label: 'Satisfa\u00E7\u00E3o', href: 'satisfacao.html' },
      { icon: '\u23F3', label: 'Lista de Espera', href: 'lista-espera.html' },
      { icon: '\uD83D\uDCE5', label: 'Importar', href: 'importar-clientes.html' }
    ]},
    { group: 'AN\u00C1LISE', open: false, items: [
      { icon: '\uD83D\uDCCA', label: 'Relat\u00F3rio', href: 'relatorio.html' },
      { icon: '\uD83D\uDCC9', label: 'Hor\u00E1rios Ociosos', href: 'horarios-ociosos.html' },
      { icon: '\uD83D\uDCCB', label: 'Atividades', href: 'atividades.html' }
    ]},
    { group: 'CONFIGURAR', open: false, items: [
      { icon: '\u2699', label: 'Configura\u00E7\u00F5es', href: 'configuracoes.html' },
      { icon: '\uD83D\uDCF1', label: 'QR Code', href: 'qrcode.html' },
      { icon: '\uD83D\uDCF7', label: 'Galeria', href: 'galeria.html' },
      { icon: '\uD83D\uDCDC', label: 'Pol\u00EDticas', href: 'politicas.html' },
      { icon: '\uD83D\uDCBE', label: 'Backup', href: 'backup.html' },
      { icon: '\uD83D\uDCB3', label: 'Meu Plano', href: 'planos.html' },
      { icon: '\uD83D\uDD0D', label: 'Busca', href: 'busca.html' },
      { icon: '\uD83D\uDD14', label: 'Notifica\u00E7\u00F5es', href: 'notificacoes.html' }
    ]}
  ];

  // Detect current page filename
  var currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

  // Load saved collapse state
  var STORAGE_KEY = 'nr_sidebar_state';
  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) { return {}; }
  }
  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  var sidebar = null;
  var wrapper = null;

  function buildSidebar() {
    if (sidebar) return; // already built

    var state = loadState();

    sidebar = document.createElement('aside');
    sidebar.className = 'nr-sidebar';

    // Brand
    var brand = document.createElement('div');
    brand.className = 'nr-sidebar-brand';
    brand.innerHTML = '<div class="nr-logo">Na<span>Regua</span></div><div class="nr-logo-sub">Gest\u00E3o para barbearias</div>';
    sidebar.appendChild(brand);

    // Nav
    var nav = document.createElement('nav');
    nav.className = 'nr-sidebar-nav';

    NAV.forEach(function (group, gi) {
      var g = document.createElement('div');
      g.className = 'nr-sidebar-group';

      // Determine collapsed state
      var saved = state[group.group];
      var collapsed = saved !== undefined ? saved : !group.open;
      if (collapsed) g.classList.add('collapsed');

      // Header
      var header = document.createElement('div');
      header.className = 'nr-sidebar-group-header';
      header.innerHTML = '<span class="nr-sidebar-group-label">' + group.group + '</span><span class="nr-sidebar-group-chevron">\u25BC</span>';
      header.addEventListener('click', function () {
        g.classList.toggle('collapsed');
        var s = loadState();
        s[group.group] = g.classList.contains('collapsed');
        saveState(s);
      });
      g.appendChild(header);

      // Items
      var items = document.createElement('div');
      items.className = 'nr-sidebar-group-items';

      group.items.forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'nr-sidebar-link';
        if (item.href === currentPage) a.classList.add('active');
        a.href = item.href;
        a.innerHTML = '<span class="nr-icon">' + item.icon + '</span><span class="nr-label">' + item.label + '</span>';
        items.appendChild(a);
      });

      g.appendChild(items);
      nav.appendChild(g);
    });

    sidebar.appendChild(nav);

    // Footer
    var footer = document.createElement('div');
    footer.className = 'nr-sidebar-footer';

    var shopName = '';
    var shopEl = document.querySelector('#shop-name, .shop-name');
    if (shopEl) shopName = shopEl.textContent.trim();

    footer.innerHTML =
      '<div class="nr-sidebar-shop">' + (shopName || 'Minha Barbearia') + '</div>' +
      '<button class="nr-sidebar-logout" id="nr-btn-logout">\u274C Sair</button>';
    sidebar.appendChild(footer);

    // Logout handler
    footer.querySelector('#nr-btn-logout').addEventListener('click', function () {
      if (typeof doLogout === 'function') {
        doLogout();
      } else if (typeof logout === 'function') {
        logout();
      } else {
        // Fallback: clear session and redirect
        localStorage.removeItem('nr_token');
        localStorage.removeItem('nr_user');
        window.location.href = 'index.html';
      }
    });

    // Insert sidebar at start of body
    document.body.insertBefore(sidebar, document.body.firstChild);

    // Wrap remaining body content
    wrapContent();
  }

  function wrapContent() {
    if (wrapper) return;
    // Create wrapper for all content except sidebar
    wrapper = document.createElement('div');
    wrapper.className = 'nr-main-content';

    // Move all body children (except sidebar) into wrapper
    var children = Array.prototype.slice.call(document.body.childNodes);
    children.forEach(function (child) {
      if (child !== sidebar) {
        wrapper.appendChild(child);
      }
    });
    document.body.appendChild(wrapper);
  }

  function removeSidebar() {
    if (!sidebar) return;
    // Unwrap content back to body
    if (wrapper) {
      var children = Array.prototype.slice.call(wrapper.childNodes);
      children.forEach(function (child) {
        document.body.insertBefore(child, wrapper);
      });
      wrapper.remove();
      wrapper = null;
    }
    sidebar.remove();
    sidebar = null;
  }

  function handleResize() {
    if (isDesktop()) {
      if (!sidebar) buildSidebar();
    } else {
      if (sidebar) removeSidebar();
    }
  }

  // Init on DOM ready
  function init() {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Update shop name when it becomes available (some pages load it async)
    var observer = new MutationObserver(function () {
      if (!sidebar) return;
      var shopEl = document.querySelector('#shop-name, .shop-name');
      var shopDiv = sidebar.querySelector('.nr-sidebar-shop');
      if (shopEl && shopDiv && shopEl.textContent.trim()) {
        shopDiv.textContent = shopEl.textContent.trim();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
