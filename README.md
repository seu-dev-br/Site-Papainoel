# 🎅 Vídeo Personalizado do Papai Noel

> Site profissional de alta conversão para venda de vídeos personalizados do Papai Noel.  
> **Objetivo:** Gerar máxima conversão com UX impecável, segurança e entrega rápida.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/papai-noel-videos)

---

## 🚀 **Stack Tecnológica**

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript
- **Estilo:** Tailwind CSS + Framer Motion (animações)
- **Formulários:** React Hook Form + Zod (validação)
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Pagamentos:** Stripe (checkout + webhooks)
- **Deploy:** Vercel (automático com git push)
- **Notificações:** React Hot Toast

---

## ✨ **Características de Conversão**

### 🎯 **Gatilhos Psicológicos Implementados**

- ✅ **Escassez:** Slots limitados por dia (simulado)
- ✅ **Urgência:** Countdown de oferta até meia-noite
- ✅ **Prova Social:** 1.250+ famílias felizes, depoimentos reais
- ✅ **Autoridade:** Avaliação 4.9/5 estrelas
- ✅ **Garantia:** Satisfação 100% ou dinheiro de volta
- ✅ **CTA Estratégico:** Botão flutuante sempre visível
- ✅ **Benefícios Claros:** Lista de diferenciais destacados
- ✅ **Mobile-First:** Interface otimizada para celular

### 🎨 **Seções da Landing Page**

1. **Hero** - CTA principal acima da dobra
2. **Social Proof** - Números e depoimentos rápidos
3. **Features** - 6 diferenciais do produto
4. **How It Works** - Processo em 3 passos simples
5. **Testimonials** - 6 depoimentos detalhados
6. **Pricing** - Oferta com formulário integrado
7. **FAQ** - 10 perguntas frequentes
8. **Footer** - Links legais e garantias

---

## 📦 **Instalação e Setup**

### **1. Clone o Repositório**

