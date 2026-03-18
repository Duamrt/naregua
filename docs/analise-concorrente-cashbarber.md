# Análise Técnica de Produto SaaS — Cash Barber

> **Data da análise:** 18/03/2026
> **Concorrente:** Cash Barber (sistemacashbarber.com.br)
> **Segmento:** SaaS B2B — Gestão de Barbearias por Assinatura

---

## 1. Visão Geral do Produto

| Item | Detalhe |
|---|---|
| **Nome** | Cash Barber |
| **Posicionamento** | "O App Oficial da Barbearia por Assinatura" |
| **Empresa** | Podium Educação LTDA (CNPJ: 47.4.192/0001-06) |
| **Fundador** | @lincohnagner |
| **Base de clientes** | +3.000 barbearias ativas (declarado) |
| **Modelo de negócio** | SaaS B2B com cobrança anual |
| **Preço** | ~R$ 3.000/ano (~R$ 250/mês) |

---

## 2. Arquitetura de Produto (Multi-tenant)

### 2.1 Plataformas e Domínios

O Cash Barber opera com uma arquitetura multi-plataforma separada por subdomínios:

| Plataforma | URL | Público | Stack |
|---|---|---|---|
| Landing Page / Marketing | sistemacashbarber.com.br | Prospects | WordPress/LP |
| Painel Administrativo | painel.cashbarber.com.br | Donos de barbearia | SPA (JavaScript required) |
| Módulo Barbeiro | barbeiro.cashbarber.com.br | Barbeiros/profissionais | SPA (JavaScript required) |
| Portal Admin Interno | admin.cashbarber.com.br | Equipe Cash Barber | SPA (JavaScript required) |
| Agendamento Cliente | cashbarber.com.br | Clientes finais | Web App |
| App Mobile (Android) | Google Play: `cashbarber.app` | Clientes finais | App nativo/híbrido |
| App Mobile (iOS) | App Store: ID 6748668481 | Clientes finais | App nativo/híbrido |

### 2.2 Stack Técnico (inferido)

| Camada | Tecnologia |
|---|---|
| **Frontend (painéis)** | SPA JavaScript (provavelmente React ou Vue) |
| **App Mobile** | Provavelmente híbrido (APK ~27MB, publicado por Mmtools/One Beleza) |
| **Backend** | Não exposto publicamente |
| **Gateway de pagamento** | Próprio (migrado do Celcoin/CelCash) |
| **Hospedagem** | Cloudflare (WAF ativo — retorna 403 para scrapers) |

### 2.3 App Mobile — Dados Técnicos

| Métrica | Valor |
|---|---|
| **Pacote Android** | `cashbarber.app` |
| **Tamanho APK** | 27.07 MB |
| **Versão** | 2.0.0 |
| **Downloads (30 dias)** | ~250 |
| **Última atualização** | Ago/2025 |
| **Publisher** | Mmtools Consultoria e Projetos de Informatica Ltda / One Beleza |
| **iOS App ID** | 6748668481 |
| **Avaliações App Store** | Insuficientes para exibir média |
| **Preço** | Gratuito (freemium para cliente final) |

---

## 3. Módulos Funcionais

### 3.1 Core Features

| Módulo | Descrição | Maturidade |
|---|---|---|
| **Agendamento Online** | Cliente agenda pelo app/web com profissional específico | Alta |
| **Gestão de Assinaturas** | Controle de planos recorrentes, renovação automática, precificação | Alta (core do produto) |
| **Dashboard/Relatórios** | KPIs, métricas de performance, indicadores de gestão | Média |
| **Gestão de Barbeiros** | Cadastro, comissões, agenda individual | Alta |
| **Gateway de Pagamento** | Processamento próprio (Pix, cartão, boleto) | Média (migração recente) |
| **Comunicação** | Notificações, lembretes de agendamento | Média |
| **Histórico de Atendimentos** | Registro de serviços por cliente | Básica |
| **Controle de Estoque** | Gestão de produtos | Básica |

### 3.2 Modelo de Usuários (Multi-persona)

```
┌─────────────────────────────────────────────────┐
│                   CASH BARBER                    │
├──────────┬──────────────┬───────────┬───────────┤
│  Admin   │  Dono de     │  Barbeiro │  Cliente  │
│ (interno)│  Barbearia   │           │  Final    │
├──────────┼──────────────┼───────────┼───────────┤
│ admin.   │ painel.      │ barbeiro. │ app +     │
│ cashbar  │ cashbarber   │ cashbarber│ cashbarber│
│ ber.com  │ .com.br      │ .com.br   │ .com.br   │
└──────────┴──────────────┴───────────┴───────────┘
```

---

## 4. Modelo de Negócio e Monetização

### 4.1 Revenue Streams

| Stream | Descrição |
|---|---|
| **Assinatura SaaS** | ~R$ 3.000/ano por barbearia |
| **Gateway de Pagamento** | Provável take rate sobre transações processadas |
| **Módulos adicionais** | Funcionalidades complementares com cobrança extra (mencionado nos termos) |

### 4.2 Estimativa de Revenue (baseado em dados públicos)

```
Cenário conservador:
  3.000 barbearias × R$ 3.000/ano = R$ 9.000.000/ano (R$ 750k MRR)

Cenário com churn de 30%:
  ~2.100 barbearias ativas pagantes = R$ 6.300.000/ano (R$ 525k MRR)
```

