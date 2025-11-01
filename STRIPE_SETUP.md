# 💳 Configuração Completa do Stripe

Guia passo a passo para configurar pagamentos com Stripe no seu site de vídeos personalizados.

---

## 📋 Índice

1. [Criar Conta no Stripe](#1-criar-conta-no-stripe)
2. [Obter Chaves de API](#2-obter-chaves-de-api)
3. [Configurar Variáveis de Ambiente](#3-configurar-variáveis-de-ambiente)
4. [Configurar Webhook](#4-configurar-webhook)
5. [Testar Pagamento](#5-testar-pagamento)
6. [Preparar para Produção](#6-preparar-para-produção)

---

## 1️⃣ Criar Conta no Stripe

### Passo 1: Acesse o Stripe
1. Vá para: https://dashboard.stripe.com/register
2. Preencha seus dados:
   - Email
   - Nome completo
   - Senha segura
3. Clique em **"Criar sua conta Stripe"**

### Passo 2: Ative o Modo de Teste
- Após login, verifique se está em **"Modo de teste"** (canto superior direito)
- ⚠️ **IMPORTANTE**: Use modo de teste para desenvolvimento!

---

## 2️⃣ Obter Chaves de API

### Chave Publicável (Frontend)
1. No Dashboard, vá para: **Developers → API keys**
2. Encontre a seção **"Standard keys"**
3. Copie a **"Publishable key"** (começa com `pk_test_...`)
4. Cole no arquivo `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
   ```

### Chave Secreta (Backend)
1. Na mesma página, encontre **"Secret key"**
2. Clique em **"Reveal test key"**
3. Copie a chave (começa com `sk_test_...`)
4. ⚠️ **NUNCA compartilhe esta chave!**
5. Cole no arquivo `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
   ```

---

## 3️⃣ Configurar Variáveis de Ambiente

### Edite o arquivo `.env.local`:

```env
# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC...
STRIPE_SECRET_KEY=sk_test_51ABC...
STRIPE_WEBHOOK_SECRET=whsec_... # Vamos configurar no próximo passo

# Site URL (importante para redirecionamentos)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Preço do vídeo (em reais)
NEXT_PUBLIC_VIDEO_PRICE=49.99
```

### ⚠️ Checklist de Segurança:
- ✅ `.env.local` está no `.gitignore` (já configurado)
- ✅ Nunca commite chaves secretas no Git
- ✅ Use variáveis `NEXT_PUBLIC_*` apenas para chaves públicas

---

## 4️⃣ Configurar Webhook

### O que é um Webhook?
O Stripe envia notificações para sua aplicação quando algo acontece (ex: pagamento aprovado, falha, etc).

### Configuração Local (Desenvolvimento)

#### Opção A: Stripe CLI (Recomendado)
1. **Instale o Stripe CLI**:
   ```bash
   # Linux/Mac
   brew install stripe/stripe-cli/stripe
   
   # Windows (Chocolatey)
   choco install stripe-cli
   
   # Ou baixe: https://github.com/stripe/stripe-cli/releases
   ```

2. **Login no Stripe**:
   ```bash
   stripe login
   ```

3. **Encaminhe eventos para sua aplicação**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Copie o webhook secret** (aparece no terminal):
   ```
   Ready! Your webhook signing secret is whsec_... (^C to quit)
   ```

5. **Cole no `.env.local`**:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

#### Opção B: Ngrok (Alternativa)
1. Instale ngrok: https://ngrok.com/download
2. Execute:
   ```bash
   ngrok http 3000
   ```
3. Configure webhook no Dashboard do Stripe com a URL do ngrok

### Configuração Produção (Vercel/Deploy)

1. No Dashboard Stripe: **Developers → Webhooks**
2. Clique em **"Add endpoint"**
3. Digite a URL: `https://seu-dominio.com/api/webhooks/stripe`
4. Selecione eventos:
   - ✅ `checkout.session.completed`
   - ✅ `checkout.session.expired`
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
5. Clique em **"Add endpoint"**
6. Copie o **"Signing secret"** e adicione nas variáveis de ambiente do Vercel

---

## 5️⃣ Testar Pagamento

### Cartões de Teste do Stripe

Use estes cartões **APENAS em modo de teste**:

| Situação | Número do Cartão | CVC | Data |
|----------|------------------|-----|------|
| ✅ Sucesso | `4242 4242 4242 4242` | Qualquer | Futuro |
| ❌ Falha (Cartão recusado) | `4000 0000 0000 0002` | Qualquer | Futuro |
| 🔐 Requer autenticação | `4000 0025 0000 3155` | Qualquer | Futuro |

### Fluxo de Teste:

1. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

2. **Em outro terminal, inicie o webhook listener**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Acesse**: http://localhost:3000

4. **Preencha o formulário**:
   - Nome da pessoa: "Teste Silva"
   - Email: teste@exemplo.com
   - Telefone: (11) 99999-9999
   - Mensagem: Clique em "Gerar Mensagem"

5. **Clique em "Garantir meu vídeo agora"**

6. **Na página do Stripe**:
   - Cartão: `4242 4242 4242 4242`
   - Data: Qualquer data futura
   - CVC: `123`
   - Email: teste@exemplo.com

7. **Complete o pagamento**

8. **Verifique**:
   - ✅ Redirecionamento para `/success`
   - ✅ Webhook recebido no terminal
   - ✅ Status do pedido atualizado no Supabase

---

## 6️⃣ Preparar para Produção

### Checklist de Produção:

#### 1. Ative sua conta Stripe
- Complete o cadastro completo (dados bancários, documentos)
- Ative o modo **Live** no Dashboard

#### 2. Obtenha chaves de produção
- Troque `pk_test_...` por `pk_live_...`
- Troque `sk_test_...` por `sk_live_...`

#### 3. Configure variáveis no Vercel
```bash
# Na raiz do projeto
vercel env add STRIPE_SECRET_KEY
# Cole a chave LIVE (sk_live_...)

vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# Cole a chave LIVE pública (pk_live_...)

vercel env add STRIPE_WEBHOOK_SECRET
# Cole o webhook secret de PRODUÇÃO
```

#### 4. Configure webhook de produção
- Endpoint: `https://seu-dominio.vercel.app/api/webhooks/stripe`
- Mesmos eventos do teste

#### 5. Atualize URLs no código
```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

#### 6. Teste com cartão real
- ⚠️ **IMPORTANTE**: Faça um pedido real de teste
- Verifique se o valor é cobrado
- Verifique se o webhook funciona
- Depois, faça um reembolso total no Dashboard

---

## 🎯 Fluxo Completo de Pagamento

```
1. Usuário preenche formulário
   ↓
2. Frontend cria pedido no Supabase (status: "pending")
   ↓
3. Frontend chama API: POST /api/checkout
   ↓
4. Backend cria sessão Stripe
   ↓
5. Usuário é redirecionado para checkout.stripe.com
   ↓
6. Usuário preenche dados do cartão
   ↓
7. Stripe processa pagamento
   ↓
8. Stripe envia webhook para /api/webhooks/stripe
   ↓
9. Webhook atualiza pedido no Supabase (status: "processing")
   ↓
10. Usuário é redirecionado para /success
   ↓
11. Você recebe notificação para gerar o vídeo!
```

---

## 🔧 Troubleshooting

### Erro: "Stripe não configurado"
**Solução**: Verifique se as variáveis de ambiente estão corretas no `.env.local`

### Webhook não recebe eventos
**Solução**: 
- Verifique se `stripe listen` está rodando
- Confirme que o webhook secret está correto
- Veja logs no terminal do Stripe CLI

### Pagamento não atualiza status
**Solução**:
- Verifique logs do webhook: `stripe logs tail`
- Confirme se Supabase está configurado
- Verifique se a função `updateOrderStatus` funciona

### Erro: "Invalid API version"
**Solução**: Atualize a versão da API no `stripe-server.ts` para a mais recente

---

## 📚 Recursos Úteis

- **Dashboard Stripe**: https://dashboard.stripe.com
- **Documentação**: https://stripe.com/docs
- **Cartões de Teste**: https://stripe.com/docs/testing
- **Stripe CLI**: https://stripe.com/docs/stripe-cli
- **Webhooks Guide**: https://stripe.com/docs/webhooks

---

## 💰 Taxas do Stripe (Brasil)

- **Taxa por transação**: 3.99% + R$ 0,39
- **Sem mensalidade**
- **Repasses**: D+30 (após aprovação da conta)

### Exemplo de Cálculo:
- Venda: R$ 49,99
- Taxa Stripe: R$ 2,39 (R$ 1,99 + R$ 0,39)
- **Você recebe**: R$ 47,60

---

## ✅ Próximos Passos

Após configurar o Stripe:

1. [ ] Configure email de confirmação (Resend ou SendGrid)
2. [ ] Implemente geração/envio de vídeo
3. [ ] Configure monitoramento (Sentry, LogRocket)
4. [ ] Adicione analytics (Google Analytics, Meta Pixel)
5. [ ] Configure domínio personalizado
6. [ ] Ative SSL/HTTPS (automático no Vercel)

---

**🎄 Pronto! Seu sistema de pagamento está configurado e pronto para vender vídeos do Papai Noel! 🎅**