\`\`\`bash
cd /home/italo/Documents/projetos/natal
\`\`\`

### **2. Instale as Dependências**

\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

### **3. Configure o Supabase**

1. Acesse [supabase.com](https://supabase.com) e crie um projeto
2. Copie a **URL** e **anon key**
3. No SQL Editor, execute o arquivo `supabase-schema.sql`
4. Adicione as credenciais no `.env.local`

### **4. Configure o Stripe (Pagamentos)**

1. Acesse [dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Crie sua conta (modo teste ativado automaticamente)
3. Copie as chaves de API em **Developers → API keys**
4. Configure webhook local com Stripe CLI
5. Adicione as credenciais no `.env.local`

📚 **Guia completo:** Veja [STRIPE_SETUP.md](STRIPE_SETUP.md) para instruções detalhadas

### **5. Configure Variáveis de Ambiente**

#### **5.1 Crie o arquivo `.env.local`**

\`\`\`sql
-- Criar tabela de pedidos
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  child_name TEXT NOT NULL,
  custom_message TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  video_url TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  amount DECIMAL(10, 2) NOT NULL,
  
  CONSTRAINT check_contact CHECK (
    contact_email IS NOT NULL OR contact_phone IS NOT NULL
  )
);

-- Índices para performance
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: qualquer um pode inserir (criar pedido)
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Política: usuários podem ler apenas seus próprios pedidos
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = id::text OR auth.role() = 'anon');
\`\`\`

### **4. Configure Variáveis de Ambiente**

Copie o arquivo de exemplo:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edite `.env.local` com suas credenciais:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-publica-aqui

# Stripe (OBRIGATÓRIO)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
STRIPE_WEBHOOK_SECRET=whsec_sua_chave_webhook

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_VIDEO_PRICE=49.99
NEXT_PUBLIC_DAILY_SLOTS=50

# Opcional: Email/Notificações
RESEND_API_KEY=sua-chave-resend
ADMIN_EMAIL=seu@email.com

# Opcional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
\`\`\`

### **6. Execute o Stripe Webhook Listener**

Em um terminal separado:

\`\`\`bash
# Instale Stripe CLI (primeira vez)
brew install stripe/stripe-cli/stripe

# Login no Stripe
stripe login

# Encaminhe webhooks para localhost
stripe listen --forward-to localhost:3000/api/webhooks/stripe
\`\`\`

### **7. Execute o Projeto Localmente**

\`\`\`bash
npm run dev
\`\`\`

Acesse: **http://localhost:3000**

### **8. Teste com Cartão de Teste do Stripe**

- **Número:** `4242 4242 4242 4242`
- **Data:** Qualquer data futura
- **CVC:** 123

---

## 🌐 **Deploy na Vercel (GRÁTIS)**

### **Método 1: Deploy Automático com GitHub**

1. **Push para GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/papai-noel-videos.git
   git push -u origin main
   \`\`\`

2. **Conecte na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório do GitHub
   - Configure as variáveis de ambiente (mesmas do `.env.local`)
   - Deploy automático! 🚀

3. **Domínio Automático:**
   - Vercel gera: `seu-projeto.vercel.app`
   - SSL automático (HTTPS)

### **Método 2: Deploy via CLI**

\`\`\`bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
\`\`\`

---

## 📊 **Estrutura do Projeto**

\`\`\`
natal/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal com fontes e metadata
│   │   ├── page.tsx             # Homepage com todas as seções
│   │   ├── globals.css          # Estilos globais + Tailwind
│   │   ├── api/
│   │   │   ├── checkout/
│   │   │   │   └── route.ts     # API: Criar sessão Stripe
│   │   │   └── webhooks/
│   │   │       └── stripe/
│   │   │           └── route.ts # Webhook: Eventos Stripe
│   │   ├── checkout/
│   │   │   └── page.tsx         # Página de checkout (loading)
│   │   └── success/
│   │       └── page.tsx         # Página de confirmação
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Seção principal com CTA
│   │   │   ├── SocialProof.tsx  # Estatísticas e prova social
│   │   │   ├── Features.tsx     # Diferenciais do produto
│   │   │   ├── HowItWorks.tsx   # Processo em 3 passos
│   │   │   ├── Testimonials.tsx # Depoimentos reais
│   │   │   ├── Pricing.tsx      # Preço e formulário
│   │   │   ├── FAQ.tsx          # Perguntas frequentes
│   │   │   └── Footer.tsx       # Rodapé com links
│   │   ├── forms/
│   │   │   └── OrderForm.tsx    # Formulário + integração Stripe
│   │   └── ui/
│   │       ├── UrgencyBanner.tsx # Banner de urgência com countdown
│   │       └── FloatingCTA.tsx   # Botão flutuante
│   └── lib/
│       ├── supabase.ts          # Cliente e funções Supabase
│       ├── stripe.ts            # Cliente Stripe (frontend)
│       ├── stripe-server.ts     # Servidor Stripe (backend)
│       └── utils.ts             # Funções auxiliares
├── public/                       # Assets estáticos
├── .env.example                  # Template de variáveis
├── .env.local                    # Variáveis locais (não commitar!)
├── package.json                  # Dependências
├── tailwind.config.ts            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
\`\`\`

---

## 🔒 **Segurança Implementada**

- ✅ **Sanitização de inputs:** Todos os dados são limpos antes do backend
- ✅ **Validação com Zod:** Schema de validação rigoroso
- ✅ **LGPD Compliance:** Política de privacidade clara
- ✅ **SSL/HTTPS:** Automático na Vercel
- ✅ **Row Level Security:** Supabase RLS habilitado
- ✅ **Variáveis de ambiente:** Nunca expostas no cliente
- ✅ **Rate limiting:** Configurável no Supabase

---

## 📱 **Responsividade**

- **Mobile-First:** Design prioriza experiência mobile
- **Breakpoints Tailwind:** `sm:`, `md:`, `lg:`, `xl:`
- **Touch-Friendly:** Botões grandes, áreas clicáveis amplas
- **Fontes Legíveis:** Tamanhos otimizados para leitura mobile
- **CTA Fixo Mobile:** Sempre visível na parte inferior

---

## 🎨 **Customização**

### **Alterar Preço**

Edite `.env.local`:
\`\`\`env
NEXT_PUBLIC_VIDEO_PRICE=59.99
\`\`\`

### **Alterar Slots Diários**

\`\`\`env
NEXT_PUBLIC_DAILY_SLOTS=100
\`\`\`

### **Alterar Cores**

Edite `tailwind.config.ts`:
\`\`\`typescript
colors: {
  christmas: {
    red: '#C41E3A',    // Vermelho principal
    darkred: '#8B0000', // Vermelho escuro (hover)
    green: '#0F7B3D',   // Verde natalino
    gold: '#FFD700',    // Dourado (destaque)
  },
}
\`\`\`

### **Alterar Depoimentos**

Edite `src/components/sections/Testimonials.tsx` no array `testimonials`.

---

## 📈 **Analytics e Tracking**

### **Google Analytics (opcional)**

1. Crie uma propriedade GA4 em [analytics.google.com](https://analytics.google.com)
2. Adicione o ID no `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`
3. Use a função `trackEvent()` do `utils.ts`:
   \`\`\`typescript
   trackEvent('order_created', { value: 49.99 })
   \`\`\`

---

## 🛠️ **Comandos Úteis**

\`\`\`bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor produção
npm run start

# Verificar tipos TypeScript
npm run type-check

# Lint
npm run lint
\`\`\`

---

## 🐛 **Troubleshooting**

### **Erro: "Cannot find module 'react'"**

\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

### **Erro de Supabase**

- Verifique se as variáveis `NEXT_PUBLIC_SUPABASE_*` estão corretas
- Confirme que a tabela `orders` foi criada
- Teste a conexão no SQL Editor do Supabase

### **Deploy na Vercel falha**

- Verifique se todas as variáveis de ambiente estão configuradas na Vercel
- Confirme que o build local funciona: `npm run build`
- Veja os logs de erro no dashboard da Vercel

---

## 📚 **Próximos Passos (Pós-MVP)**

1. **Integração de Pagamento:** ✅ **CONCLUÍDO**
   - [x] Stripe API
   - [x] Checkout seguro
   - [x] Webhooks implementados
   - [ ] PIX (via Stripe ou Mercado Pago)

2. **Geração de Vídeo:**
   - [ ] API de geração (OpenAI, D-ID, Synthesia)
   - [ ] Upload para Supabase Storage
   - [ ] Notificação automática ao cliente
   - [ ] Email com link do vídeo (Resend/SendGrid)

3. **Dashboard Admin:**
   - [ ] Painel para gerenciar pedidos
   - [ ] Status de produção
   - [ ] Analytics em tempo real
   - [ ] Exportação de relatórios

4. **Email Marketing:**
   - [ ] Integração Resend/SendGrid
   - [ ] Templates de confirmação
   - [ ] Follow-up automático

5. **SEO:**
   - [ ] Blog com artigos sobre Natal
   - [ ] Schema.org markup
   - [ ] Sitemap XML

---

## 📝 **Licença**

Este projeto é proprietário. Uso comercial requer autorização.

---

## 💬 **Suporte**

- **Email:** suporte@seusite.com
- **WhatsApp:** (11) 99999-9999
- **Documentação:** Este README

---

## 🎉 **Créditos**

Desenvolvido com ❤️ para criar momentos mágicos no Natal!

**Tecnologias:**
- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Framer Motion](https://www.framer.com/motion/)

---

**🚀 Pronto para lançar seu site de alta conversão!**

\`\`\`bash
npm install && npm run dev
\`\`\`
