# language: pt
Funcionalidade: Aplicação de cupom de desconto

  Contexto:
    Dado que a loja está acessível

  @CT-CUPOM-01 @CA01 @interface @automatizado
  Cenário: Aplicar o cupom válido BEMVINDO10
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto exibido é de R$ 10,00
    E o total do pedido é de R$ 109,90

  @CT-CUPOM-02 @CA02 @interface @automatizado
  Esquema do Cenário: Aceitar variações de caixa e espaços no código do cupom
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando aplico o cupom "<codigo>"
    Então o desconto exibido é de R$ 10,00
    E o total do pedido é de R$ 109,90

    Exemplos:
      | codigo            |
      | bemvindo10        |
      | BemVindo10        |
      |  BEMVINDO10       |
      | BEMVINDO10        |

  @CT-CUPOM-03 @CA03 @interface @manual
  Cenário: Exibir mensagem para cupom inexistente
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando aplico o cupom "DESCONTO99"
    Então a mensagem exibida é "Cupom inválido."
    E o desconto exibido é de R$ 0,00
    E o total do pedido é de R$ 119,90

  @CT-CUPOM-04 @CA04 @interface @manual
  Cenário: Exibir mensagem para cupom expirado
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    Quando aplico o cupom "VERAO2026"
    Então a mensagem exibida é "Cupom expirado."
    E o desconto exibido é de R$ 0,00
    E o total do pedido é de R$ 119,90

  @CT-CUPOM-05 @CA05 @interface @exploratorio
  Cenário: Aplicar um segundo cupom sem remover o primeiro
    Dado que o carrinho contém 1 unidade do produto "Mochila Urbana 20L"
    E que o cupom "BEMVINDO10" já foi aplicado
    Quando aplico um segundo cupom sem remover o primeiro
    Então o comportamento observado deve ser registrado para análise
    E o resultado deve ser registrado como "A confirmar na execução"

  @CT-CUPOM-06 @CA01 @CA07 @interface @manual
  Cenário: Aplicar cupom com subtotal abaixo do limite de frete grátis
    Dado que o carrinho contém 1 unidade do produto "Camiseta Essencial"
    Quando aplico o cupom "BEMVINDO10"
    Então o desconto exibido é de R$ 5,99
    E o frete exibido é de R$ 19,90
    E o total do pedido é de R$ 73,81
