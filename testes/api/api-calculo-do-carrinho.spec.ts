import { expect, test } from '@playwright/test';
import {
  criarCorpoCarrinho,
  criarItem,
  cupons,
  esperarErro,
  esperarValorMonetario,
  obterCampo,
} from './apoio/dados-api';

test.describe('API de cálculo do carrinho', () => {
  test('CT-API-CARRINHO-01: Calcular carrinho com exemplo da documentação', async ({ request }) => {
    const corpoRequisicao = criarCorpoCarrinho([
      criarItem('P002', 1),
      criarItem('P004', 2),
    ], cupons.valido);
    const resposta = await request.post('/api/carrinho/calcular', { data: corpoRequisicao });
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    esperarValorMonetario(obterCampo(corpo, 'subtotal'), 23970);
    esperarValorMonetario(obterCampo(corpo, 'desconto'), 2397);
    esperarValorMonetario(obterCampo(corpo, 'frete'), 0);
    esperarValorMonetario(obterCampo(corpo, 'total'), 21573);
    expect(obterCampo(corpo, 'cupom.codigo')).toBe(cupons.valido);
    expect(obterCampo(corpo, 'cupom.aplicado')).toBe(true);
  });

  test('CT-API-CARRINHO-02: Calcular carrinho sem cupom com subtotal exato de 200', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P005', 2)]),
    });
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    esperarValorMonetario(obterCampo(corpo, 'subtotal'), 20000);
    esperarValorMonetario(obterCampo(corpo, 'frete'), 0);
    esperarValorMonetario(obterCampo(corpo, 'total'), 20000);
  });

  test('CT-API-CARRINHO-03: Cupom inexistente na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P005', 1)], 'DESCONTO99'),
    });
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    expect(obterCampo(corpo, 'cupom.aplicado')).toBe(false);
    esperarValorMonetario(obterCampo(corpo, 'desconto'), 0);
    esperarValorMonetario(obterCampo(corpo, 'total'), 11990);
  });

  test('CT-API-CARRINHO-04: Cupom expirado na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P005', 1)], cupons.expirado),
    });
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    expect(obterCampo(corpo, 'cupom.aplicado')).toBe(false);
    esperarValorMonetario(obterCampo(corpo, 'desconto'), 0);
    esperarValorMonetario(obterCampo(corpo, 'total'), 11990);
  });

  test('CT-API-CARRINHO-05: Itens vazios são rejeitados na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([]),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'ITENS_OBRIGATORIOS');
  });

  test('CT-API-CARRINHO-06: Produto inexistente é rejeitado na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P999', 1)]),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'PRODUTO_NAO_ENCONTRADO');
  });

  test('CT-API-CARRINHO-07: Itens duplicados são rejeitados na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P005', 1), criarItem('P005', 1)]),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'ITEM_DUPLICADO');
  });

  test('CT-API-CARRINHO-08: Calcular frete grátis com cupom sobre subtotal de R$ 200,00', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P005', 2)], cupons.valido),
    });
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    esperarValorMonetario(obterCampo(corpo, 'subtotal'), 20000);
    esperarValorMonetario(obterCampo(corpo, 'desconto'), 2000);
    esperarValorMonetario(obterCampo(corpo, 'frete'), 0);
    esperarValorMonetario(obterCampo(corpo, 'total'), 18000);
  });
});
