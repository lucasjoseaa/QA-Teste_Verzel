import { expect, test } from '@playwright/test';
import {
  anexarEvidenciaApi,
  criarCorpoPedido,
  criarItem,
  cupons,
  criarClienteValido,
  esperarErro,
  esperarValorMonetario,
  obterCampo,
} from './apoio/dados-api';

const casosProdutoIdInvalido = [
  { exemplo: 'sem-produtoid', item: { quantidade: 1 } },
  { exemplo: 'produtoid-nulo', item: { produtoId: null, quantidade: 1 } },
  { exemplo: 'produtoid-vazio', item: { produtoId: '', quantidade: 1 } },
] as const;

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

  for (const { exemplo, item } of casosProdutoIdInvalido) {
    test(`CT-API-PEDIDOS-04: Mensagem sem valores internos - ${exemplo}`, async ({ request }, testInfo) => {
      test.fail(true, 'BUG-005: a mensagem de erro expõe valores internos do produtoId');
      const endpoint = '/api/pedidos';
      const corpoEnviado = criarCorpoPedido([item], criarClienteValido());
      const resposta = await request.post(endpoint, { data: corpoEnviado });
      const corpoRecebido = await anexarEvidenciaApi(
        testInfo,
        `CT-API-PEDIDOS-04-${exemplo}-resposta`,
        endpoint,
        corpoEnviado,
        resposta,
      );

      expect(resposta.status()).toBe(422);
      const mensagem = obterCampo(corpoRecebido, 'erro.mensagem');
      expect(mensagem).toEqual(expect.any(String));
      expect(mensagem).not.toMatch(/\b(?:undefined|null)\b| {2}/);
    });
  }
});
