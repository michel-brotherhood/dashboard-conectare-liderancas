import { ChevronUp, ChevronDown, ChevronsUpDown, SearchX } from 'lucide-react';
import type { Leadership } from '../lib/mockData';
import { getTier } from '../lib/mockData';

type SortKey = keyof Leadership;
type SortDir = 'asc' | 'desc';

interface LeadershipTableProps {
  data: Leadership[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}

const columns: { key: SortKey; label: string; align: 'left' | 'right' }[] = [
  { key: 'nome',              label: 'Nome',              align: 'left'  },
  { key: 'regiao',            label: 'Região',            align: 'left'  },
  { key: 'cargo',             label: 'Cargo',             align: 'left'  },
  { key: 'cadastros_validos', label: 'Cadastros Válidos', align: 'right' },
];

const mobileSortOptions: { key: SortKey; label: string }[] = [
  { key: 'nome',              label: 'Nome'      },
  { key: 'regiao',            label: 'Região'    },
  { key: 'cargo',             label: 'Cargo'     },
  { key: 'cadastros_validos', label: 'Cadastros' },
];

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ChevronsUpDown size={11} style={{ color: 'rgba(254,139,1,0.3)', flexShrink: 0 }} />;
  return dir === 'asc'
    ? <ChevronUp   size={11} style={{ color: '#FE8B01', flexShrink: 0 }} />
    : <ChevronDown size={11} style={{ color: '#FE8B01', flexShrink: 0 }} />;
}

function TierDot({ value }: { value: number }) {
  const { color } = getTier(value);
  return <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block', flexShrink: 0, boxShadow: `0 0 6px ${color}80` }} />;
}

function MobileCard({ row, rank }: { row: Leadership; rank: number }) {
  const tier = getTier(row.cadastros_validos);
  const isFormal = row.grupo === 'Liderança Formal';
  return (
    <div
      className="fade-up"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        borderLeft: `3px solid ${tier.color}`,
        padding: '18px 20px',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: rank + name + badges */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="num"
              style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', flexShrink: 0, minWidth: '22px' }}
            >
              #{rank}
            </span>
            <p
              className="font-semibold"
              style={{ color: '#fff', fontSize: '15px', lineHeight: '1.3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {row.nome}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              style={{
                backgroundColor: 'rgba(254,139,1,0.14)',
                color: '#FE8B01',
                fontSize: '11px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '99px',
              }}
            >
              {row.cargo}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: isFormal ? 'rgba(96,165,250,0.15)' : 'rgba(74,222,128,0.15)',
                color: isFormal ? '#60a5fa' : '#4ade80',
              }}
            >
              {isFormal ? 'Formal' : 'Comunitária'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
              {row.regiao}
            </span>
          </div>
        </div>

        {/* Right: value + tier */}
        <div className="shrink-0 text-right" style={{ paddingTop: '2px' }}>
          <p className="num font-bold" style={{ color: tier.color, fontSize: '22px', lineHeight: 1 }}>
            {row.cadastros_validos.toLocaleString('pt-BR')}
          </p>
          <p style={{ color: tier.color, fontSize: '11px', fontWeight: 600, marginTop: '4px', opacity: 0.75 }}>
            {tier.label}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4"
      style={{ padding: '64px 16px', color: 'rgba(255,255,255,0.22)' }}
    >
      <div
        style={{
          width: '52px', height: '52px',
          borderRadius: '14px',
          backgroundColor: 'rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <SearchX size={24} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.4)', marginBottom: '4px' }}>
          Nenhum resultado
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.22)' }}>
          Tente ajustar os filtros aplicados.
        </p>
      </div>
    </div>
  );
}

