#!/bin/bash

# 🎅 Script de Teste - Integração Stripe
# Execute este script para testar o fluxo completo

set -e  # Sair em caso de erro

echo "🎄 Iniciando testes da integração Stripe..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função de sucesso
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Função de erro
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Função de info
info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 1. Verificar dependências
echo "1️⃣ Verificando dependências..."
if npm list stripe &>/dev/null && npm list @stripe/stripe-js &>/dev/null; then
    success "Pacotes Stripe instalados"
else
    error "Pacotes Stripe não encontrados"
    echo "Execute: npm install"
    exit 1
fi

# 2. Verificar variáveis de ambiente
echo ""
echo "2️⃣ Verificando variáveis de ambiente..."

if [ ! -f .env.local ]; then
    error "Arquivo .env.local não encontrado"
    echo "Copie .env.example para .env.local e configure"
    exit 1
fi

# Verificar chaves Stripe
if grep -q "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_" .env.local; then
    success "Chave publicável Stripe configurada"
else
    error "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY não configurada"
    exit 1
fi

if grep -q "STRIPE_SECRET_KEY=sk_test_" .env.local; then
    success "Chave secreta Stripe configurada"
else
    error "STRIPE_SECRET_KEY não configurada"
    exit 1
fi

# 3. Verificar Stripe CLI
echo ""
echo "3️⃣ Verificando Stripe CLI..."
if command -v stripe &>/dev/null; then
    success "Stripe CLI instalado"
    
    # Verificar se está logado
    if stripe --version &>/dev/null; then
        success "Stripe CLI pronto"
    else
        info "Execute: stripe login"
    fi
else
    error "Stripe CLI não instalado"
    echo ""
    echo "Instale com:"
    echo "  macOS: brew install stripe/stripe-cli/stripe"
    echo "  Linux: https://github.com/stripe/stripe-cli/releases"
    exit 1
fi

# 4. Verificar portas disponíveis
echo ""
echo "4️⃣ Verificando portas..."
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    info "Porta 3000 em uso (será usado 3001)"
else
    success "Porta 3000 disponível"
fi

# 5. Instruções para teste
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Pronto para testar! Siga os passos:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 TERMINAL 1 (Webhook Listener):"
echo "   stripe listen --forward-to localhost:3000/api/webhooks/stripe"
echo ""
echo "📋 TERMINAL 2 (Dev Server):"
echo "   npm run dev"
echo ""
echo "📋 NAVEGADOR:"
echo "   1. Acesse: http://localhost:3000"
echo "   2. Preencha o formulário"
echo "   3. Clique em 'Garantir meu vídeo agora'"
echo "   4. Use cartão de teste:"
echo "      • Número: 4242 4242 4242 4242"
echo "      • Data: 12/25"
echo "      • CVC: 123"
echo "   5. Complete o pagamento"
echo ""
echo "📋 VERIFICAÇÕES:"
echo "   ✓ Terminal 1 deve mostrar webhook recebido"
echo "   ✓ Status no Supabase deve mudar para 'processing'"
echo "   ✓ Redirecionamento para /success com confirmação"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

success "Tudo pronto! Boa sorte com os testes! 🎅🎄"
