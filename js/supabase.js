// NaRegua — Cliente Supabase
// TODO: Substituir pelas credenciais do projeto NaRegua no Supabase
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY';

// Importa o cliente Supabase via CDN (carregado no HTML antes deste arquivo)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
