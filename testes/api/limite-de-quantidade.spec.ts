import { expect, test } from '@playwright/test';
import {
  criarCorpoCarrinho,
  criarCorpoPedido,
  criarItem,
  esperarErro,
  esperarValorMonetario,
  obterCampo,
} from './apoio/dados-api';

test.describe('Limite de quantidade na API', () => {
  test('CT-QUANTIDADE-03: API aceita até 5 unidades do kit de meias', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: criarCorpoCarrinho([criarItem('P006', 5)]),
    });
    expect(resposta.status()).toBe(200);
    esperarValorMonetario(obterCampo(await resposta.json(), 'subtotal'), 14950);
  });

  for (const endpoint of ['/api/carrinho/calcular', '/api/pedidos']) {
    test(`CT-QUANTIDADE-04: API rejeita quantidade acima do limite - ${endpoint}`, async ({ request }) => {
      const dados = endpoint === '/api/pedidos'
        ? criarCorpoPedido([criarItem('P006', 6)])
        : criarCorpoCarrinho([criarItem('P006', 6)]);
      const resposta = await request.post(endpoint, { data: dados });
      expect(resposta.status()).toBe(422);
      esperarErro(await resposta.json(), 'QUANTIDADE_MAXIMA_EXCEDIDA');
    });
  }

  for (const quantidade of [0, -1, 1.5]) {
    test(`CT-QUANTIDADE-05: API rejeita quantidade inválida - ${quantidade}`, async ({ request }) => {
      const resposta = await request.post('/api/carrinho/calcular', {
        data: criarCorpoCarrinho([criarItem('P001', quantidade)]),
      });
      expect(resposta.status()).toBe(422);
      esperarErro(await resposta.json(), 'QUANTIDADE_INVALIDA');
    });
  }
});
