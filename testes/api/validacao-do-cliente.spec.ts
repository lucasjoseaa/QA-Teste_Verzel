import { expect, test } from '@playwright/test';
import {
  criarClienteValido,
  criarCorpoPedido,
  criarItem,
  esperarErro,
} from './apoio/dados-api';

test.describe('Validação do cliente', () => {
  test('CT-CLIENTE-01: Nome sem sobrenome é rejeitado', async ({ request }) => {
    const resposta = await request.post('/api/pedidos', {
      data: criarCorpoPedido([criarItem('P005', 1)], criarClienteValido({ nome: 'Ana' })),
    });
    expect(resposta.status()).toBe(422);
    esperarErro(await resposta.json(), 'DADOS_INVALIDOS');
  });

  for (const email of ['maria', 'maria@', 'maria@exemplo']) {
    test(`CT-CLIENTE-02: E-mails inválidos são rejeitados - ${email}`, async ({ request }) => {
      const resposta = await request.post('/api/pedidos', {
        data: criarCorpoPedido([criarItem('P005', 1)], criarClienteValido({ email })),
      });
      expect(resposta.status()).toBe(422);
      esperarErro(await resposta.json(), 'DADOS_INVALIDOS');
    });
  }

  for (const cep of ['01310-1', '013101000', '01310A100']) {
    test(`CT-CLIENTE-03: CEP inválido é rejeitado - ${cep}`, async ({ request }) => {
      const resposta = await request.post('/api/pedidos', {
        data: criarCorpoPedido([criarItem('P005', 1)], criarClienteValido({ cep })),
      });
      expect(resposta.status()).toBe(422);
      esperarErro(await resposta.json(), 'DADOS_INVALIDOS');
    });
  }
});
