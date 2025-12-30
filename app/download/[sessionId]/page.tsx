'use client'

import { useEffect, useState } from 'react'
import { Download, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function DownloadPage({ params }: { params: { sessionId: string } }) {
  const [verified, setVerified] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real implementation, verify the session with Stripe
    // For demo purposes, we'll simulate verification
    const timer = setTimeout(() => {
      setVerified(true)
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [params.sessionId])

  const handleDownload = () => {
    // In production, this would be a secure download link
    // For demo, we'll show a message
    alert('Em produção, o download do PDF iniciaria automaticamente aqui.\n\nVocê precisará:\n1. Fazer upload do seu e-book PDF\n2. Usar um serviço de armazenamento seguro (AWS S3, Google Cloud Storage)\n3. Gerar links assinados temporários para cada download')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando seu acesso...</p>
        </div>
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acesso Negado
          </h1>
          <p className="text-gray-600 mb-6">
            Não foi possível verificar seu acesso. Verifique o link no email que você recebeu.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Seu E-book está Pronto! 📚
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Clique no botão abaixo para fazer o download do seu e-book de Química.
          </p>

          <button
            onClick={handleDownload}
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 px-10 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all mb-8 text-lg"
          >
            <Download className="h-6 w-6" />
            <span>BAIXAR E-BOOK (PDF)</span>
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              📖 Como usar seu e-book:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Salve o arquivo em um local seguro no seu computador</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Você pode ler em qualquer leitor de PDF (Adobe Reader, navegador, etc.)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>É permitido imprimir para uso pessoal</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-600">•</span>
                <span>Você pode acessar este link sempre que precisar</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-3">
              💡 Dicas de Estudo:
            </h3>
            <div className="text-left text-gray-700 space-y-2">
              <p>1. Comece pelos conceitos fundamentais nos primeiros capítulos</p>
              <p>2. Faça os exercícios após cada seção teórica</p>
              <p>3. Use a tabela periódica como referência constante</p>
              <p>4. Revise os exercícios resolvidos para entender a metodologia</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-4">
              Problemas com o download? Responda o email que enviamos para você.
            </p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
