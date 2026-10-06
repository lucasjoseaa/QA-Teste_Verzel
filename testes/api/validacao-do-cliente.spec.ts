import { expect, test, type APIResponse } from '@playwright/test';
import {
  criarClienteValido,
  criarCorpoPedido,
  criarItem,
  esperarErro,
} from './apoio/dados-api';

async function anexarResposta(
  id: string,
  endpoint: string,
  corpoEnviado: unknown,
  resposta: APIResponse,
): Promise<unknown> {
  const respostaRecebida: unknown = await resposta.json();
  await test.info().attach(`${id}-resposta`, {
    body: Buffer.from(JSON.stringify({
      cenario: id,
      endpoint,
      metodo: 'POST',
      corpoEnviado,
      status: resposta.status(),
      respostaRecebida,
    }, null, 2)),
    contentType: 'application/json',
  });
  console.log(JSON.stringify({ cenario: id, status: resposta.status(), respostaRecebida }));
  return respostaRecebida;
}

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

  for (const nome of ['lucas1 jose2', 'lucas@ jose#', 'lucas1 jose@']) {
    test(`CT-CLIENTE-05: Recusar nome com número ou símbolo - ${nome}`, async ({ request }) => {
      test.fail(true, 'BUG-003: o nome aceita números e símbolos');
      const endpoint = '/api/pedidos';
      const corpoEnviado = criarCorpoPedido(
        [criarItem('P005', 1)],
        criarClienteValido({ nome }),
      );
      const resposta = await request.post(endpoint, { data: corpoEnviado });
      const corpoRecebido = await anexarResposta('CT-CLIENTE-05', endpoint, corpoEnviado, resposta);

      expect(resposta.status()).toBe(422);
      esperarErro(corpoRecebido, 'DADOS_INVALIDOS');
    });
  }

  test('CT-CLIENTE-06: Recusar e-mail com caracteres inválidos no domínio', async ({ request }) => {
    test.fail(true, 'BUG-004: o e-mail aceita caracteres inválidos no domínio');
    const endpoint = '/api/pedidos';
    const corpoEnviado = criarCorpoPedido(
      [criarItem('P005', 1)],
      criarClienteValido({ email: 'usuario@!#%.com' }),
    );
    const resposta = await request.post(endpoint, { data: corpoEnviado });
    const corpoRecebido = await anexarResposta('CT-CLIENTE-06', endpoint, corpoEnviado, resposta);

    expect(resposta.status()).toBe(422);
    esperarErro(corpoRecebido, 'DADOS_INVALIDOS');
  });
});
