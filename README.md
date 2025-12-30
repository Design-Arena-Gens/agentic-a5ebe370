# 📚 Plataforma de Vendas de E-book - Química Essencial

Plataforma completa e automatizada para venda de e-books com integração de pagamentos via Stripe e entrega automática por e-mail.

## 🚀 Funcionalidades

- ✅ **Landing page profissional** otimizada para conversão
- 💳 **Pagamentos seguros** via Stripe (aceita cartões de crédito)
- 📧 **Entrega automática** do e-book por e-mail após pagamento
- 🎯 **Design responsivo** para mobile e desktop
- ⚡ **Acesso instantâneo** ao conteúdo
- 🛡️ **Sistema de verificação** de compras
- 📊 **Rastreamento** de vendas via Stripe Dashboard

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Stripe** - Processamento de pagamentos
- **Resend** - Envio de emails transacionais
- **Vercel** - Hospedagem e deployment

## 📋 Pré-requisitos

Para usar esta plataforma, você precisará criar contas gratuitas em:

1. **Stripe** (https://stripe.com)
   - Processamento de pagamentos
   - Versão teste gratuita disponível

2. **Resend** (https://resend.com)
   - Envio automático de emails
   - 100 emails gratuitos por dia

3. **Vercel** (https://vercel.com)
   - Hospedagem (já configurado)

## ⚙️ Configuração

### 1. Configure o Stripe

1. Crie uma conta em https://stripe.com
2. Acesse o Dashboard > Developers > API Keys
3. Copie suas chaves:
   - `Secret Key` (começa com `sk_test_`)
   - `Publishable Key` (começa com `pk_test_`)

4. Configure o Webhook:
   - Vá em Developers > Webhooks
   - Adicione endpoint: `https://agentic-a5ebe370.vercel.app/api/webhook`
   - Selecione evento: `checkout.session.completed`
   - Copie o `Webhook Secret` (começa com `whsec_`)

### 2. Configure o Resend

1. Crie uma conta em https://resend.com
2. Vá em API Keys
3. Crie uma nova chave e copie

### 3. Configurar Variáveis de Ambiente na Vercel

Acesse seu projeto na Vercel e adicione as seguintes variáveis:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_URL=https://agentic-a5ebe370.vercel.app
```

## 📦 Como Adicionar Seu E-book

Atualmente, a plataforma está configurada com um e-book de demonstração. Para adicionar seu próprio e-book:

### Opção 1: Hospedagem Simples (Recomendado para começar)

1. Faça upload do seu PDF em um serviço de armazenamento:
   - Google Drive (crie link público)
   - Dropbox (crie link de download direto)
   - AWS S3, Google Cloud Storage (mais profissional)

2. Edite o arquivo `app/download/[sessionId]/page.tsx`:
   - Substitua o link de download pela URL do seu PDF

### Opção 2: Hospedagem Segura (Recomendado para produção)

1. Use AWS S3 ou Google Cloud Storage
2. Implemente links assinados (signed URLs) para segurança
3. Configure expiração de links para evitar compartilhamento

## 🎨 Personalização

### Alterar Preço

Edite `app/api/create-checkout/route.ts`:
```typescript
unit_amount: 4700, // R$ 47,00 (em centavos)
```

### Alterar Conteúdo

- **Título e descrição**: `app/page.tsx`
- **Emails**: `app/api/webhook/route.ts`
- **Cores**: `tailwind.config.js`

### Adicionar Google Analytics

Adicione no `app/layout.tsx`:
```html
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

## 📊 Monitoramento

- **Vendas**: Stripe Dashboard > Payments
- **Emails enviados**: Resend Dashboard > Logs
- **Tráfego**: Vercel Analytics (ative nas configurações)

## 🔒 Segurança

- ✅ Pagamentos processados via Stripe (PCI compliant)
- ✅ Verificação de webhooks com assinatura
- ✅ HTTPS automático via Vercel
- ✅ Validação de sessões de compra

## 💰 Custos

- **Stripe**: 3,99% + R$ 0,40 por transação
- **Resend**: 100 emails/dia grátis
- **Vercel**: Grátis (plano Hobby)

## 🚀 Próximos Passos

1. ✅ Configure suas contas (Stripe e Resend)
2. ✅ Adicione as variáveis de ambiente na Vercel
3. ✅ Faça upload do seu e-book PDF
4. ✅ Teste uma compra em modo teste do Stripe
5. ✅ Ative o modo produção no Stripe
6. 📢 Divulgue seu link!

## 🎯 Dicas de Marketing

- Compartilhe nas redes sociais
- Crie anúncios no Google/Facebook
- Use email marketing
- Faça parcerias com influenciadores
- Ofereça desconto para os primeiros compradores

## 📞 Suporte

Para problemas técnicos:
- Stripe: https://support.stripe.com
- Resend: https://resend.com/docs
- Vercel: https://vercel.com/docs

## 📄 Licença

Uso livre para fins comerciais.