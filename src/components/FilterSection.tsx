import { Search, X, SlidersHorizontal } from 'lucide-react';
import { regioes, cargos } from '../lib/mockData';
import { CustomSelect } from './CustomSelect';

interface FilterSectionProps {
  searchName: string;
  selectedRegiao: string;
  selectedCargo: string;
  onSearchName: (v: string) => void;
  onRegiao: (v: string) => void;
  onCargo: (v: string) => void;
  onClear: () => void;
  activeCount: number;
}

const regiaoOptions = regioes.map(r => ({ value: r, label: r }));
const cargoOptions  = cargos.map(c => ({ value: c, label: c }));

const FIELD_HEIGHT = '46px';

export function FilterSection({
  searchName, selectedRegiao, selectedCargo,
  onSearchName, onRegiao, onCargo,
  onClear, activeCount,
}: FilterSectionProps) {
  return (
    <div
      role="search"
      style={{
        backgroundColor: '#0f2848',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: 'clamp(18px, 3vw, 28px)',
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <SlidersHorizontal size={14} style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 600 }}>
            Filtros
          </span>
          {activeCount > 0 && (
            <span
              style={{
                backgroundColor: '#FE8B01',
                color: '#0b1d3a',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '99px',
                lineHeight: '18px',
              }}
            >
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            onClick={onClear}
            aria-label="Limpar todos os filtros"
            className="btn-ghost"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'transparent',
              borderRadius: '8px',
              cursor: 'pointer',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: 500,
              minHeight: '34px',
            }}
          >
            <X size={11} />
            Limpar
          </button>
        )}
      </div>

      {/* ── Fields: 2-col grid on mobile, 3-col on desktop ── */}
      {/* Nome spans full width (col-span-2) on mobile, 1 col on desktop */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(12px, 2vw, 16px)',
        }}
        className="filter-grid"
      >
        {/* Nome — full width on mobile */}
        <div style={{ gridColumn: '1 / -1' }} className="filter-nome">
          <label
            htmlFor="filter-nome"
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            Nome
          </label>
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.25)',
                pointerEvents: 'none',
              }}
            />
            <input
              id="filter-nome"
              type="text"
              placeholder="Buscar por nome..."
              value={searchName}
              onChange={e => onSearchName(e.target.value)}
              aria-label="Buscar liderança por nome"
              className="field"
              style={{
                backgroundColor: '#0b1d3a',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                borderRadius: '10px',
                padding: `0 ${searchName ? '44px' : '16px'} 0 42px`,
                width: '100%',
                fontSize: '14px',
                height: FIELD_HEIGHT,
              }}
            />
            {searchName && (
              <button
                type="button"
                onClick={() => onSearchName('')}
                aria-label="Limpar busca"
                style={{
                  position: 'absolute',
                  right: '4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.3)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Região */}
        <div>
          <label
            htmlFor="filter-regiao"
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            Região
          </label>
          <CustomSelect
            id="filter-regiao"
            value={selectedRegiao}
            onChange={onRegiao}
            options={regiaoOptions}
            placeholder="Todas"
            aria-label="Filtrar por região"
          />
        </div>

        {/* Cargo */}
        <div>
          <label
            htmlFor="filter-cargo"
            style={{
              display: 'block',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '8px',
            }}
          >
            Cargo
          </label>
          <CustomSelect
            id="filter-cargo"
            value={selectedCargo}
            onChange={onCargo}
            options={cargoOptions}
            placeholder="Todos"
            aria-label="Filtrar por cargo"
          />
        </div>
      </div>
    </div>
  );
}
