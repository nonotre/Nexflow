'use client'

import { AlertOctagon } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '16px',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
            padding: '24px',
          }}
        >
          <AlertOctagon style={{ width: 40, height: 40, opacity: 0.5 }} />
          <div>
            <h1 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4 }}>
              Erro crítico
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
              {error.message || 'Algo deu errado no carregamento da aplicação.'}
            </p>
          </div>
          <button
            onClick={reset}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: '1px solid #e5e5e5',
              background: '#fff',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  )
}
