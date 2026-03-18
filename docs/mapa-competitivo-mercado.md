# Mapa Competitivo — Mercado de Sistemas para Barbearias (Brasil)

> **Data:** 18/03/2026
> **Produto:** NaRegua (usenaregua.com.br)
> **Objetivo:** Identificar problemas reais de negócios já rodando para resolver no NaRegua

---

## 1. Panorama do Mercado

### Concorrentes Mapeados

| Sistema | Preço/mês | Base | Nota Reclame Aqui | Foco principal |
|---|---|---|---|---|
| **Cash Barber** | ~R$ 250 | 3.000 shops | 4.7/10 | Assinatura recorrente |
| **AppBarber** | R$ 56-80 | Milhares (declarado) | 7.4/10 | Agendamento + gestão geral |
| **BarberCode** | R$ 70-130 | Não informado | Sem registro | WhatsApp + chatbot IA |
| **EiBarber** | R$ 49-139 | 600 shops | Sem registro | IA + WhatsApp nativo |
| **Simples Agenda** | R$ 40+ | Genérico | — | Multi-segmento |
| **NaRegua** | A definir | Em desenvolvimento | — | Agenda + gestão premium |

---

## 2. Os 12 Problemas Reais do Mercado (e como o NaRegua resolve)

Estes problemas vêm de reclamações reais de clientes no Reclame Aqui, reviews de app stores, e análise dos concorrentes.

---

### PROBLEMA 1: Suporte inexistente ou lento
**Fonte:** Cash Barber (28 dias para responder), AppBarber (relatos de abandono)
**Impacto:** Donos perdem dinheiro quando o sistema falha e ninguém ajuda

**Como o NaRegua resolve:**
- Chat de suporte direto no painel (WhatsApp do founder)
- SLA de resposta < 4h em horário comercial
- Base de conhecimento com vídeos curtos
- Vantagem de ser pequeno: suporte pessoal e humanizado

---

### PROBLEMA 2: Sistema trava nos sábados (dia de pico)
**Fonte:** Cash Barber (múltiplos relatos de travamento aos sábados)
**Impacto:** Perda de clientes, barbeiros sem agenda, caos no atendimento

**Como o NaRegua resolve:**
- Stack Supabase com auto-scaling (PostgreSQL gerenciado)
- Frontend leve em vanilla JS (sem framework pesado)
- REST API com cache para leitura (já implementado)
- Arquitetura que aguenta pico sem infra complexa

---

### PROBLEMA 3: Dificuldade de cancelamento
**Fonte:** Cash Barber e AppBarber (clientes precisam ir presencialmente)
**Impacto:** Frustra o cliente final, gera reclamações, mancha a reputação da barbearia

**Como o NaRegua resolve:**
- Cancelamento self-service pelo link de agendamento
- Cliente cancela/remarca com 1 clique
- Notificação automática para o barbeiro
- Sem atrito = menos no-show e mais confiança

---

### PROBLEMA 4: Gateway de pagamento instável
**Fonte:** Cash Barber (migração CelCash → próprio causou bloqueio de dinheiro)
**Impacto:** Barbearias ficaram sem receber, perderam adiantamentos

**Como o NaRegua resolve:**
- Não reinventar a roda: integrar com gateways consolidados (Mercado Pago, Asaas, Stripe)
- Múltiplas opções de pagamento já suportadas (Pix, Dinheiro, Crédito, Débito)
- Transparência total: dinheiro vai direto pra conta do dono

---

### PROBLEMA 5: Sistema não serve para médio/grande porte
**Fonte:** Cash Barber (reclamação direta: "inadequado para médio/grande porte, falta relatórios completos")
**Impacto:** Barbearias em crescimento ficam sem opção e migram para ERPs genéricos

**Como o NaRegua resolve:**
- Admin panel já suporta múltiplas barbearias
- Estrutura de dados permite multi-unidade
- Financeiro com cálculo de margem de lucro, despesas por categoria
- Comissões por barbeiro já implementadas
- Relatórios que crescem junto com o negócio

---

