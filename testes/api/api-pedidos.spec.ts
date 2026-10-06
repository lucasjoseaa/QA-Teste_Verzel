import { expect, test } from '@playwright/test';
import {
  criarCorpoPedido,
  criarItem,
  cupons,
  esperarErro,
  esperarValorMonetario,
  obterCampo,
} from './apoio/dados-api';

test.describe('API de pedidos', () => {
  test('CT-API-PEDIDOS-01: Confirmar pedido com exemplo da documentação', async ({ request }) => {
    const resposta = await request.post('/api/pedidos', {
      data: criarCorpoPedido([criarItem('P005', 1)], undefined, cupons.valido),
    });
    expect(resposta.status()).toBe(201);

    const corpo: unknown = await resposta.json();
    expect(obterCampo(corpo, 'numero')).toMatch(/^VZ-\d{6}$/);
    esperarValorMonetario(obterCampo(corpo, 'total'), 10990);
    expect(obterCampo(corpo, 'cupom.codigo')).toBe(cupons.valido);
  });

  test('CT-API-PEDIDOS-02: Pedido com cupom inexistente é rejeitado', async ({ request }) => {
    const resposta = await request.post('/api/pedidos', {
      data: criarCorpoPedido([criarItem('P005', 1)], undefined, 'DESCONTO99'),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'CUPOM_INVALIDO');
  });

  test('CT-API-PEDIDOS-03: Pedido com cupom expirado é rejeitado', async ({ request }) => {
    const resposta = await request.post('/api/pedidos', {
      data: criarCorpoPedido([criarItem('P005', 1)], undefined, cupons.expirado),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'CUPOM_EXPIRADO');
  });
});
