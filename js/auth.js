// NaRegua — Autenticação

// ── Estado ────────────────────────────────────────────────────
let authMode = 'login'; // 'login' ou 'signup'

// ── Inicialização ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Se já tem sessão ativa, redireciona
  checkSession();

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.mode));
  });

  // Forms
  document.getElementById('form-login').addEventListener('submit', handleLogin);
  document.getElementById('form-signup').addEventListener('submit', handleSignup);

  // Toggle senha
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? '🙈' : '👁';
    });
  });
});

// ── Sessão ────────────────────────────────────────────────────
async function checkSession() {
  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return;

    const { data: shop } = await sb
      .from('barbershops')
      .select('id')
      .eq('owner_id', session.user.id)
      .maybeSingle();

    window.location.href = shop ? 'dashboard.html' : 'onboarding.html';
  } catch (e) {
    console.error('checkSession erro:', e);
  }
}

// ── Trocar tabs ───────────────────────────────────────────────
function switchTab(mode) {
  authMode = mode;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });
  document.getElementById('form-login').style.display = mode === 'login' ? 'block' : 'none';
  document.getElementById('form-signup').style.display = mode === 'signup' ? 'block' : 'none';
  hideMsg();
}

// ── Login ─────────────────────────────────────────────────────
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const senha = document.getElementById('login-senha').value;
  const btn = document.getElementById('btn-login');

  if (!email || !senha) {
    showMsg('Preencha todos os campos.', 'error');
    return;
  }

  setLoading(btn, true);
  hideMsg();

  const { data, error } = await sb.auth.signInWithPassword({
    email,
    password: senha
  });

  setLoading(btn, false);

  if (error) {
    const msg = error.message.includes('Invalid login')
      ? 'E-mail ou senha incorretos.'
      : error.message.includes('Email not confirmed')
      ? 'Confirme seu e-mail antes de entrar.'
      : 'Erro ao entrar. Tente novamente.';
    showMsg(msg, 'error');
    return;
  }

  // Redirecionar
  const { data: shop } = await sb
    .from('barbershops')
    .select('id')
    .eq('owner_id', data.user.id)
    .maybeSingle();

  window.location.href = shop ? 'dashboard.html' : 'onboarding.html';
}

// ── Criar conta ───────────────────────────────────────────────
async function handleSignup(e) {
  e.preventDefault();
  const nome = document.getElementById('signup-nome').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const senha = document.getElementById('signup-senha').value;
  const btn = document.getElementById('btn-signup');

  if (!nome || !email || !senha) {
    showMsg('Preencha todos os campos.', 'error');
    return;
  }

  if (senha.length < 6) {
    showMsg('A senha deve ter pelo menos 6 caracteres.', 'error');
    return;
  }

  setLoading(btn, true);
  hideMsg();

  const { data, error } = await sb.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome }
    }
  });

  setLoading(btn, false);

  if (error) {
    const msg = error.message.includes('already registered')
      ? 'Este e-mail já está cadastrado. Faça login.'
      : 'Erro ao criar conta. Tente novamente.';
    showMsg(msg, 'error');
    return;
  }

  // Supabase pode exigir confirmação de e-mail ou não (depende da config)
  if (data.session) {
    // Login automático — ir pro onboarding
    window.location.href = 'onboarding.html';
  } else {
    // Precisa confirmar e-mail
    showMsg('Conta criada! Verifique seu e-mail para confirmar.', 'success');
    // Limpar form e voltar pro login
    document.getElementById('form-signup').reset();
    setTimeout(() => switchTab('login'), 3000);
  }
}

// ── Feedback visual ───────────────────────────────────────────
function showMsg(text, type) {
  const el = document.getElementById('auth-msg');
  el.textContent = text;
  el.className = `msg msg-${type} show`;
}

function hideMsg() {
  const el = document.getElementById('auth-msg');
  el.className = 'msg';
}

function setLoading(btn, loading) {
  btn.disabled = loading;
  const label = btn.querySelector('.btn-label');
  const spinner = btn.querySelector('.spinner');
  if (label) label.style.display = loading ? 'none' : 'inline';
  if (spinner) spinner.style.display = loading ? 'inline-block' : 'none';
}
