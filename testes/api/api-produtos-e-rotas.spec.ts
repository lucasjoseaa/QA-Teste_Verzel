import { expect, test } from '@playwright/test';
import { obterCampo, esperarErro, esperarValorMonetario, produtos } from './apoio/dados-api';

test.describe('Produtos e rotas da API', () => {
  test('CT-API-GERAL-01: Listar todos os produtos disponíveis', async ({ request }) => {
    const resposta = await request.get('/api/produtos');
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    const lista = obterCampo(corpo, 'produtos') ?? corpo;
    expect(Array.isArray(lista)).toBe(true);
    if (!Array.isArray(lista)) {
      throw new Error('A resposta de produtos não contém uma lista.');
    }
    expect(lista).toHaveLength(8);

    for (const [id, esperado] of Object.entries(produtos)) {
      const produto = lista.find((item: unknown) => obterCampo(item, 'id') === id);
      expect(produto, `Produto ${id} deve estar na lista`).toBeDefined();
      expect(obterCampo(produto, 'nome')).toBe(esperado.nome);
      esperarValorMonetario(obterCampo(produto, 'preco'), esperado.precoCentavos);
    }
  });

  test('CT-API-GERAL-02: Consultar o produto P001', async ({ request }) => {
    const resposta = await request.get('/api/produtos/P001');
    expect(resposta.status()).toBe(200);

    const corpo: unknown = await resposta.json();
    const produto = obterCampo(corpo, 'produto') ?? corpo;
    expect(obterCampo(produto, 'nome')).toBe(produtos.P001.nome);
    esperarValorMonetario(obterCampo(produto, 'preco'), produtos.P001.precoCentavos);
  });

  test('CT-API-GERAL-03: Consultar produto inexistente', async ({ request }) => {
    const resposta = await request.get('/api/produtos/P999');
    expect(resposta.status()).toBe(404);
    esperarErro(await resposta.json(), 'PRODUTO_NAO_ENCONTRADO');
  });

  test('CT-API-GERAL-04: Consultar rota inexistente', async ({ request }) => {
    const resposta = await request.get('/api/rota-inexistente');
    expect(resposta.status()).toBe(404);
    esperarErro(await resposta.json(), 'ROTA_NAO_ENCONTRADA');
  });

  test('CT-API-GERAL-05: Usar método não permitido', async ({ request }) => {
    const resposta = await request.get('/api/pedidos');
    expect(resposta.status()).toBe(405);
    esperarErro(await resposta.json(), 'METODO_NAO_PERMITIDO');
  });

  test('CT-API-GERAL-06: Enviar JSON inválido na API de cálculo', async ({ request }) => {
    const resposta = await request.post('/api/carrinho/calcular', {
      data: '{',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(resposta.status()).toBe(400);
    esperarErro(await resposta.json(), 'JSON_INVALIDO');
  });
});
