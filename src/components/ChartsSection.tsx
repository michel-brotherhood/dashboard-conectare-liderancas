import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import type { Leadership } from '../lib/mockData';
import { regioes, cargos } from '../lib/mockData';

interface ChartsSectionProps {
  data: Leadership[];
}

const PIE_COLORS = ['#60a5fa', '#4ade80', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c'];

function barColor(i: number, total: number) {
  // Blue (#60a5fa) → Cyan (#22d3ee) → Green (#4ade80)
  const t = total <= 1 ? 0 : i / (total - 1);
  const r = Math.round(96  + t * (74  - 96));
  const g = Math.round(165 + t * (222 - 165));
  const b = Math.round(250 + t * (128 - 250));
  return `rgb(${r},${g},${b})`;
}

const tooltipStyle: React.CSSProperties = {
  backgroundColor: '#0d0c2e',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '13px',
  boxShadow: '0 8px 28px rgba(0,0,0,0.55)',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#0f2848',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
  padding: 'clamp(18px, 3vw, 28px)',
};

function SectionTitle({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
      {children}
    </p>
  );
}

export function ChartsSection({ data }: ChartsSectionProps) {
  const byRegiao = useMemo(
    () =>
      regioes
        .map(r => ({
          name: r,
          cadastros: data.filter(d => d.regiao === r).reduce((s, d) => s + d.cadastros_validos, 0),
          lideres:   data.filter(d => d.regiao === r).length,
        }))
        .filter(r => r.cadastros > 0)
        .sort((a, b) => b.cadastros - a.cadastros),
    [data],
  );

  const byCargo = useMemo(
    () =>
      cargos
        .map(c => ({
          name:  c,
          value: data.filter(d => d.cargo === c).reduce((s, d) => s + d.cadastros_validos, 0),
        }))
        .filter(c => c.value > 0),
    [data],
  );

  if (data.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Bar chart — cadastros por região */}
      <div style={cardStyle}>
        <SectionTitle>Cadastros por Região</SectionTitle>
        <ResponsiveContainer width="100%" height={byRegiao.length * 38 + 24}>
          <BarChart data={byRegiao} layout="vertical" margin={{ left: 0, right: 38, top: 0, bottom: 0 }}>
            <XAxis
              type="number"
              tick={{ fill: 'rgba(255,255,255,0.38)', fontSize: 10 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.07)' }}
              tickLine={false}
              tickFormatter={v => v.toLocaleString('pt-BR')}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={122}
              tick={{ fill: 'rgba(255,255,255,0.68)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(254,139,1,0.05)' }}
              formatter={(v, _name, props) => {
                const lideres: number = props.payload?.lideres ?? 0;
                return [
                  <span key="val">
                    <strong style={{ color: '#4ade80' }}>{Number(v).toLocaleString('pt-BR')}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>
                      {' '}cadastros · {lideres} líder{lideres !== 1 ? 'es' : ''}
                    </span>
                  </span>,
                  '',
                ];
              }}
              labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}
            />
            <Bar
              dataKey="cadastros"
              radius={[0, 5, 5, 0]}
              barSize={20}
              label={{
                position: 'right',
                fill: 'rgba(255,255,255,0.42)',
                fontSize: 10,
                formatter: (v: unknown) => Number(v).toLocaleString('pt-BR'),
              }}
            >
              {byRegiao.map((_, i) => (
                <Cell key={i} fill={barColor(i, byRegiao.length)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart — distribuição por cargo */}
      <div style={cardStyle}>
        <SectionTitle>Distribuição por Cargo</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={byCargo}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="48%"
              outerRadius="68%"
              innerRadius="36%"
              paddingAngle={2}
              label={({ percent }) =>
                percent != null && percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''
              }
              labelLine={{ stroke: 'rgba(255,255,255,0.18)', strokeWidth: 1 }}
            >
              {byCargo.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(v) => [
                <strong key="val" style={{ color: '#60a5fa' }}>{Number(v).toLocaleString('pt-BR')}</strong>,
                'Cadastros',
              ]}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: '12px', fontSize: '12px' }}
              formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.62)' }}>{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
