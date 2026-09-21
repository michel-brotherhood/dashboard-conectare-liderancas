import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, X, ChevronDown } from 'lucide-react';
import type { ParseResult } from '../lib/excelParser';

interface ImportToastProps {
  result: ParseResult | null;
  onDismiss: () => void;
}

export function ImportToast({ result, onDismiss }: ImportToastProps) {
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    setShowErrors(false);
    if (!result || result.errors.length > 0) return;
    const t = setTimeout(onDismiss, 8000);
    return () => clearTimeout(t);
  }, [result, onDismiss]);

  if (!result) return null;

  const { valid, errors } = result;
  const isSuccess = valid.length > 0 && errors.length === 0;
  const isPartial = valid.length > 0 && errors.length > 0;

  const cfg = isSuccess
    ? { color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', Icon: CheckCircle, title: 'Importação concluída' }
    : isPartial
    ? { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.3)', Icon: AlertCircle, title: 'Importação parcial' }
    : { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',  Icon: XCircle,     title: 'Falha na importação' };

  const isFileError = errors.length > 0 && errors[0].row === 0;

  return (
    <div
      className="fade-up rounded-xl"
      style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, padding: '14px 16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <cfg.Icon size={18} style={{ color: cfg.color, flexShrink: 0, marginTop: '1px' }} />

        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: '13px', color: cfg.color, marginBottom: '2px' }}>
            {cfg.title}
          </p>

          {isSuccess && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              {valid.length} {valid.length === 1 ? 'liderança adicionada' : 'lideranças adicionadas'} com sucesso.
            </p>
          )}

          {isPartial && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              {valid.length} {valid.length === 1 ? 'liderança adicionada' : 'lideranças adicionadas'}.{' '}
              {errors.length} {errors.length === 1 ? 'linha ignorada' : 'linhas ignoradas'} por erros de validação.
            </p>
          )}

          {!isSuccess && !isPartial && (
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              {isFileError
                ? errors[0].message
                : 'Verifique se o arquivo possui as colunas: nome, regiao, cargo, grupo, cadastros_validos.'}
            </p>
          )}

          {!isFileError && errors.length > 0 && (
            <button
              onClick={() => setShowErrors(v => !v)}
              style={{
                marginTop: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: cfg.color,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {showErrors ? 'ocultar detalhes' : `ver ${errors.length} ${errors.length === 1 ? 'erro' : 'erros'}`}
              <ChevronDown
                size={12}
                style={{ transform: showErrors ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </button>
          )}

          {showErrors && (
            <ul
              style={{
                marginTop: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxHeight: '140px',
                overflowY: 'auto',
              }}
            >
              {errors.map((e, i) => (
                <li key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                  <span style={{ color: cfg.color, fontWeight: 600 }}>Linha {e.row}:</span>{' '}{e.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={onDismiss}
          aria-label="Fechar"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: '2px', flexShrink: 0 }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
