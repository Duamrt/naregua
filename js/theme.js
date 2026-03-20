/* NaRegua — Theme Toggle (dark/light) + Segment Themes + Custom Accent */
(function() {
  // Tema claro/escuro
  var saved = localStorage.getItem('naregua_theme');
  if (!saved) {
    saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Segmento (barbearia, estetica, sobrancelha, unha, salao)
  var seg = localStorage.getItem('naregua_segment');
  if (seg && seg !== 'barbearia') {
    document.documentElement.setAttribute('data-segment', seg);
  }

  // Cor personalizada (se definida e diferente do padrão do segmento)
  var customColor = localStorage.getItem('naregua_accent');
  if (customColor) {
    document.documentElement.style.setProperty('--accent', customColor);
    document.documentElement.style.setProperty('--verde-acao', customColor);
    // Gerar hover (10% mais escuro)
    document.documentElement.style.setProperty('--accent-hover', darkenColor(customColor, 15));
    document.documentElement.style.setProperty('--accent-avatar', darkenColor(customColor, 25));
  }
})();

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  if (next === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem('naregua_theme', next);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === 'light' ? '#f5f5f5' : '#000000';
  return next;
}

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function setSegment(seg) {
  localStorage.setItem('naregua_segment', seg);
  if (seg && seg !== 'barbearia') {
    document.documentElement.setAttribute('data-segment', seg);
  } else {
    document.documentElement.removeAttribute('data-segment');
  }
}

function setAccentColor(color) {
  if (color) {
    localStorage.setItem('naregua_accent', color);
    document.documentElement.style.setProperty('--accent', color);
    document.documentElement.style.setProperty('--verde-acao', color);
    document.documentElement.style.setProperty('--accent-hover', darkenColor(color, 15));
    document.documentElement.style.setProperty('--accent-avatar', darkenColor(color, 25));
  } else {
    localStorage.removeItem('naregua_accent');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--verde-acao');
    document.documentElement.style.removeProperty('--accent-hover');
    document.documentElement.style.removeProperty('--accent-avatar');
  }
}

// Sync com settings do shop (chamar após carregar shop)
function syncThemeFromSettings(settings) {
  if (!settings) return;
  if (settings.segmento) setSegment(settings.segmento);
  if (settings.accent_color) setAccentColor(settings.accent_color);
}

// Escurecer cor hex
function darkenColor(hex, pct) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
  r = Math.max(0, Math.floor(r * (1 - pct / 100)));
  g = Math.max(0, Math.floor(g * (1 - pct / 100)));
  b = Math.max(0, Math.floor(b * (1 - pct / 100)));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