### PROBLEMA 6: Funcionalidades prometidas que não funcionam
**Fonte:** AppBarber ("não cumpre o que promete: falhas no agendamento, estoque e controle de pacotes")
**Impacto:** Dono paga e não consegue usar o que comprou

**Como o NaRegua resolve:**
- Entregar menos, mas entregar funcionando
- Core features sólidas: agenda, equipe, serviços, financeiro
- Cada módulo testado antes de lançar
- Não prometer o que não existe

---

### PROBLEMA 7: Exposição à concorrência dentro do app
**Fonte:** AppBarber (passou a exibir barbearias concorrentes aos clientes no app)
**Impacto:** App que deveria fidelizar começa a enviar clientes pro concorrente

**Como o NaRegua resolve:**
- Link de agendamento exclusivo da barbearia (usenaregua.com.br/slug)
- O cliente vê APENAS aquela barbearia, sem diretório de concorrentes
- Marca branca: a experiência é da barbearia, não do NaRegua
- Zero competição interna entre os clientes do NaRegua

---

### PROBLEMA 8: Onboarding confuso / sem assistência
**Fonte:** Nenhum concorrente evidencia onboarding guiado
**Impacto:** Dono desiste na configuração inicial, churn no primeiro mês

**Como o NaRegua já resolve:**
- Onboarding de 3 passos já implementado (onboarding.html)
- Tipo de negócio → Horários → Serviços pré-configurados
- Serviços padrão por tipo (barbearia, manicure, salão)
- Barbeiro padrão criado automaticamente (dono com 100% comissão)
- Draft salvo em localStorage (não perde progresso)

---

### PROBLEMA 9: Abordagem comercial agressiva
**Fonte:** Cash Barber (consultores insistentes que ficam mal-educados)
**Impacto:** Má reputação, reviews negativos, desconfiança do mercado

**Como o NaRegua resolve:**
- Modelo self-service: crie sua conta grátis, teste 30 dias
- Sem equipe de vendas outbound agressiva
- Produto se vende pela qualidade e boca a boca
- Crescimento orgânico > growth hack agressivo

---

### PROBLEMA 10: Cobranças indevidas após cancelamento
**Fonte:** Cash Barber e AppBarber (cobranças recorrentes após pedido de cancelamento)
**Impacto:** Reclamações no Reclame Aqui, chargebacks, perda de confiança

**Como o NaRegua resolve:**
- Controle de subscription com data de vencimento clara (já existe no admin)
- Cancelamento imediato e transparente
- Sem renovação automática sem consentimento explícito
- Histórico de pagamentos acessível ao dono

---

### PROBLEMA 11: Sem integração com WhatsApp
**Fonte:** Gap identificado em Cash Barber e AppBarber; EiBarber e BarberCode usam como diferencial
**Impacto:** Barbeiro precisa confirmar manualmente cada agendamento

**Como o NaRegua pode resolver (futuro):**
- Lembrete automático por WhatsApp (API oficial ou Z-API)
- Confirmação de agendamento via mensagem
- Reativação de clientes inativos
- Link de agendamento compartilhável pelo WhatsApp (já funciona)

---

### PROBLEMA 12: Sem programa de fidelidade
**Fonte:** Feature presente em AppBarber e EiBarber, ausente em Cash Barber
**Impacto:** Barbearias perdem ferramenta de retenção de clientes

**Como o NaRegua pode resolver (futuro):**
- Cartão fidelidade digital (ex: a cada 10 cortes, 1 grátis)
- Pontos por serviço que viram desconto
- Visível no link de agendamento do cliente

---

## 3. Tabela de Preços do Mercado

| Sistema | Básico | Intermediário | Avançado | Trial |
|---|---|---|---|---|
| **Cash Barber** | ~R$ 250/mês (anual) | — | — | Não informado |
| **AppBarber** | R$ 56-80/mês | Mesmo preço (varia por profissionais) | — | 30 dias grátis |
| **BarberCode** | R$ 70/mês (1 prof) | R$ 90/mês (5 prof) | R$ 130/mês (12 prof) | Grátis sem cartão |
| **EiBarber** | R$ 49/mês (2 barb) | R$ 89/mês (4 barb) | R$ 139/mês (ilimitado) | 30 dias grátis |
| **NaRegua** | **A definir** | **A definir** | **A definir** | 30 dias grátis (implementado) |