export function LeadershipTable({ data, sortKey, sortDir, onSort }: LeadershipTableProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* ── Desktop table (sm+) ── */}
      <div className="hidden sm:block overflow-x-auto">
        <table
          className="w-full"
          style={{ borderCollapse: 'collapse', minWidth: '540px' }}
          aria-label="Tabela de lideranças políticas"
        >
          <thead>
            <tr style={{ backgroundColor: '#11103A' }}>
              <th
                className="select-none"
                style={{
                  width: '52px',
                  textAlign: 'center',
                  padding: '13px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(254,139,1,0.45)',
                  borderBottom: '1px solid rgba(254,139,1,0.12)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                #
              </th>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => onSort(col.key)}
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className="cursor-pointer select-none"
                  style={{
                    padding: '13px 18px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: sortKey === col.key ? '#FE8B01' : 'rgba(254,139,1,0.55)',
                    textAlign: col.align,
                    borderBottom: '1px solid rgba(254,139,1,0.12)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.12s',
                  }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr><td colSpan={5}><EmptyState /></td></tr>
            ) : (
              data.map((row, i) => {
                const tier = getTier(row.cadastros_validos);
                const isFormal = row.grupo === 'Liderança Formal';
                return (
                  <tr
                    key={row.id}
                    className="table-row"
                    style={{ backgroundColor: i % 2 === 0 ? '#0b1d3a' : '#091a35' }}
                  >
                    {/* Rank */}
                    <td style={{ padding: '14px 8px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: `3px solid ${tier.color}` }}>
                      <span className="num" style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.25)' }}>
                        {i + 1}
                      </span>
                    </td>
                    {/* Nome */}
                    <td style={{ padding: '14px 18px', fontSize: '14px', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 500 }}>
                      {row.nome}
                    </td>
                    {/* Região */}
                    <td style={{ padding: '14px 18px', fontSize: '13px', color: 'rgba(255,255,255,0.5)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {row.regiao}
                    </td>
                    {/* Cargo + grupo */}
                    <td style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          style={{
                            backgroundColor: 'rgba(254,139,1,0.1)',
                            color: '#FE8B01',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 9px',
                            borderRadius: '99px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {row.cargo}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            backgroundColor: isFormal ? 'rgba(96,165,250,0.15)' : 'rgba(74,222,128,0.15)',
                            color: isFormal ? '#60a5fa' : '#4ade80',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {isFormal ? 'Formal' : 'Comunitária'}
                        </span>
                      </div>
                    </td>
                    {/* Cadastros */}
                    <td style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <span className="inline-flex items-center justify-end gap-2">
                        <TierDot value={row.cadastros_validos} />
                        <span className="num font-bold" style={{ color: tier.color, fontSize: '15px' }}>
                          {row.cadastros_validos.toLocaleString('pt-BR')}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards (< sm) ── */}
      <div className="block sm:hidden">
        {/* Sort chips */}
        <div
          className="chips-row px-4 py-3"
          style={{ backgroundColor: '#11103A', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', flexShrink: 0, fontWeight: 500 }}>
            Ordenar:
          </span>
          {mobileSortOptions.map(col => (
            <button
              key={col.key}
              onClick={() => onSort(col.key)}
              className="group-tab flex items-center gap-1.5 rounded-full"
              style={{
                backgroundColor: sortKey === col.key ? 'rgba(254,139,1,0.18)' : 'rgba(255,255,255,0.06)',
                color: sortKey === col.key ? '#FE8B01' : 'rgba(255,255,255,0.42)',
                border: sortKey === col.key ? '1px solid rgba(254,139,1,0.3)' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: sortKey === col.key ? 600 : 400,
                minHeight: '32px',
              }}
            >
              {col.label}
              <SortIcon active={sortKey === col.key} dir={sortDir} />
            </button>
          ))}
        </div>

        <div role="status" aria-live="polite">
          {data.length === 0 ? <EmptyState /> : data.map((row, i) => <MobileCard key={row.id} row={row} rank={i + 1} />)}
        </div>
      </div>

      {/* Footer legend */}
      {data.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3"
          style={{ backgroundColor: '#11103A', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {[
            { label: 'Alto (≥ 300)',    color: '#22c55e' },
            { label: 'Médio (150–299)', color: '#f59e0b' },
            { label: 'Baixo (< 150)',   color: '#ef4444' },
          ].map(t => (
            <span key={t.label} className="flex items-center gap-2" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: t.color, display: 'inline-block', boxShadow: `0 0 5px ${t.color}60` }} />
              {t.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
