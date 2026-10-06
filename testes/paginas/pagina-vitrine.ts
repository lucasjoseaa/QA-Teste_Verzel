import type { Locator, Page } from '@playwright/test';

export class PaginaVitrine {
  constructor(private readonly page: Page) {}

  async adicionarProduto(nomeProduto: string, quantidade = 1): Promise<void> {
    const cartaoProduto = this.page.getByRole('article', { name: nomeProduto });
    const botaoAdicionar = cartaoProduto.getByRole('button', { name: 'Adicionar ao carrinho' });

    for (let unidade = 0; unidade < quantidade; unidade += 1) {
      if (await botaoAdicionar.isDisabled()) {
        break;
      }
      await botaoAdicionar.click();
    }
  }

  obterBotaoAdicionar(nomeProduto: string): Locator {
    return this.page
      .getByRole('article', { name: nomeProduto })
      .getByRole('button', { name: 'Adicionar ao carrinho' });
  }

  async abrirCarrinho(): Promise<void> {
    await this.page.getByRole('link', { name: /Carrinho/ }).click();
  }
}
