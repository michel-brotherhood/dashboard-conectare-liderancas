export interface Leadership {
  id: number;
  nome: string;
  regiao: string;
  cargo: string;
  grupo: 'Liderança Formal' | 'Liderança Comunitária';
  cadastros_validos: number;
}

export const regioes = [
  'Baixada Fluminense',
  'Centro',
  'Duque de Caxias',
  'Itaboraí',
  'Niterói',
  'Nova Iguaçu',
  'São Gonçalo',
  'Zona Norte',
  'Zona Oeste',
  'Zona Sul',
];

export const cargos = [
  'Prefeito',
  'Vereador',
  'Liderança Comunitária',
  'Assessor Político',
];

export const grupos = ['Liderança Formal', 'Liderança Comunitária'] as const;

const F = 'Liderança Formal'      as const;
const C = 'Liderança Comunitária' as const;

export const mockData: Leadership[] = [
  // ─── Assessores Políticos — Liderança Formal (10) ───────────────────────────
  { id:  1, nome: 'Ana Costa',         regiao: 'Baixada Fluminense', cargo: 'Assessor Político',    grupo: F, cadastros_validos: 210 },
  { id:  2, nome: 'Juliana Costa',     regiao: 'Zona Oeste',         cargo: 'Assessor Político',    grupo: F, cadastros_validos: 190 },
  { id:  3, nome: 'Gustavo Rocha',     regiao: 'Duque de Caxias',    cargo: 'Assessor Político',    grupo: F, cadastros_validos: 180 },
  { id:  4, nome: 'Lucas Almeida',     regiao: 'Centro',             cargo: 'Assessor Político',    grupo: F, cadastros_validos: 170 },
  { id:  5, nome: 'Melissa Rocha',     regiao: 'Baixada Fluminense', cargo: 'Assessor Político',    grupo: F, cadastros_validos: 170 },
  { id:  6, nome: 'Amanda Rocha',      regiao: 'Nova Iguaçu',        cargo: 'Assessor Político',    grupo: F, cadastros_validos: 160 },
  { id:  7, nome: 'Claudio Almeida',   regiao: 'Zona Norte',         cargo: 'Assessor Político',    grupo: F, cadastros_validos: 150 },
  { id:  8, nome: 'Bruno Alves',       regiao: 'Zona Sul',           cargo: 'Assessor Político',    grupo: F, cadastros_validos: 140 },
  { id:  9, nome: 'Olivia Santos',     regiao: 'Niterói',            cargo: 'Assessor Político',    grupo: F, cadastros_validos: 130 },
  { id: 10, nome: 'Helena Ferreira',   regiao: 'São Gonçalo',        cargo: 'Assessor Político',    grupo: F, cadastros_validos: 120 },

  // ─── Lideranças Comunitárias (14) ────────────────────────────────────────────
  { id: 11, nome: 'João Oliveira',     regiao: 'Zona Norte',         cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 280 },
  { id: 12, nome: 'Gerson Oliveira',   regiao: 'Niterói',            cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 270 },
  { id: 13, nome: 'Patricia Oliveira', regiao: 'Niterói',            cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 260 },
  { id: 14, nome: 'Vitor Oliveira',    regiao: 'Duque de Caxias',    cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 250 },
  { id: 15, nome: 'Beatriz Gomes',     regiao: 'Centro',             cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 240 },
  { id: 16, nome: 'Norberto Gomes',    regiao: 'Zona Oeste',         cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 240 },
  { id: 17, nome: 'Sophia Silva',      regiao: 'Zona Sul',           cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 230 },
  { id: 18, nome: 'Rafael Santos',     regiao: 'Baixada Fluminense', cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 220 },
  { id: 19, nome: 'Fabio Martins',     regiao: 'São Gonçalo',        cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 220 },
  { id: 20, nome: 'Karina Lima',       regiao: 'Zona Sul',           cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 210 },
  { id: 21, nome: 'Henrique Gomes',    regiao: 'Zona Oeste',         cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 200 },
  { id: 22, nome: 'Ricardo Gomes',     regiao: 'Nova Iguaçu',        cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 190 },
  { id: 23, nome: 'Sergio Ferreira',   regiao: 'Centro',             cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 180 },
  { id: 24, nome: 'Fernanda Lima',     regiao: 'São Gonçalo',        cargo: 'Liderança Comunitária', grupo: C, cadastros_validos: 150 },

  // ─── Prefeitos — Liderança Formal (11) ───────────────────────────────────────
  { id: 25, nome: 'Lucia Martins',     regiao: 'Nova Iguaçu',        cargo: 'Prefeito',             grupo: F, cadastros_validos: 520 },
  { id: 26, nome: 'Ofélia Martins',    regiao: 'Nova Iguaçu',        cargo: 'Prefeito',             grupo: F, cadastros_validos: 510 },
  { id: 27, nome: 'André Mendes',      regiao: 'Baixada Fluminense', cargo: 'Prefeito',             grupo: F, cadastros_validos: 500 },
  { id: 28, nome: 'Thiago Mendes',     regiao: 'Zona Sul',           cargo: 'Prefeito',             grupo: F, cadastros_validos: 490 },
  { id: 29, nome: 'Diego Pereira',     regiao: 'Zona Norte',         cargo: 'Prefeito',             grupo: F, cadastros_validos: 480 },
  { id: 30, nome: 'Joana Alves',       regiao: 'Centro',             cargo: 'Prefeito',             grupo: F, cadastros_validos: 470 },
  { id: 31, nome: 'Emilio Gomes',      regiao: 'Zona Oeste',         cargo: 'Prefeito',             grupo: F, cadastros_validos: 460 },
  { id: 32, nome: 'Carlos Silva',      regiao: 'Centro',             cargo: 'Prefeito',             grupo: F, cadastros_validos: 450 },
  { id: 33, nome: 'Mariana Oliveira',  regiao: 'Duque de Caxias',    cargo: 'Prefeito',             grupo: F, cadastros_validos: 440 },
  { id: 34, nome: 'Mateus Santos',     regiao: 'Niterói',            cargo: 'Prefeito',             grupo: F, cadastros_validos: 420 },
  { id: 35, nome: 'Felipe Martins',    regiao: 'São Gonçalo',        cargo: 'Prefeito',             grupo: F, cadastros_validos: 410 },

  // ─── Vereadores — Liderança Formal (16) ──────────────────────────────────────
  { id: 36, nome: 'Viviana Costa',     regiao: 'Zona Sul',           cargo: 'Vereador',             grupo: F, cadastros_validos: 390 },
  { id: 37, nome: 'Pedro Ferreira',    regiao: 'Zona Oeste',         cargo: 'Vereador',             grupo: F, cadastros_validos: 380 },
  { id: 38, nome: 'Cecilia Rocha',     regiao: 'Zona Oeste',         cargo: 'Vereador',             grupo: F, cadastros_validos: 370 },
  { id: 39, nome: 'Natalia Ferreira',  regiao: 'Centro',             cargo: 'Vereador',             grupo: F, cadastros_validos: 360 },
  { id: 40, nome: 'Leonardo Mendes',   regiao: 'Zona Norte',         cargo: 'Vereador',             grupo: F, cadastros_validos: 360 },
  { id: 41, nome: 'Larissa Lima',      regiao: 'Zona Norte',         cargo: 'Vereador',             grupo: F, cadastros_validos: 350 },
  { id: 42, nome: 'Marcelo Dias',      regiao: 'Nova Iguaçu',        cargo: 'Vereador',             grupo: F, cadastros_validos: 340 },
  { id: 43, nome: 'Igor Santos',       regiao: 'Duque de Caxias',    cargo: 'Vereador',             grupo: F, cadastros_validos: 340 },
  { id: 44, nome: 'Gabriela Martins',  regiao: 'São Gonçalo',        cargo: 'Vereador',             grupo: F, cadastros_validos: 330 },
  { id: 45, nome: 'Daniela Rocha',     regiao: 'Baixada Fluminense', cargo: 'Vereador',             grupo: F, cadastros_validos: 330 },
  { id: 46, nome: 'Maria Santos',      regiao: 'Zona Sul',           cargo: 'Vereador',             grupo: F, cadastros_validos: 320 },
  { id: 47, nome: 'Camila Rocha',      regiao: 'Zona Norte',         cargo: 'Vereador',             grupo: F, cadastros_validos: 310 },
  { id: 48, nome: 'Fernanda Martins',  regiao: 'Nova Iguaçu',        cargo: 'Vereador',             grupo: F, cadastros_validos: 310 },
  { id: 49, nome: 'Isabela Ferreira',  regiao: 'Duque de Caxias',    cargo: 'Vereador',             grupo: F, cadastros_validos: 300 },
  { id: 50, nome: 'Roberto Alves',     regiao: 'Niterói',            cargo: 'Vereador',             grupo: F, cadastros_validos: 290 },
  { id: 51, nome: 'Valentina Costa',   regiao: 'Baixada Fluminense', cargo: 'Vereador',             grupo: F, cadastros_validos: 270 },
];

// Conferido com o documento oficial:
// Liderança Formal:      37 lideranças · 12.120 cadastros · média 327
// Liderança Comunitária: 14 lideranças ·  3.140 cadastros · média 224
// TOTAL:                 51 lideranças · 15.260 cadastros · média 299

export function getTier(v: number) {
  if (v >= 300) return { label: 'Alto',  color: '#22c55e', bg: 'rgba(34,197,94,0.1)'  };
  if (v >= 150) return { label: 'Médio', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
  return             { label: 'Baixo', color: '#ef4444', bg: 'rgba(239,68,68,0.1)'  };
}
