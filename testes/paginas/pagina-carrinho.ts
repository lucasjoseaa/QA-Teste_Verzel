import type { Locator, Page } from '@playwright/test';
import { converterTextoMonetarioEmCentavos } from '../suporte/valores-monetarios';

export class PaginaCarrinho {
  constructor(private readonly page: Page) {}

  async aplicarCupom(codigo: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Cupom de desconto' }).fill(codigo);
    await this.page.getByRole('button', { name: 'Aplicar cupom' }).click();
  }

  async removerItem(nomeProduto: string): Promise<void> {
    await this.page
      .getByRole('button', { name: `Remover ${nomeProduto} do carrinho` })
      .click();
  }

  async obterSubtotal(): Promise<number> {
    return this.obterValorResumo('Subtotal');
  }

  async obterDesconto(): Promise<number> {
    return Math.abs(await this.obterValorResumo(/^Desconto/));
  }

  async obterFrete(): Promise<number> {
    return this.obterValorResumo('Frete');
  }

  async obterTotal(): Promise<number> {
    return this.obterValorResumo('Total');
  }

  async obterQuantidade(nomeProduto: string): Promise<number> {
    const texto = await this.page
      .getByRole('status', { name: `Quantidade de ${nomeProduto}` })
      .innerText();
    return Number(texto);
  }

  obterAvisoLimite(nomeProduto: string): Locator {
    return this.page
      .getByRole('article', { name: nomeProduto })
      .getByText('Limite de 5 unidades atingido.', { exact: true });
  }

  obterBotaoAdicionarNaVitrine(nomeProduto: string): Locator {
    return this.page
      .getByRole('article', { name: nomeProduto })
      .getByRole('button', { name: 'Adicionar ao carrinho' });
  }

  private async obterValorResumo(rotulo: string | RegExp): Promise<number> {
    const tituloResumo = this.page.getByRole('heading', { name: 'Resumo do pedido' });
    const resumo = this.page.getByRole('region').filter({ has: tituloResumo });
    const termos = await resumo.getByRole('term').allInnerTexts();
    const indice = termos.findIndex((termo) => (
      typeof rotulo === 'string' ? termo === rotulo : rotulo.test(termo)
    ));
    if (indice < 0) {
      throw new Error(`O resumo do pedido não contém o campo "${rotulo}".`);
    }

    const definicao = resumo.getByRole('definition').nth(indice);
    return converterTextoMonetarioEmCentavos(await definicao.innerText());
  }
}
