# language: pt
Funcionalidade: Fluxo da interface

  Contexto:
    Dado que a loja está acessível

  @CT-INTERFACE-01 @interface @manual
  Cenário: Página inicial exibe os produtos da vitrine
    Quando acesso a página inicial da loja
    Então a página exibe 8 produtos
    E cada produto apresenta categoria, nome, descrição, preço e botão "Adicionar ao carrinho"

  @CT-INTERFACE-02 @interface @manual
  Cenário: Carrinho vazio informa que ele está vazio
    Quando acesso o carrinho sem adicionar produtos
    Então a tela exibe "Seu carrinho está vazio"
    E a tela exibe "Escolha um produto na vitrine para começar."
    E a tela exibe o botão "Ver produtos"

  @CT-INTERFACE-03 @interface @manual
  Cenário: Remover um item do carrinho recalcula o total
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando removo o item do carrinho
    Então o subtotal exibido é recalculado
    E o frete exibido é recalculado
    E o total do pedido é recalculado

  @CT-INTERFACE-04 @interface @manual
  Cenário: Outra aba ou janela anônima inicia com carrinho vazio
    Quando abro outra aba do navegador ou uma janela anônima
    Então o carrinho está vazio
    E esse comportamento é esperado do ambiente, não é bug

  @CT-INTERFACE-05 @interface @exploratorio
  Cenário: Concluir o pedido pela interface com dados válidos
    Dado que o carrinho contém itens válidos
    Quando concluo o pedido pela interface
    Então o resultado deve ser registrado como "A confirmar na execução"
    E a tela de fechamento do pedido deve ser mapeada antes da automação

  @CT-INTERFACE-06 @interface @exploratorio
  Cenário: Verificar a navegação na versão mobile
    Dado que acesso a loja em um dispositivo mobile simulado pelas ferramentas de desenvolvedor
    Quando procuro no cabeçalho um menu de navegação lateral ou um ícone de menu
    Então registro se existe algum menu de navegação na versão mobile
    E registro quais itens de navegação ficam visíveis
    E confirmo que o carrinho e a vitrine de produtos continuam acessíveis pela página inicial
