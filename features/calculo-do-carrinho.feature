# language: pt
Funcionalidade: Cálculo do carrinho e arredondamento

  Contexto:
    Dado que a loja está acessível

  @CT-CALCULO-01 @CA11 @interface @manual
  Esquema do Cenário: Validar cálculos sem cupom
    Dado que o carrinho contém "<quantidade>" unidade(s) do produto "<produto>"
    Então o subtotal exibido é de "<subtotal>"
    E o frete exibido é de "<frete>"
    E o total do pedido é de "<total>"

    Exemplos:
      | produto                 | quantidade | subtotal | frete   | total   |
      | Camiseta Essencial      | 1          | R$ 59,90 | R$ 19,90 | R$ 79,80 |
      | Mochila Urbana 20L      | 2          | R$ 200,00 | R$ 0,00 | R$ 200,00 |
      | Tênis Casual Urbano     | 1          | R$ 189,90 | R$ 19,90 | R$ 209,80 |

  @CT-CALCULO-02 @CA01 @CA06 @CA08 @CA09 @CA11 @interface @manual
  Esquema do Cenário: Validar cálculos com cupom BEMVINDO10
    Dado que o carrinho contém "<itens>"
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal exibido é de "<subtotal>"
    E o desconto exibido é de "<desconto>"
    E o frete exibido é de "<frete>"
    E o total do pedido é de "<total>"

    Exemplos:
      | itens                                            | subtotal  | desconto | frete   | total   |
      | 1 unidade do produto "Mochila Urbana 20L"       | R$ 100,00 | R$ 10,00 | R$ 19,90 | R$ 109,90 |
      | 1 unidade do produto "Calça Jeans Slim" + 2 unidades do produto "Boné Aba Curva" | R$ 239,70 | R$ 23,97 | R$ 0,00 | R$ 215,73 |
      | 1 unidade do produto "Camiseta Essencial" + 1 unidade do produto "Calça Jeans Slim" | R$ 199,80 | R$ 19,98 | R$ 19,90 | R$ 199,72 |

  @CT-CALCULO-03 @CA11 @interface @manual
  Esquema do Cenário: Validar arredondamento para duas casas decimais
    Dado que o carrinho contém "<itens>"
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal exibido é de "<subtotal>"
    E o desconto exibido é de "<desconto>"
    E o frete exibido é de "<frete>"
    E o total do pedido é de "<total>"
    E nenhum valor deve apresentar mais de duas casas decimais

    Exemplos:
      | itens                                                               | subtotal  | desconto | frete   | total   |
      | 3 unidades do produto "Camiseta Essencial"                        | R$ 179,70 | R$ 17,97 | R$ 19,90 | R$ 181,63 |
      | 3 unidades do produto "Kit 3 Pares de Meias"                     | R$ 89,70 | R$ 8,97 | R$ 19,90 | R$ 100,63 |
