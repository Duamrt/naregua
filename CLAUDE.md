# NaRegua — SaaS de Agendamento para Beleza

Sempre responda em português brasileiro.

## Projeto
- **Stack:** HTML + CSS + JS vanilla + Supabase (PostgreSQL)
- **Deploy:** GitHub Pages (branch main) → usenaregua.com.br
- **Branches:** `dev` (desenvolvimento) → merge para `main` (produção)
- **Deploy:** `./deploy.sh "mensagem"` (cache busting + merge automático)
- **Servidor local:** `npx serve -s .`
- **Supabase:** `jsydprrcyrjjxdmzrqpz.supabase.co`

## Multi-segmento (7 nichos)
barbearia, manicure, nail designer, sobrancelha, estética, salão, outro

- `getTermos(tipo)` em utils.js centraliza termos dinâmicos
- NUNCA hardcodar "barbeiro" ou "barbearia" — sempre usar getTermos()
- `localStorage.naregua_segment` usado pela sidebar

## Estrutura
- 46 páginas HTML + 10 JS em js/
- js/utils.js — getTermos(), helpers, GA4
- js/auth.js — autenticação Supabase
- js/supabase.js — client Supabase
- js/sidebar.js — menu lateral dinâmico
- js/theme.js — tema claro/escuro
- js/plan-guard.js — enforcement trial/planos
- js/tour.js — tour guiado
- js/ajuda.js — ajuda contextual 37 páginas
- js/push.js — push notifications
- js/sw-update.js — auto-update service worker

## Perfis
- Admin → admin.html
- Dono → dashboard.html
- Profissional → barbeiro.html
- Cliente → agendar/minha-conta/satisfacao/barbearia

## Banco (Supabase) — todas com RLS
barbershops, barbers, services, appointments, expenses, products, stock_movements, push_subscriptions, comandas, comanda_items, pacotes, pacote_vendas, assinaturas, assinatura_clientes, cupons, cupom_usos, clients, pesquisas_satisfacao, respostas_satisfacao, lista_espera, combos, combo_services, promocoes, galeria, booking_attempts, fechamentos_caixa

## Planos
Básico R$29,90 | Pro R$49,90 | Premium R$79,90

## Regras
- Usar getTermos() pra qualquer texto visível ao usuário
- Testar com `node -c js/*.js` antes de subir
- Não criar arquivos desnecessários
- Commitar com frequência em progresso significativo
