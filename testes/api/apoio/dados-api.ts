import { expect } from '@playwright/test';

export const produtos = {
  P001: { nome: 'Camiseta Essencial', precoCentavos: 5990 },
  P002: { nome: 'Calça Jeans Slim', precoCentavos: 13990 },
  P003: { nome: 'Tênis Casual Urbano', precoCentavos: 18990 },
  P004: { nome: 'Boné Aba Curva', precoCentavos: 4990 },
  P005: { nome: 'Mochila Urbana 20L', precoCentavos: 10000 },
  P006: { nome: 'Kit 3 Pares de Meias', precoCentavos: 2990 },
  P007: { nome: 'Jaqueta Corta-Vento', precoCentavos: 22990 },
  P008: { nome: 'Garrafa Térmica 750ml', precoCentavos: 5000 },
} as const;

export const cupons = {
  valido: 'BEMVINDO10',
  expirado: 'VERAO2026',
} as const;

type ProdutoId = keyof typeof produtos;

interface ItemCarrinho {
  produtoId: ProdutoId | string;
  quantidade: number;
}

export interface Cliente {
  nome: string;
  email: string;
  cep: string;
}

export function criarItem(produtoId: ProdutoId | string, quantidade: number): ItemCarrinho {
  return { produtoId, quantidade };
}

export function criarCorpoCarrinho(itens: ItemCarrinho[], cupom?: string) {
  return cupom === undefined ? { itens } : { itens, cupom };
}

export function criarClienteValido(alteracoes: Partial<Cliente> = {}): Cliente {
  return {
    nome: 'Maria Silva',
    email: 'maria@exemplo.com',
    cep: '01310-100',
    ...alteracoes,
  };
}

export function criarCorpoPedido(
  itens: ItemCarrinho[],
  cliente: Cliente = criarClienteValido(),
  cupom?: string,
) {
  return cupom === undefined ? { cliente, itens } : { cliente, itens, cupom };
}

export function obterCampo(corpo: unknown, caminho: string): unknown {
  let valor: unknown = corpo;

  for (const parte of caminho.split('.')) {
    if (typeof valor !== 'object' || valor === null || Array.isArray(valor)) {
      return undefined;
    }
    valor = (valor as Record<string, unknown>)[parte];
  }

  return valor;
}

export function esperarValorMonetario(obtido: unknown, esperadoCentavos: number): void {
  if (typeof obtido !== 'number') {
    throw new Error(`O valor monetário esperado como número foi recebido como ${typeof obtido}.`);
  }
  expect(Math.round(obtido * 100)).toBe(esperadoCentavos);
}

export function esperarErro(corpo: unknown, codigo: string): void {
  // Ambiguidade nº 5 da análise: não se presume se os detalhes usam "campo" ou "campos".
  expect(obterCampo(corpo, 'erro.codigo')).toBe(codigo);
}
