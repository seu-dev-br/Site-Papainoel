# 🚀 QUICK START - Stripe Payment

**Tempo estimado: 10 minutos**

---

## ✅ Checklist Rápido

### 1. Instalar Dependências (✅ JÁ FEITO)

```bash
npm install  # Stripe já instalado
```

### 2. Criar Conta Stripe (5 min)

1. Acesse: https://dashboard.stripe.com/register
2. Preencha dados básicos
3. Pule verificação (use modo teste)
4. ✅ Conta criada!

### 3. Obter Chaves API (2 min)

1. Dashboard → **Developers** → **API keys**
2. Copie **Publishable key** (pk_test_...)
3. Clique em **"Reveal test key"**
4. Copie **Secret key** (sk_test_...)

### 4. Configurar .env.local (1 min)

Abra `.env.local` e adicione:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_AQUI
STRIPE_SECRET_KEY=sk_test_SUA_CHAVE_AQUI
```

### 5. Instalar Stripe CLI (2 min)

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux:**
```bash
# Baixe: https://github.com/stripe/stripe-cli/releases
# Extraia e adicione ao PATH
```

**Windows:**
```bash
choco install stripe-cli
# Ou baixe .exe do link acima
```

### 6. Login no Stripe CLI

```bash
stripe login
# Abrirá navegador para autorizar
```

---

## 🧪 TESTAR (AGORA!)

### Terminal 1 - Webhook:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**Copie o webhook secret** que aparece:
```
whsec_abc123...
```

**Adicione ao .env.local:**
```env
STRIPE_WEBHOOK_SECRET=whsec_abc123...
```

### Terminal 2 - Dev Server:
```bash
npm run dev
```

### Navegador:
1. Acesse: http://localhost:3000
2. Role até o formulário
3. Preencha:
   - **Nome:** João Silva
   - **Email:** teste@exemplo.com
   - **Telefone:** (11) 99999-9999
   - Clique em **"Gerar Mensagem"**
4. Clique em **"Garantir meu vídeo agora"**

### Stripe Checkout:
- **Cartão:** `4242 4242 4242 4242`
- **Data:** `12/25`
- **CVC:** `123`
- **Email:** teste@exemplo.com

### ✅ Deve Acontecer:
1. ✅ Redirecionamento para Stripe
2. ✅ Pagamento processa
3. ✅ Terminal 1 mostra evento recebido
4. ✅ Redirecionamento para /success
5. ✅ Status atualizado no Supabase

---

## 🎯 Atalho Total (Copy-Paste)

```bash
# Terminal 1
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Terminal 2 (abra outro)
npm run dev

# Acesse: http://localhost:3000
# Cartão: 4242 4242 4242 4242 | 12/25 | 123
```

---

## 🐛 Problemas?

### Erro: "Stripe not configured"
```bash
# Verifique .env.local
cat .env.local | grep STRIPE
```

### Webhook não recebe eventos
```bash
# Certifique-se que o listener está rodando
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Porta 3000 em uso
```bash
# Use 3001 no webhook
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

---

## 📚 Docs Completas

- **Setup Completo:** [STRIPE_SETUP.md](STRIPE_SETUP.md)
- **Integração:** [STRIPE_INTEGRATION.md](STRIPE_INTEGRATION.md)
- **Geral:** [SETUP.md](SETUP.md)

---

**🎄 PRONTO! Seu sistema de pagamento está funcionando! 💳**