### 4.3 Modelo de Responsabilidade

A Cash Barber se posiciona como **intermediadora tecnológica**, não como detentora da relação comercial com o cliente final:
- Não comercializa planos ao consumidor final
- Não recebe os valores pagos pelas assinaturas
- Todo valor é transacionado diretamente para a barbearia
- A gestão de cobrança e renovação é responsabilidade da barbearia

---

## 5. Métricas de Reputação (Reclame Aqui)

| Métrica | Valor |
|---|---|
| **Reputação** | Não definida (< 10 avaliações calculáveis) |
| **Reclamações (12 meses)** | 38 |
| **Taxa de resposta** | 92,1% |
| **Nota média consumidores** | 4.7/10 |
| **Índice de resolução** | 50% |
| **Voltariam a fazer negócio** | 50% |
| **Tempo médio de resposta** | 28 dias e 11 horas |

### 5.1 Top Reclamações (Pain Points)

| # | Problema | Frequência | Severidade |
|---|---|---|---|
| 1 | **Suporte lento/inexistente** | Muito alta | Crítica |
| 2 | **Travamentos em dias de pico (sábados)** | Alta | Crítica |
| 3 | **Falhas no gateway de pagamento** | Alta | Crítica |
| 4 | **Dificuldade de cancelamento** | Média | Alta |
| 5 | **Sistema inadequado para médio/grande porte** | Média | Alta |
| 6 | **Cobranças indevidas pós-cancelamento** | Média | Alta |
| 7 | **Abordagem comercial agressiva** | Média | Média |
| 8 | **Renovação automática falha** | Média | Crítica |

---

## 6. Análise de Go-to-Market

### 6.1 Aquisição

| Canal | Status |
|---|---|
| **Google Ads** | Ativo (UTMs confirmam campanhas de search) |
| **Instagram** | @sistemacashbarber (~9.500 seguidores) — conteúdo educativo |
| **Vendas outbound** | Ativo (relatos de abordagem comercial agressiva por consultores) |
| **Comunidade** | Se posiciona como "o sistema que mais escuta a comunidade" |

### 6.2 Estratégia de Conteúdo

- Foco em **educação sobre modelo de assinatura** para barbearias
- Criador (@lincohnagner) como autoridade/influenciador do nicho
- Narrativa: "mesmas ferramentas das barbearias que faturam milhões"

---

## 7. Análise SWOT do Concorrente

### Forças
- First-mover no nicho de "barbearia por assinatura"
- Base significativa (+3.000 barbearias)
- Gateway de pagamento próprio (verticalização)
- Arquitetura multi-persona bem definida
- Marca reconhecida no nicho

### Fraquezas
- Suporte ao cliente extremamente deficiente (28 dias para responder)
- Instabilidade do sistema em horários de pico
- App mobile com baixo engajamento (~250 downloads/mês)
- Sem avaliações suficientes nas app stores
- Migração de gateway (CelCash → próprio) causou problemas
- Sistema considerado inadequado para médio/grande porte
- Preço relativamente alto (~R$ 250/mês) para o nível de serviço

### Oportunidades (para Naregua)
- Capturar barbearias insatisfeitas com suporte
- Oferecer sistema estável e escalável (sem travamentos em pico)
- Modelo de preço mais competitivo ou com melhor custo-benefício
- Atender médio/grande porte (gap do Cash Barber)
- Cancelamento transparente e self-service
- Onboarding superior e suporte humanizado

### Ameaças
- Cash Barber pode melhorar seus pontos fracos
- Outros concorrentes no mercado (AppBarber, BarberFlow, BarberCode, EiBarber)
- Efeito de rede/comunidade do fundador

---

## 8. Comparativo Técnico: Cash Barber vs Naregua

| Feature | Cash Barber | Naregua |
|---|---|---|
| Agendamento online | Sim | Sim |
| Gestão de assinaturas | Core feature | A definir |
| Dashboard/KPIs | Sim | Sim |
| Multi-persona (dono/barbeiro/cliente) | Sim | Sim |
| App mobile | Sim (Android + iOS) | A desenvolver |
| Gateway próprio | Sim (recente) | A definir |
| Onboarding guiado | Não evidenciado | Sim (onboarding.html) |
| Gestão financeira | Básica | Sim (financeiro.html) |
| Gestão de equipe | Sim | Sim (equipe.html) |
| Estabilidade (pico) | Problemas relatados | Oportunidade |
| Suporte | Crítico (~28 dias) | Oportunidade |

---

## 9. Recomendações Estratégicas para o Naregua

### Curto Prazo (Quick Wins)
1. **Suporte como diferencial** — SLA de resposta < 4h
2. **Onboarding assistido** — já existe `onboarding.html`, evoluir com wizard
3. **Estabilidade garantida** — infraestrutura que escale em dias de pico

### Médio Prazo
4. **Módulo de assinaturas** — funcionalidade core que o Cash Barber domina
5. **App mobile** — PWA primeiro, nativo depois
6. **Integração com gateways confiáveis** — Stripe, Mercado Pago, Asaas

### Longo Prazo
7. **Atender médio/grande porte** — gap identificado no Cash Barber
8. **Gateway próprio** — verticalizar receita com take rate
9. **Programa de migração** — facilitar saída do Cash Barber para o Naregua
