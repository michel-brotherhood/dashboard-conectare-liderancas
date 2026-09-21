import { Users, TrendingUp, BarChart2 } from 'lucide-react';

interface MetricsCardsProps {
  totalLideres: number;
  totalCadastros: number;
  mediaCadastros: number;
}

interface CardColor {
  main: string;
  bg: string;
  border: string;
  borderDim: string;
  glow: string;
}

interface CardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  shortLabel: string;
  color: CardColor;
  accent?: boolean;
}

const BLUE:   CardColor = { main: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.32)',  borderDim: 'rgba(96,165,250,0.14)',  glow: 'rgba(96,165,250,0.14)'  };
const GREEN:  CardColor = { main: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.36)',  borderDim: 'rgba(74,222,128,0.15)',  glow: 'rgba(74,222,128,0.16)'  };
const YELLOW: CardColor = { main: '#fbbf24', bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.32)', borderDim: 'rgba(251,191,36,0.14)', glow: 'rgba(251,191,36,0.12)' };

function Card({ icon, value, label, shortLabel, color, accent }: CardProps) {
  return (
    <div
      className="metric-card rounded-2xl cursor-default"
      style={{
        backgroundColor: '#0f2848',
        border: `1px solid ${accent ? color.border : color.borderDim}`,
        boxShadow: accent ? `0 4px 28px ${color.glow}` : '0 2px 12px rgba(0,0,0,0.2)',
        padding: 'clamp(14px, 3vw, 24px)',
      }}
    >
      {/* Desktop layout */}
      <div className="hidden sm:flex items-center gap-4">
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{ backgroundColor: color.bg, width: '46px', height: '46px', boxShadow: `0 0 0 1px ${color.border}` }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="num font-bold leading-none" style={{ color: color.main, fontSize: 'clamp(24px, 2.5vw, 32px)' }}>
            {value}
          </p>
          <p className="mt-1.5 leading-tight" style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12px' }}>
            {label}
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex sm:hidden flex-col gap-2">
        <div
          className="flex items-center justify-center rounded-lg self-start"
          style={{ backgroundColor: color.bg, width: '32px', height: '32px' }}
        >
          {icon}
        </div>
        <p className="num font-bold leading-none" style={{ color: color.main, fontSize: 'clamp(20px, 5.5vw, 26px)' }}>
          {value}
        </p>
        <p className="leading-tight" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '11px' }}>
          {shortLabel}
        </p>
      </div>
    </div>
  );
}

export function MetricsCards({ totalLideres, totalCadastros, mediaCadastros }: MetricsCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(10px, 2vw, 20px)' }}>
      <Card
        icon={<Users size={20} style={{ color: BLUE.main }} />}
        value={totalLideres.toLocaleString('pt-BR')}
        label="Total de Lideranças"
        shortLabel="Lideranças"
        color={BLUE}
      />
      <Card
        icon={<TrendingUp size={20} style={{ color: GREEN.main }} />}
        value={totalCadastros.toLocaleString('pt-BR')}
        label="Cadastros Válidos Entregues"
        shortLabel="Cadastros"
        color={GREEN}
        accent
      />
      <Card
        icon={<BarChart2 size={20} style={{ color: YELLOW.main }} />}
        value={mediaCadastros.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
        label="Média por Liderança"
        shortLabel="Média"
        color={YELLOW}
      />
    </div>
  );
}
