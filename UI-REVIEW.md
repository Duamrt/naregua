# NaRegua — UI Review

**Auditado em:** 2026-04-11
**Baseline:** Padrões abstratos 6 dimensões (sem UI-SPEC.md)
**Screenshots:** Não capturados (sem servidor local rodando)
**Versão auditada:** naregua-04111328
**Páginas auditadas:** dashboard.html, onboarding.html, admin.html
**Arquivos de estilo:** css/style.css, css/layout.css

---

## Scores por Dimensão

| Dimensão | Score | Achado Principal |
|----------|-------|-----------------|
| 1. Layout & Estrutura | 3/4 | Dashboard V3 desktop bem estruturado; admin sem sidebar/responsivo |
| 2. Consistência Visual | 2/4 | Token `--verde-acao` (alias legado) usado em 36 lugares no dashboard misturando com `--accent` |
| 3. Acessibilidade | 2/4 | Ausência de `aria-label` na maioria dos ícones e botões, sem focus-visible, sem skip link |
| 4. Responsividade | 3/4 | Bottom nav mobile correto; admin.html sem queries responsivas além do max-width do container |
| 5. UX / Fluxo | 3/4 | Onboarding 4 passos claro; admin sem loading state inicial; alert() nativo em erros críticos |
| 6. Performance / Carregamento | 2/4 | Três famílias de fonte carregadas (DM Sans + Inter + Space Grotesk); spinner invisível no light theme |

**Total: 15/24**

---

## Top 3 Prioridades

