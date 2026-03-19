/* NaRegua — Theme Toggle (dark/light) */
(function() {
  var saved = localStorage.getItem('naregua_theme');
  if (!saved) {
    saved = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
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
  // Update meta theme-color
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === 'light' ? '#f5f5f5' : '#000000';
  return next;
}

function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
