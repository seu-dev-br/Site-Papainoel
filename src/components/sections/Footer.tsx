/**
 * FOOTER - Rodapé com informações legais e links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          
          {/* Sobre */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              🎅 Vídeo Papai Noel
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Criamos momentos mágicos e inesquecíveis através de vídeos personalizados 
              do Papai Noel. Mais de 1.250 famílias felizes!
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-christmas-gold transition-colors">📘</a>
              <a href="#" className="text-2xl hover:text-christmas-gold transition-colors">📸</a>
              <a href="#" className="text-2xl hover:text-christmas-gold transition-colors">💬</a>
            </div>
          </div>

          {/* Links úteis */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#pricing" className="hover:text-christmas-gold transition-colors">
                  → Como Funciona
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-christmas-gold transition-colors">
                  → Fazer Pedido
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-christmas-gold transition-colors">
                  → Acompanhar Pedido
                </a>
              </li>
              <li>
                <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-christmas-gold transition-colors">
                  → Suporte WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contato e garantias */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Garantias</h3>
            <ul className="space-y-2 text-sm">
              <li>✅ Entrega em até 2 horas</li>
              <li>✅ 100% Personalizado</li>
              <li>✅ Satisfação garantida</li>
              <li>✅ Pagamento seguro</li>
              <li>✅ Dados protegidos (LGPD)</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            
            {/* Copyright */}
            <p>
              © {currentYear} Vídeo Papai Noel. Todos os direitos reservados.
            </p>

            {/* Links legais */}
            <div className="flex gap-6">
              <a href="#" className="hover:text-christmas-gold transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-christmas-gold transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-christmas-gold transition-colors">
                LGPD
              </a>
            </div>

          </div>

          {/* Selo de segurança */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              🔒 Site 100% seguro • Criptografia SSL • Pagamentos protegidos
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