1. **Token de cor inconsistente — `--verde-acao` vs `--accent`**
   Impacto: Quando o segmento muda (ex: estética vira rosa), as 36 ocorrências de `--verde-acao` no dashboard ficam douradas (#d4a853 hardcoded em rgba) enquanto os elementos que usam `--accent` viram rosa. O dono de salão vai ver botões de duas cores diferentes na mesma tela.
   Correção: Substituir todas as ocorrências de `var(--verde-acao)` e `rgba(212,168,83,...)` no dashboard por `var(--accent)` e `var(--accent-soft)`. O alias em style.css já aponta pra `--accent`, mas 17 ocorrências usam o rgba hardcoded que ignora o alias.

2. **Spinner invisível no light theme + fundo errado no onboarding**
   Impacto: No light mode, o spinner tem `border-top-color: #0e0e13` (quase preto) sobre fundo branco — funciona. Mas quando inserido inline nos botões com `border-color: rgba(255,255,255,0.15)`, o spinner some sobre fundo claro dos cards. Além disso, o onboarding usa `background: var(--bg-principal, #0a0a0f)` — o token `--bg-principal` não existe em style.css, então o fallback `#0a0a0f` entra, que é mais escuro que o `--preto: #131318` do sistema. Em light mode o body sobrescreve corretamente, mas há um flash de preto antes.
   Correção: Trocar `--bg-principal` por `var(--preto)` no onboarding. Rever `border-top-color` do spinner inline para usar `var(--accent)` em vez de `#0e0e13`.

3. **Acessibilidade — botões icon-only e ícones Material sem label**
   Impacto: Usuários de teclado/leitor de tela não conseguem operar os botões de navegação de data (`‹` / `›`), o botão de fechar modais (`✕`), os botões de ação das linhas da tabela ("+consumo", que tem só `title=` sem `aria-label`), e o toggle do calendário mini. `title` não é lido por todos os leitores de tela móveis.
   Correção: Adicionar `aria-label="Dia anterior"` / `aria-label="Próximo dia"` nos date-nav-btn, `aria-label="Fechar"` no modal-close, e converter os `title=` dos action buttons para `aria-label=`. Adicionar `:focus-visible` override no CSS para exibir outline claro ao navegar por teclado.

---

## Achados Detalhados

### Dimensão 1: Layout & Estrutura (3/4)

**Pontos fortes:**
- Dashboard V3 tem topbar sticky + sidebar + content area bem definidos para desktop.
- Metric grid 4 colunas responsivo (cai pra 2 no mobile) — correto.
- Onboarding com max-width 480px centrado funciona bem em qualquer tela.
- Bottom nav mobile usa `env(safe-area-inset-*)` para iPhone X+.
- Modal com `max-height: 85vh` + `overflow-y: auto` correto.

**Problemas:**
- `admin.html` não tem sidebar nem bottom nav — é uma página isolada sem sistema de navegação. Nenhum link de volta ao dashboard ou ao sistema. O usuário precisa editar a URL manualmente para sair.
- `admin.html` tem `.admin-container { max-width: 900px }` mas não tem `@media` próprias. Em telas de 375px o container fica com `padding: 16px` mas a grade de stats `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` ainda funciona razoavelmente.
- A `.barbers-grid` do dashboard tem dois breakpoints conflitantes: `@media (max-width: 480px)` força `1fr` e `@media (min-width: 600px)` força `auto-fit`. Entre 481–599px o comportamento é indefinido (cai no padrão sem coluna explícita).

---

### Dimensão 2: Consistência Visual (2/4)

**Problema central — dupla linguagem de cor:**

O sistema de tokens define `--verde-acao` como alias de `--accent` em style.css (linha 56–58). Correto na teoria. Na prática, o dashboard.html tem 36 ocorrências de `var(--verde-acao)` e 17 ocorrências de `rgba(212,168,83,...)` hardcoded — herança de uma versão anterior com tema dourado. Esses rgba não passam pelo sistema de tokens, então quando o segmento é "estética" (accent rosa) ou "sobrancelha" (accent nude), os elementos que usam rgba continuam dourados:

- `filter-chip.active` — `rgba(212,168,83,0.1)` (dashboard.html:201)
- `day-btn.active` — `rgba(212,168,83,0.15)` (dashboard.html:267)
- `pay-method-btn.active` — `rgba(212,168,83,0.1)` (dashboard.html:276)
- `.btn-confirm-appt` e `.btn-done-appt` — ambos `rgba(212,168,83,0.15)` (dashboard.html:101–102)
- `mini-cal-day.selected` — `var(--verde-acao)` que funciona, mas `toast-auto` usa `rgba(212,168,83,0.95)` hardcoded (dashboard.html:433)
- admin.html: `.adm-filter.active`, `.pay-toggle.active`, `.day-btn.active` — todos `rgba(212,168,83,...)` hardcoded

**Fontes — três famílias carregadas:**
- style.css carrega `DM Sans` + `Space Grotesk` via Google Fonts.
- dashboard.html e admin.html carregam adicionalmente `Inter` (`font-family:'Inter',sans-serif` em `.stat-num` no dashboard).
- onboarding.html carrega `DM Sans` + `Space Grotesk` (correto, sem Inter).
- Resultado: três requests de fonte distintas no dashboard/admin, sendo que `Inter` poderia ser substituída por `Space Grotesk` que já está carregada.

**Logo no admin:**
- Admin usa `<img src="img/logo.png">` com `filter: brightness(1.8) contrast(1.1)` em vez do logotipo tipográfico padrão do sistema. Inconsistente com as demais páginas que usam `<div class="logo">Na<span>Regua</span></div>`.

---

### Dimensão 3: Acessibilidade (2/4)

**Sem skip link:** Nenhuma das três páginas tem `<a href="#main-content" class="skip-link">`. Em teclado, o usuário navega por toda a sidebar antes de chegar ao conteúdo.

**Botões sem label acessível:**
- `date-nav-btn` (`‹` / `›`) — sem `aria-label` (dashboard.html:619, 624)
- `mini-cal-nav` com `›` e `‹` via entity — sem `aria-label` (dashboard.html:595–597)
- `.modal-close` com `✕` — sem `aria-label` em todos os modais
- `.pp-dismiss` com `✕` — sem `aria-label` (dashboard.html:1029)
- Botões de ação inline nas linhas da tabela usam `title=` (ex: `title="Consumo"`) mas não `aria-label` — `title` não é lido por VoiceOver iOS

**Focus sem estilo visível:**
- style.css define `--focus-ring` e aplica em `.field input:focus` (correto para formulários), mas **não** define `:focus-visible` global para botões. Todos os `.btn`, `.icon-btn`, `.appt-btn`, `.nr-act-btn`, `.ob-btn` ficam sem ring ao navegar por Tab.

**Contraste — ponto de atenção:**
- Texto `var(--texto-muted): #8888aa` sobre `var(--cinza-escuro): #0e0e13` → ratio estimado ~3.8:1, abaixo do mínimo WCAG AA de 4.5:1 para texto normal. Afeta labels de stat cards, meta info de agendamentos, e group labels da sidebar.
- No light theme: `--texto-muted: #6b6b8a` sobre branco → ratio ~3.3:1 — falha WCAG para textos de 11–12px sem bold.

**`<span>` com texto de ícone Material Symbols sem `aria-hidden`:**
- Ex: `<span style="font-family:'Material Symbols Outlined'">search</span>` — leitor de tela vai ler a palavra "search" literalmente. Falta `aria-hidden="true"` em todos os ícones decorativos (dashboard.html:518, 521, 566–588).

---

### Dimensão 4: Responsividade (3/4)

**Pontos fortes:**
- Bottom nav mobile fixo com `safe-area-inset` — correto para notch/home bar.
- layout.css oculta sidebar corretamente em mobile (`display: none !important`).
- `min-width: 44px / min-height: 44px` nos botões de ação mobile — correto pra touch target.
- Onboarding `.ob-field-row` de 2 colunas fica como 1 coluna implicitamente em telas muito estreitas (grid auto).

**Problemas:**
- `admin.html` sem `@media` próprias além do `max-width: 900px`. Em 375px a barra de filtros (`display:flex; gap:8px; flex-wrap:wrap`) funciona, mas o input de busca com `flex:1; min-width:180px` pode ficar espremido e a linha de filtros vai para duas linhas sem padding adequado.
- O `.ob-step-label` some em `max-width: 520px` (oculta os labels do stepper), mas os dots permanecem sem texto — em mobile o usuário não sabe em qual passo está sem ler o header do step.
- Na `barbers-grid` entre 481–599px (gap de breakpoint), o comportamento de colunas não é explicitamente definido.
- Modal `max-height: 85vh` sem altura mínima — em iPhone SE (568px de altura com teclado aberto) o modal do encaixe rápido pode ficar muito reduzido.

---

### Dimensão 5: UX / Fluxo (3/4)

**Pontos fortes:**
- Onboarding linear com 4 passos bem definidos, botão "← Voltar" em todos os steps.
- Step 4 (conclusão) entrega o link de agendamento imediatamente com copy e teste.
- Dashboard tem estado de loading explícito com spinner centrado.
- Primeiros Passos (checklist pós-onboarding) com progress bar — boa prática de ativação.
- Encaixe rápido acessível diretamente da topbar desktop.

**Problemas:**
- `admin.html` não exibe nenhum estado de loading durante `DOMContentLoaded` (carrega 4 queries em `Promise.all` sem skeleton/spinner). A página fica em branco até o JavaScript terminar. `#global-stats` renderiza vazio e o `id="global-stats"` é populado só depois do fetch.
- Erros críticos no admin usam `alert()` nativo do browser (admin.html:627, 646, 834–836). Inconsistente com o sistema de toast/msg do resto da aplicação.
- No modal de pagamento, o total (`#pag-valor`) usa `color: var(--verde-acao)` mas fica em destaque dourado independente do segmento — pode confundir se o usuário associa dourado a um status específico.
- Ao dispensar o card "Primeiros Passos" (`pp-dismiss`), não há confirmação. Clique acidental perde o onboarding checklist.
- O modal de "Vaga Aberta" (remarketing) pode aparecer sem o usuário ter pedido — não foi possível auditar o trigger sem servidor local.

---

### Dimensão 6: Performance / Carregamento (2/4)

**Problemas:**
- **Três famílias de fonte** em dashboard e admin: `DM Sans` (style.css), `Space Grotesk` (style.css), `Inter` (inline no head). São 3 requests separadas ao Google Fonts. `Inter` é usada em apenas 1 classe (`.stat-num`) e poderia ser substituída por `Space Grotesk` que já está carregada.

- **Spinner com cor invisível no dark mode** ao ser usado inline em botões: style.css define `border-top-color: #0e0e13` (quase preto) para o spinner padrão — correto quando sobre fundo accent (botão primary dourado da versão antiga). Mas com o accent atual indigo `#c0c1ff`, o botão primário tem `background: var(--accent)` que é lilás claro, e o spinner `#0e0e13` fica escuro demais e sem contraste adequado no light mode. O spinner inline no dashboard (linha 536) corrige isso com `border-top-color: var(--accent)`, mas o spinner de style.css usado nos botões não.

- **Token `--bg-principal` inexistente** em onboarding causa flash de `#0a0a0f` (mais escuro que o sistema) antes do `[data-theme]` ser aplicado pelo theme.js.

- **185 atributos `style=` inline** no dashboard.html — dificulta manutenção e impede cache de CSS reutilizável. Não afeta performance diretamente mas aumenta o tamanho do HTML.

- **Supabase CDN via `cdn.jsdelivr.net`** sem SRI (Subresource Integrity). Risco de supply chain se o CDN for comprometido. Não é problema de performance mas de segurança de carregamento.

- `admin.html` carrega até 2.000 agendamentos em uma única query sem paginação — em clientes com volume alto, pode causar timeout de 30s ou resposta lenta.

---

## Arquivos Auditados

- `C:/Users/Duam Rodrigues/naregua/dashboard.html` (1.700+ linhas)
- `C:/Users/Duam Rodrigues/naregua/onboarding.html` (~560 linhas)
- `C:/Users/Duam Rodrigues/naregua/admin.html` (~1.000 linhas)
- `C:/Users/Duam Rodrigues/naregua/css/style.css` (558 linhas)
- `C:/Users/Duam Rodrigues/naregua/css/layout.css` (259 linhas)

Audit de registro de shadcn: não aplicável (stack vanilla, sem components.json).
