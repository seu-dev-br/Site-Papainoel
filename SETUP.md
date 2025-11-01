# 🚀 GUIA RÁPIDO DE SETUP
# Começar em 5 minutos!

## 1️⃣ INSTALAR DEPENDÊNCIAS

```bash
cd /home/italo/Documents/projetos/natal
npm install
```

⏱️ Tempo: 2-3 minutos

---

## 2️⃣ CONFIGURAR SUPABASE

### A) Criar Conta (Grátis)
1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Login com GitHub

### B) Criar Projeto
1. Clique em "New Project"
2. Nome: `papai-noel-videos`
3. Database Password: (escolha uma forte)
4. Region: South America (São Paulo)
5. Aguarde ~2 minutos

### C) Copiar Credenciais
1. Settings → API
2. Copie:
   - `URL` (ex: https://abc123.supabase.co)
   - `anon public` key

### D) Criar Tabela
1. SQL Editor → New Query
2. Cole o conteúdo de `supabase-schema.sql`
3. Clique em "RUN"
4. ✅ Verifique: "Success. No rows returned"

⏱️ Tempo: 3-4 minutos

---

## 🎯 Resumo Rápido

```bash
# Clone/Navegue até o projeto
cd /caminho/do/projeto

# Instale dependências
npm install

# Configure .env.local com Supabase + Stripe

# Execute o projeto
npm run dev

# Acesse: http://localhost:3000
```

---

---

## 4️⃣ RODAR LOCALMENTE

```bash
npm run dev
```

Abra: **http://localhost:3000**

✅ Deve ver a landing page completa!

⏱️ Tempo: 30 segundos

---

## 8️⃣ Teste o Pagamento Completo

### Opção A: GitHub (Recomendado)

```bash
# Criar repositório no GitHub primeiro
git init
git add .
git commit -m "Initial commit: Site Papai Noel"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/papai-noel-videos.git
git push -u origin main
```

1. Acesse: https://vercel.com
2. Login com GitHub
3. "New Project"
4. Selecione o repositório
5. Configure variáveis (mesmas do .env.local)
6. Deploy! 🚀

### Opção B: CLI

```bash
npm i -g vercel
vercel login
vercel
```

⏱️ Tempo: 3-5 minutos

---

## ✅ CHECKLIST FINAL

- [ ] `npm install` executado
- [ ] Supabase projeto criado
- [ ] Tabela `orders` criada no SQL
- [ ] `.env.local` configurado
- [ ] `npm run dev` funcionando
- [ ] Site abrindo em localhost:3000
- [ ] Deploy na Vercel OK
- [ ] Variáveis de ambiente na Vercel configuradas

---

## 🐛 PROBLEMAS COMUNS

### Erro: "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: Supabase não conecta
- Verifique URL e chave no .env.local
- Confirme que tabela foi criada
- Teste no SQL Editor: `SELECT * FROM orders;`

### Build falha
```bash
npm run build
# Veja os erros e corrija
```

---

## 📞 SUPORTE

Se tiver dúvidas:
1. Leia o README.md completo
2. Verifique os logs de erro
3. Consulte docs oficiais: next.js.org

---

**Tempo Total:** ~10-15 minutos

**Custo:** R$ 0,00 (tudo gratuito!)

🎉 **PRONTO! Seu site está no ar!**
