import { expect, test } from '@playwright/test';
import { produtos } from '../api/apoio/dados-api';
import { PaginaCarrinho } from '../paginas/pagina-carrinho';
import { PaginaVitrine } from '../paginas/pagina-vitrine';

test.describe('Limite de quantidade por produto', () => {
  test('CT-QUANTIDADE-01: O kit de meias aceita até 5 unidades', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P006.nome, 5);
    await vitrine.abrirCarrinho();

    await expect.poll(() => carrinho.obterQuantidade(produtos.P006.nome)).toBe(5);
    await expect.poll(() => carrinho.obterSubtotal()).toBe(14950);
    await expect.poll(() => carrinho.obterFrete()).toBe(1990);
    await expect.poll(() => carrinho.obterTotal()).toBe(16940);
  });

  test('CT-QUANTIDADE-02: O carrinho bloqueia a sexta unidade do kit de meias', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P006.nome, 6);

    // Na descoberta, após cinco inclusões o botão ficou desabilitado e exibiu "Limite de 5 unidades atingido.".
    await expect(vitrine.obterBotaoAdicionar(produtos.P006.nome)).toBeDisabled();
    await expect(carrinho.obterAvisoLimite(produtos.P006.nome)).toBeVisible();

    await vitrine.abrirCarrinho();
    await expect.poll(() => carrinho.obterQuantidade(produtos.P006.nome)).toBe(5);
    await expect.poll(() => carrinho.obterSubtotal()).toBe(14950);
  });
});
