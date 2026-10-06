import { expect, test } from '@playwright/test';
import { cupons, produtos } from '../api/apoio/dados-api';
import { PaginaCarrinho } from '../paginas/pagina-carrinho';
import { PaginaVitrine } from '../paginas/pagina-vitrine';

test.describe('Frete grátis e regra do valor faltante', () => {
  test('CT-FRETE-01: Frete cobrado abaixo do subtotal mínimo', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P001.nome);
    await vitrine.abrirCarrinho();

    await expect.poll(() => carrinho.obterFrete()).toBe(1990);
    await expect.poll(() => carrinho.obterTotal()).toBe(7980);
  });

  test('CT-FRETE-02: Frete grátis com subtotal mínimo exato', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P005.nome, 2);
    await vitrine.abrirCarrinho();

    await expect.poll(() => carrinho.obterSubtotal()).toBe(20000);
    await expect.poll(() => carrinho.obterFrete()).toBe(0);
    await expect.poll(() => carrinho.obterTotal()).toBe(20000);
  });

  test('CT-FRETE-04: Frete grátis com cupom válido considerando subtotal antes do desconto', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P005.nome, 2);
    await vitrine.abrirCarrinho();
    await carrinho.aplicarCupom(cupons.valido);

    await expect.poll(() => carrinho.obterDesconto()).toBe(2000);
    await expect.poll(() => carrinho.obterFrete()).toBe(0);
    await expect.poll(() => carrinho.obterTotal()).toBe(18000);
  });
});
