import { useState, useMemo, useRef } from 'react';
import { Download, Upload, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { mockData, grupos, regioes, cargos } from '../lib/mockData';
import type { Leadership } from '../lib/mockData';
import { MetricsCards } from './MetricsCards';
import { FilterSection } from './FilterSection';
import { LeadershipTable } from './LeadershipTable';
import { ChartsSection } from './ChartsSection';
import { ImportToast } from './ImportToast';
import { parseExcelFile } from '../lib/excelParser';
import type { ParseResult } from '../lib/excelParser';

type SortKey = keyof Leadership;
type SortDir = 'asc' | 'desc';
type Grupo = typeof grupos[number] | '';

function downloadTemplate() {
  const headers = ['nome', 'regiao', 'cargo', 'grupo', 'cadastros_validos'];
  const examples = [
    ['João Silva',    'Zona Norte',         'Vereador',              'Liderança Formal',      320],
    ['Maria Costa',   'Niterói',            'Liderança Comunitária', 'Liderança Comunitária', 210],
    ['Carlos Mendes', 'Baixada Fluminense', 'Prefeito',              'Liderança Formal',      450],
    ['Ana Souza',     'Zona Sul',           'Assessor Político',     'Liderança Formal',      180],
  ];

  const ws = XLSX.utils.aoa_to_sheet([headers, ...examples]);
  ws['!cols'] = [{ wch: 25 }, { wch: 22 }, { wch: 24 }, { wch: 24 }, { wch: 18 }];

  const maxLen = Math.max(regioes.length, cargos.length, 2);
  const refRows: unknown[][] = [['REGIÕES VÁLIDAS', 'CARGOS VÁLIDOS', 'GRUPOS VÁLIDOS']];
  for (let i = 0; i < maxLen; i++) {
    refRows.push([regioes[i] ?? '', cargos[i] ?? '', i === 0 ? 'Liderança Formal' : i === 1 ? 'Liderança Comunitária' : '']);
  }
  const wsRef = XLSX.utils.aoa_to_sheet(refRows);
  wsRef['!cols'] = [{ wch: 22 }, { wch: 22 }, { wch: 24 }];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Modelo');
  XLSX.utils.book_append_sheet(wb, wsRef, 'Valores Válidos');
  XLSX.writeFile(wb, 'modelo-liderancas.xlsx');
}

function exportCSV(data: Leadership[]) {
  const headers = ['#', 'Nome', 'Grupo', 'Região', 'Cargo', 'Cadastros Válidos'];
  const rows = data.map((l, i) => [
    i + 1, `"${l.nome}"`, `"${l.grupo}"`, l.regiao, `"${l.cargo}"`, l.cadastros_validos,
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: `liderancas-rj-${new Date().toISOString().slice(0, 10)}.csv` });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const grupoTabs: { value: Grupo; label: string; short: string; color: string; activeBg: string; activeText: string }[] = [
  { value: '',                      label: 'Todos',                short: 'Todos',       color: '#FE8B01', activeBg: '#FE8B01', activeText: '#0b1d3a' },
  { value: 'Liderança Formal',      label: 'Liderança Formal',     short: 'Formal',      color: '#60a5fa', activeBg: '#3b82f6', activeText: '#fff'    },
  { value: 'Liderança Comunitária', label: 'Liderança Comunitária', short: 'Comunitária', color: '#4ade80', activeBg: '#22c55e', activeText: '#fff'    },
];

export function Dashboard() {
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo>('');
  const [searchName, setSearchName]         = useState('');
  const [selectedRegiao, setSelectedRegiao] = useState('');
  const [selectedCargo, setSelectedCargo]   = useState('');
  const [sortKey, setSortKey]               = useState<SortKey>('cadastros_validos');
  const [sortDir, setSortDir]               = useState<SortDir>('desc');
  const [importedData, setImportedData]     = useState<Leadership[]>([]);
  const [importResult, setImportResult]     = useState<ParseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allData = useMemo(() => [...mockData, ...importedData], [importedData]);

  const totalByGrupo = (g: Grupo) =>
    g ? allData.filter(l => l.grupo === g).length : allData.length;

  const activeCount =
    (selectedGrupo ? 1 : 0) +
    (searchName.trim() ? 1 : 0) +
    (selectedRegiao ? 1 : 0) +
    (selectedCargo ? 1 : 0);

  function clearFilters() {
    setSearchName(''); setSelectedRegiao(''); setSelectedCargo(''); setSelectedGrupo('');
  }

  const filtered = useMemo(() => {
    let r = allData;
    if (selectedGrupo)     r = r.filter(l => l.grupo  === selectedGrupo);
    if (searchName.trim()) r = r.filter(l => l.nome.toLowerCase().includes(searchName.toLowerCase().trim()));
    if (selectedRegiao)    r = r.filter(l => l.regiao === selectedRegiao);
    if (selectedCargo)     r = r.filter(l => l.cargo  === selectedCargo);
    return [...r].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number'
        ? av - bv : String(av).localeCompare(String(bv), 'pt-BR');
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [allData, selectedGrupo, searchName, selectedRegiao, selectedCargo, sortKey, sortDir]);

  const totalCadastros    = useMemo(() => filtered.reduce((s, l) => s + l.cadastros_validos, 0), [filtered]);
  const media             = filtered.length > 0 ? totalCadastros / filtered.length : 0;
  const totalCadastrosAll = useMemo(() => allData.reduce((s, l) => s + l.cadastros_validos, 0), [allData]);

  function handleSort(key: SortKey) {
    if (key === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const result = await parseExcelFile(file, allData.length);
    if (result.valid.length > 0) setImportedData(prev => [...prev, ...result.valid]);
    setImportResult(result);
  }

  return (
    <main
      className="dash-layout"
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(24px, 4vw, 44px) clamp(16px, 4vw, 40px) 56px',
      }}
    >
      {/* ── KPI cards ── */}
      <MetricsCards
        totalLideres={filtered.length}
        totalCadastros={totalCadastros}
        mediaCadastros={media}
      />

      {/* ── Group tabs ── */}
      <div
        role="tablist"
        aria-label="Filtrar por grupo de liderança"
        className="rounded-2xl"
        style={{
          backgroundColor: '#0f2848',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '6px',
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {grupoTabs.map(tab => {
          const active = selectedGrupo === tab.value;
          const count  = totalByGrupo(tab.value);
          return (
            <button
              key={tab.value || 'todos'}
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedGrupo(tab.value)}
              className="group-tab tab-item rounded-xl font-medium"
              style={{
                backgroundColor: active ? tab.activeBg : 'transparent',
                color: active ? tab.activeText : 'rgba(255,255,255,0.48)',
                border: active ? 'none' : '1px solid rgba(255,255,255,0.07)',
                cursor: 'pointer',
                padding: '10px 20px',
                fontSize: '13px',
                fontWeight: active ? 600 : 400,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '44px',
                boxShadow: active ? `0 2px 20px ${tab.color}28` : 'none',
              }}
            >
              <span className="sm:hidden">{tab.short}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '99px',
                  lineHeight: '18px',
                  backgroundColor: active ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.07)',
                  color: active ? tab.activeText : 'rgba(255,255,255,0.4)',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Filters ── */}
      <FilterSection
        searchName={searchName}
        selectedRegiao={selectedRegiao}
        selectedCargo={selectedCargo}
        onSearchName={setSearchName}
        onRegiao={setSelectedRegiao}
        onCargo={setSelectedCargo}
        onClear={clearFilters}
        activeCount={activeCount}
      />

      {/* ── Toolbar ── */}
      <div
        className="flex items-center justify-between gap-3"
        style={{ paddingTop: '4px' }}
      >
        <p
          role="status"
          aria-live="polite"
          style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px' }}
        >
          {filtered.length < allData.length ? (
            <>
              <span style={{ color: '#fff', fontWeight: 600 }}>{filtered.length}</span>
              <span> de {allData.length} lideranças</span>
            </>
          ) : (
            <>
              <span style={{ color: '#fff', fontWeight: 600 }}>{allData.length}</span>
              <span> lideranças</span>
            </>
          )}
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            onClick={downloadTemplate}
            className="btn-template flex items-center gap-2 rounded-xl"
            aria-label="Baixar modelo de planilha Excel"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 500,
              minHeight: '42px',
            }}
          >
            <FileDown size={14} />
            Baixar Modelo
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-import flex items-center gap-2 rounded-xl"
            aria-label="Importar lideranças de arquivo Excel"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.65)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 500,
              minHeight: '42px',
            }}
          >
            <Upload size={14} />
            Importar Excel
          </button>
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="btn-export flex items-center gap-2 rounded-xl"
            aria-label={`Exportar ${filtered.length} lideranças como CSV`}
            style={{
              backgroundColor: filtered.length === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(254,139,1,0.1)',
              color: filtered.length === 0 ? 'rgba(255,255,255,0.2)' : '#FE8B01',
              border: `1px solid ${filtered.length === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(254,139,1,0.22)'}`,
              cursor: filtered.length === 0 ? 'not-allowed' : 'pointer',
              padding: '9px 18px',
              fontSize: '13px',
              fontWeight: 500,
              minHeight: '42px',
            }}
          >
            <Download size={14} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* ── Import feedback ── */}
      <ImportToast result={importResult} onDismiss={() => setImportResult(null)} />

      {/* ── Table ── */}
      <LeadershipTable data={filtered} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} />

      {/* ── Charts ── */}
      <ChartsSection data={filtered} />

      <p
        style={{ textAlign: 'center', color: '#ffffff', fontSize: '11px', paddingTop: '12px' }}
      >
        {allData.length} lideranças · {totalCadastrosAll.toLocaleString('pt-BR')} cadastros válidos · Rio de Janeiro
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          paddingTop: '10px',
          paddingBottom: '4px',
        }}
      >
        <span style={{ color: '#ffffff', fontSize: '11px' }}>Desenvolvido por</span>
        <img
          src="/logo.png"
          alt="Conectare"
          style={{ height: '18px', width: 'auto', objectFit: 'contain', opacity: 1 }}
        />
      </div>
    </main>
  );
}
