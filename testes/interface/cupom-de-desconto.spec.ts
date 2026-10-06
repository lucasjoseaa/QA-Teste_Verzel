import { expect, test } from '@playwright/test';
import { produtos } from '../api/apoio/dados-api';
import { PaginaCarrinho } from '../paginas/pagina-carrinho';
import { PaginaVitrine } from '../paginas/pagina-vitrine';

test.describe('Aplicação de cupom de desconto', () => {
  test('CT-CUPOM-01: Aplicar o cupom válido BEMVINDO10', async ({ page }) => {
    const vitrine = new PaginaVitrine(page);
    const carrinho = new PaginaCarrinho(page);

    await page.goto('/');
    await vitrine.adicionarProduto(produtos.P005.nome);
    await vitrine.abrirCarrinho();
    await carrinho.aplicarCupom('BEMVINDO10');

    await expect.poll(() => carrinho.obterDesconto()).toBe(1000);
    await expect.poll(() => carrinho.obterTotal()).toBe(10990);
  });

  for (const codigo of ['bemvindo10', 'BemVindo10', ' BEMVINDO10', 'BEMVINDO10 ']) {
    test(`CT-CUPOM-02: Aceitar variações de caixa e espaços no código do cupom - "${codigo}"`, async ({ page }) => {
      const vitrine = new PaginaVitrine(page);
      const carrinho = new PaginaCarrinho(page);

      await page.goto('/');
      await vitrine.adicionarProduto(produtos.P005.nome);
      await vitrine.abrirCarrinho();
      await carrinho.aplicarCupom(codigo);

      await expect.poll(() => carrinho.obterDesconto()).toBe(1000);
      await expect.poll(() => carrinho.obterTotal()).toBe(10990);
    });
  }
});