### Sugestão de precificação para NaRegua

| Plano | Preço sugerido | Profissionais | Justificativa |
|---|---|---|---|
| **Starter** | R$ 49/mês | Até 2 | Abaixo do BarberCode, igual ao EiBarber. Atrai autônomos. |
| **Profissional** | R$ 89/mês | Até 6 | Preço padrão do mercado. Melhor custo-benefício. |
| **Premium** | R$ 149/mês | Ilimitado + multi-unidade | Acima da média, mas com valor real (relatórios, multi-loja). |

---

## 4. Features que o NaRegua JÁ TEM e os concorrentes falham

| Feature do NaRegua | Status | Concorrentes falham em |
|---|---|---|
| **Onboarding guiado 3 passos** | Implementado | Nenhum tem onboarding assistido visível |
| **Financeiro com margem de lucro** | Implementado | Cash Barber tem financeiro "básico" |
| **Comissão por barbeiro** | Implementado | AppBarber tem, Cash Barber tem, mas com bugs |
| **Link de agendamento exclusivo** | Implementado | AppBarber exibe concorrentes no app |
| **Admin multi-barbearia** | Implementado | Permite escalar para médio/grande porte |
| **Cancelamento self-service** | Implementado | Cash Barber exige presencial |
| **Trial 30 dias automático** | Implementado | Alinhado com mercado |
| **Mobile-first (480px)** | Implementado | Maioria tem, mas NaRegua é nativo web |
| **Despesas por categoria** | Implementado | Diferencial financeiro |

---

## 5. Features PRIORITÁRIAS para construir

| # | Feature | Por quê | Esforço |
|---|---|---|---|
| 1 | **Lembrete WhatsApp** | Todo concorrente relevante tem. Reduz no-show em 40-70%. | Médio |
| 2 | **Notificações push/email** | Confirmação de agendamento, lembrete 1h antes | Baixo |
| 3 | **Relatório semanal/mensal PDF** | Donos querem imprimir e ver evolução | Baixo |
| 4 | **Programa de fidelidade** | Diferencial de retenção, AppBarber e EiBarber já têm | Médio |
| 5 | **PWA (instalar no celular)** | Substitui app nativo com custo zero. Cash Barber tem app fraco. | Baixo |
| 6 | **Gestão de assinaturas (recorrência)** | Core do Cash Barber. Captura mercado de barbearia por assinatura. | Alto |
| 7 | **Integração Mercado Pago/Asaas** | Pagamento online direto, sem gateway caseiro. | Médio |
| 8 | **Multi-unidade (rede de lojas)** | Gap do Cash Barber. Atende médio/grande porte. | Alto |

---

## 6. Posicionamento Sugerido para o NaRegua

### Contra o Cash Barber:
> "Gestão que funciona no sábado. Suporte que responde no mesmo dia."

### Contra o AppBarber:
> "Seus clientes veem SUA barbearia, não a do concorrente."

### Contra o BarberCode/EiBarber:
> "Financeiro de verdade: receitas, despesas, margem de lucro e comissões."

### Posicionamento geral:
> **"NaRegua — Agenda e gestão premium para quem leva barbearia a sério."**
> Simples de usar. Funciona sempre. Suporte de verdade.

---

## Fontes

- [Cash Barber - Reclame Aqui](https://www.reclameaqui.com.br/empresa/cash-barber/)
- [App Barber - Reclame Aqui](https://www.reclameaqui.com.br/empresa/app-barber/)
- [BarberCode - Planos](https://barbercode.com.br/planos/)
- [EiBarber - Site](https://eibarber.com.br/)
- [AppBarber - Site](https://appbarber.com.br/)
- [AppBarber - Preços](https://appbarber-appbeleza.zendesk.com/hc/pt-br/articles/360001701331)
- [Cash Barber - Google Play](https://play.google.com/store/apps/details?id=cashbarber.app)
