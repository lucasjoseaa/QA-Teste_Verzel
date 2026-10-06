# language: pt
Funcionalidade: Frete grátis e regra do valor faltante

  Contexto:
    Dado que a loja está acessível

  @CT-FRETE-01 @CA07 @interface @automatizado
  Cenário: Frete cobrado abaixo do subtotal mínimo
    Dado que o carrinho contém 1 unidade do produto "Camiseta Essencial"
    Quando o subtotal do pedido é R$ 59,90
    Então o frete exibido é de R$ 19,90
    E o total do pedido é de R$ 79,80

  @CT-FRETE-02 @CA06 @interface @automatizado
  Cenário: Frete grátis com subtotal mínimo exato
    Dado que o carrinho contém 2 unidades do produto "Mochila Urbana 20L"
    Quando o subtotal do pedido é R$ 200,00
    Então o frete exibido é de R$ 0,00
    E o total do pedido é de R$ 200,00

  @CT-FRETE-03 @CA07 @CA08 @interface @manual
  Cenário: Frete cobrado e valor faltante para frete grátis
    Dado que o carrinho contém 1 unidade do produto "Camiseta Essencial"
    E contém 1 unidade do produto "Calça Jeans Slim"
    Quando o subtotal do pedido é R$ 199,80
    Então o frete exibido é de R$ 19,90
    E o valor faltante para o frete grátis é de R$ 0,20
    E o total do pedido é de R$ 219,70

  @CT-FRETE-04 @CA06 @CA08 @CA09 @interface @automatizado
  Cenário: Frete grátis com cupom válido considerando subtotal antes do desconto
    Dado que o carrinho contém 2 unidades do produto "Mochila Urbana 20L"
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto exibido é de R$ 20,00
    E o frete exibido é de R$ 0,00
    E o total do pedido é de R$ 180,00

  @CT-FRETE-05 @CA06 @CA09 @interface @manual
  Cenário: Frete grátis com jaqueta e cupom válido
    Dado que o carrinho contém 1 unidade do produto "Jaqueta Corta-Vento"
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto exibido é de R$ 22,99
    E o frete exibido é de R$ 0,00
    E o total do pedido é de R$ 206,91

  @CT-FRETE-06 @CA07 @interface @manual
  Cenário: Valor faltante para frete grátis na compra com mochila
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando o subtotal do pedido é R$ 100,00
    Então o valor faltante para o frete grátis é de R$ 100,00
    E o valor deve ser registrado como "A confirmar na execução" na interface
