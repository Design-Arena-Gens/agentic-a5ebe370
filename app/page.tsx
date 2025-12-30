'use client'

import { useState } from 'react'
import { BookOpen, CheckCircle, Download, Mail, CreditCard, Shield, Zap } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage('Erro ao processar pagamento. Tente novamente.')
      }
    } catch (error) {
      setMessage('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Química Essencial</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              🔥 Lançamento Especial
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Domine a Química com Nosso E-book Completo
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Conteúdo prático, exercícios resolvidos e teoria explicada de forma simples.
              Perfeito para estudantes, vestibulandos e concurseiros.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">350+ Páginas de Conteúdo</p>
                  <p className="text-gray-600">Química Geral, Orgânica e Inorgânica</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">500+ Exercícios Resolvidos</p>
                  <p className="text-gray-600">Com explicação passo a passo</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Acesso Imediato</p>
                  <p className="text-gray-600">Receba o e-book direto no seu email</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Garantia de 7 Dias</p>
                  <p className="text-gray-600">100% do seu dinheiro de volta</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-5xl font-bold">R$ 47</span>
                <span className="text-gray-200 line-through text-xl">R$ 97</span>
                <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full">
                  -51% OFF
                </span>
              </div>

              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Seu melhor e-mail:
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 border-2 border-white/20 focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <span>Processando...</span>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>COMPRAR AGORA</span>
                    </>
                  )}
                </button>

                {message && (
                  <p className="text-center text-sm text-yellow-200">{message}</p>
                )}

                <div className="flex items-center justify-center space-x-4 text-sm text-white/80">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>Acesso Instantâneo</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="bg-white rounded-xl p-8 transform -rotate-3">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <BookOpen className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Química Essencial
                    </h3>
                    <p className="text-gray-600">
                      O Guia Completo para Dominar a Química
                    </p>
                    <div className="mt-6 space-y-2 text-sm text-gray-700">
                      <p>📚 350+ Páginas</p>
                      <p>✏️ 500+ Exercícios</p>
                      <p>🎯 Todos os Níveis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Por que escolher nosso E-book?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Acesso Imediato</h3>
              <p className="text-gray-600">
                Receba o e-book instantaneamente no seu email após a compra
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conteúdo Completo</h3>
              <p className="text-gray-600">
                Toda a química que você precisa em um único lugar
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantia Total</h3>
              <p className="text-gray-600">
                7 dias de garantia incondicional de devolução do dinheiro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Química Essencial. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Pagamento processado de forma segura via Stripe
          </p>
        </div>
      </footer>
    </div>
  )
}
