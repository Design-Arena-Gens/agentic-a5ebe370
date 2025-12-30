import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_email || session.metadata?.email

    if (customerEmail && resend) {
      try {
        // Send email with the e-book download link
        await resend.emails.send({
          from: 'E-book Química <onboarding@resend.dev>',
          to: customerEmail,
          subject: 'Seu E-book de Química - Download Disponível! 📚',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
                .highlight { background: #e3f2fd; padding: 15px; border-left: 4px solid #667eea; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Parabéns pela sua compra!</h1>
                  <p>Seu E-book de Química está pronto para download</p>
                </div>
                <div class="content">
                  <h2>Olá! 👋</h2>
                  <p>Obrigado por adquirir o <strong>E-book de Química Essencial</strong>!</p>

                  <p>Seu pagamento foi confirmado com sucesso e agora você tem acesso completo ao conteúdo.</p>

                  <div class="highlight">
                    <strong>📚 O que você vai encontrar:</strong>
                    <ul>
                      <li>350+ páginas de conteúdo completo</li>
                      <li>Química Geral, Orgânica e Inorgânica</li>
                      <li>500+ exercícios resolvidos passo a passo</li>
                      <li>Tabelas periódicas e materiais de apoio</li>
                    </ul>
                  </div>

                  <center>
                    <a href="${process.env.NEXT_PUBLIC_URL || 'https://agentic-a5ebe370.vercel.app'}/download/${session.id}" class="button">
                      📥 BAIXAR E-BOOK AGORA
                    </a>
                  </center>

                  <p><strong>⚡ Dicas para aproveitar melhor:</strong></p>
                  <ul>
                    <li>Faça o download e guarde em um lugar seguro</li>
                    <li>Você pode imprimir ou ler no seu dispositivo favorito</li>
                    <li>Comece pelos capítulos que mais precisa estudar</li>
                    <li>Pratique com os exercícios resolvidos</li>
                  </ul>

                  <div class="highlight">
                    <strong>🛡️ Garantia de 7 dias:</strong><br>
                    Se você não ficar satisfeito com o conteúdo, devolvemos 100% do seu dinheiro. Sem perguntas!
                  </div>

                  <p>Bons estudos! 📖✨</p>

                  <p>Qualquer dúvida, é só responder este email.</p>
                </div>
                <div class="footer">
                  <p>© 2024 Química Essencial - Todos os direitos reservados</p>
                  <p>Este e-book é para uso pessoal. Distribuição não autorizada é proibida.</p>
                </div>
              </div>
            </body>
            </html>
          `,
        })

        console.log('Email enviado com sucesso para:', customerEmail)
      } catch (error) {
        console.error('Erro ao enviar email:', error)
      }
    }
  }

  return NextResponse.json({ received: true })
}
