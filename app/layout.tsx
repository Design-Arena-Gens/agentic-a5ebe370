import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-book de Química - Aprenda Química de Forma Prática',
  description: 'E-book completo de Química com conteúdo prático e exercícios resolvidos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
