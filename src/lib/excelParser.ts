import * as XLSX from 'xlsx';
import type { Leadership } from './mockData';
import { regioes, cargos } from './mockData';

export interface ImportError {
  row: number;
  field: string;
  value: unknown;
  message: string;
}

export interface ParseResult {
  valid: Leadership[];
  errors: ImportError[];
}

const REQUIRED_COLS = ['nome', 'regiao', 'cargo', 'grupo', 'cadastros_validos'] as const;

function parseRegiao(raw: unknown): string | null {
  const s = String(raw ?? '').trim();
  return regioes.find(r => r.toLowerCase() === s.toLowerCase()) ?? null;
}

function parseCargo(raw: unknown): string | null {
  const s = String(raw ?? '').trim();
  return cargos.find(c => c.toLowerCase() === s.toLowerCase()) ?? null;
}

function parseGrupo(raw: unknown): Leadership['grupo'] | null {
  const s = String(raw ?? '').trim().toLowerCase();
  if (s === 'liderança formal' || s === 'lideranca formal' || s === 'formal') return 'Liderança Formal';
  if (s === 'liderança comunitária' || s === 'lideranca comunitaria' || s === 'comunitária' || s === 'comunitaria') return 'Liderança Comunitária';
  return null;
}

function parseCadastros(raw: unknown): number | null {
  if (typeof raw === 'number' && !isNaN(raw) && raw >= 0) return Math.floor(raw);
  if (typeof raw === 'string') {
    const n = parseFloat(raw.trim().replace(/\./g, '').replace(/,/g, '.'));
    if (!isNaN(n) && n >= 0) return Math.floor(n);
  }
  return null;
}

export async function parseExcelFile(file: File, nextId: number): Promise<ParseResult> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  if (rows.length === 0) {
    return {
      valid: [],
      errors: [{ row: 0, field: 'arquivo', value: null, message: 'A planilha está vazia.' }],
    };
  }

  const normalizedRows = rows.map(row => {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(row)) out[k.trim().toLowerCase()] = v;
    return out;
  });

  const firstRow = normalizedRows[0];
  const presentCols = REQUIRED_COLS.filter(col => col in firstRow);
  if (presentCols.length === 0) {
    return {
      valid: [],
      errors: [{
        row: 0,
        field: 'colunas',
        value: Object.keys(firstRow).join(', '),
        message: `Nenhuma coluna obrigatória encontrada. A planilha deve ter: ${REQUIRED_COLS.join(', ')}.`,
      }],
    };
  }

  const valid: Leadership[] = [];
  const errors: ImportError[] = [];

  normalizedRows.forEach((row, idx) => {
    const rowNum = idx + 1;
    const allEmpty = Object.values(row).every(v => v === '' || v == null);
    if (allEmpty) return;

    const nome = String(row['nome'] ?? '').trim();
    if (!nome) {
      errors.push({ row: rowNum, field: 'nome', value: row['nome'], message: 'Nome não pode ser vazio.' });
      return;
    }

    const regiao = parseRegiao(row['regiao']);
    if (!regiao) {
      errors.push({ row: rowNum, field: 'regiao', value: row['regiao'], message: `Região inválida: "${row['regiao']}".` });
      return;
    }

    const cargo = parseCargo(row['cargo']);
    if (!cargo) {
      errors.push({ row: rowNum, field: 'cargo', value: row['cargo'], message: `Cargo inválido: "${row['cargo']}".` });
      return;
    }

    const grupo = parseGrupo(row['grupo']);
    if (!grupo) {
      errors.push({ row: rowNum, field: 'grupo', value: row['grupo'], message: `Grupo inválido: "${row['grupo']}". Use: Liderança Formal ou Liderança Comunitária.` });
      return;
    }

    const cadastros_validos = parseCadastros(row['cadastros_validos']);
    if (cadastros_validos === null) {
      errors.push({ row: rowNum, field: 'cadastros_validos', value: row['cadastros_validos'], message: `Cadastros inválidos: "${row['cadastros_validos']}". Deve ser um número inteiro >= 0.` });
      return;
    }

    valid.push({ id: nextId + valid.length, nome, regiao, cargo, grupo, cadastros_validos });
  });

  return { valid, errors };
}
