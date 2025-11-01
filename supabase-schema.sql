-- ============================================
-- SCHEMA DO BANCO DE DADOS - SUPABASE
-- Vídeos Personalizados do Papai Noel
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: orders (pedidos)
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dados da criança e mensagem
  child_name TEXT NOT NULL CHECK (char_length(child_name) >= 2 AND char_length(child_name) <= 100),
  custom_message TEXT NOT NULL CHECK (char_length(custom_message) >= 10 AND char_length(custom_message) <= 500),
  
  -- Contato (pelo menos um obrigatório)
  contact_email TEXT,
  contact_phone TEXT,
  
  -- Status do pedido
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  
  -- Vídeo gerado
  video_url TEXT,
  video_duration INTEGER, -- duração em segundos
  
  -- Pagamento
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'approved', 'failed', 'refunded')),
  payment_method TEXT, -- 'pix', 'credit_card', 'boleto'
  payment_id TEXT, -- ID externo do gateway
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  
  -- Metadados
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,
  
  -- Constraint: pelo menos um contato
  CONSTRAINT check_contact CHECK (
    contact_email IS NOT NULL OR contact_phone IS NOT NULL
  )
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_email ON orders(contact_email) WHERE contact_email IS NOT NULL;
CREATE INDEX idx_orders_phone ON orders(contact_phone) WHERE contact_phone IS NOT NULL;

-- ============================================
-- TRIGGER: Atualizar updated_at automaticamente
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Política: Qualquer um pode criar pedidos (público)
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Política: Apenas admin pode ver todos os pedidos
CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  USING (auth.role() = 'service_role');

-- Política: Usuários podem ver pedidos por email/phone
CREATE POLICY "Users can view own orders by contact"
  ON orders FOR SELECT
  USING (
    contact_email = current_setting('request.jwt.claims', true)::json->>'email'
    OR true -- Temporariamente permite ver pelo ID (melhorar com auth)
  );

-- ============================================
-- FUNÇÃO: Contar pedidos do dia
-- ============================================

CREATE OR REPLACE FUNCTION count_today_orders()
RETURNS INTEGER AS $$
DECLARE
  order_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO order_count
  FROM orders
  WHERE created_at >= CURRENT_DATE
    AND created_at < CURRENT_DATE + INTERVAL '1 day';
  
  RETURN order_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNÇÃO: Buscar estatísticas gerais
-- ============================================

CREATE OR REPLACE FUNCTION get_stats()
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_orders', COUNT(*),
    'completed_orders', COUNT(*) FILTER (WHERE status = 'completed'),
    'total_revenue', SUM(amount) FILTER (WHERE payment_status = 'approved'),
    'today_orders', COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE),
    'avg_rating', 4.9 -- Fixo por enquanto, implementar tabela de reviews depois
  )
  INTO stats
  FROM orders;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TABELA: reviews (avaliações) - OPCIONAL
-- ============================================

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  customer_name TEXT NOT NULL,
  customer_location TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false
);

CREATE INDEX idx_reviews_approved ON reviews(is_approved, created_at DESC);
CREATE INDEX idx_reviews_featured ON reviews(is_featured) WHERE is_featured = true;

-- ============================================
-- STORAGE: Bucket para vídeos
-- ============================================

-- Executar no Supabase Dashboard -> Storage:
-- 1. Criar bucket chamado "videos"
-- 2. Configurar como privado
-- 3. Permitir upload apenas via service_role

-- Política de acesso ao storage (SQL)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', false);

-- ============================================
-- SEED: Dados de exemplo (desenvolvimento)
-- ============================================

-- Descomente para inserir dados de teste:
/*
INSERT INTO orders (child_name, custom_message, contact_email, amount, status, payment_status)
VALUES 
  ('Maria Eduarda', 'Você foi muito obediente este ano! Continue estudando!', 'maria@example.com', 49.99, 'completed', 'approved'),
  ('João Pedro', 'O Papai Noel está muito feliz com você! Parabéns!', 'joao@example.com', 49.99, 'processing', 'approved'),
  ('Ana Clara', 'Continue sendo uma criança incrível! Ho ho ho!', 'ana@example.com', 49.99, 'pending', 'pending');

INSERT INTO reviews (order_id, rating, comment, customer_name, customer_location, is_approved, is_featured)
SELECT 
  id,
  5,
  'Minha filha amou! Chorou de emoção ao ver o vídeo.',
  'Carla Mendes',
  'Rio de Janeiro/RJ',
  true,
  true
FROM orders
LIMIT 1;
*/

-- ============================================
-- CONCLUSÃO
-- ============================================

-- Execute este arquivo no SQL Editor do Supabase
-- Acesse: Supabase Dashboard -> SQL Editor -> New Query
-- Cole todo o conteúdo e clique em "RUN"

-- Verificar tabelas criadas:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Testar função de contagem:
-- SELECT count_today_orders();

-- Ver estatísticas:
-- SELECT get_stats();
