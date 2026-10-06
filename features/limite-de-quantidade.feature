# language: pt
Funcionalidade: Limite de quantidade por produto

  @CT-QUANTIDADE-01 @CA10 @interface @automatizado
  Cenário: O kit de meias aceita até 5 unidades
    Dado que a loja está acessível
    E que o carrinho contém 5 unidades do produto "Kit 3 Pares de Meias"
    Então o subtotal exibido é de R$ 149,50
    E o frete exibido é de R$ 19,90
    E o total do pedido é de R$ 169,40

  @CT-QUANTIDADE-02 @CA10 @interface @automatizado
  Cenário: O carrinho bloqueia a sexta unidade do kit de meias
    Dado que a loja está acessível
    E que o carrinho contém 5 unidades do produto "Kit 3 Pares de Meias"
    Quando adiciono mais 1 unidade do mesmo produto
    Então o carrinho não deve ultrapassar 5 unidades
    E o mecanismo observado deve ser registrado

  @CT-QUANTIDADE-03 @CA10 @api @automatizado
  Cenário: API aceita até 5 unidades do kit de meias
    Dado que a API da loja está acessível
    Quando envio uma requisição POST para "/api/carrinho/calcular" com o item "P006" em quantidade 5
    Então a resposta tem status 200
    E o campo "subtotal" é 149.5

  @CT-QUANTIDADE-04 @CA10 @api @automatizado
  Esquema do Cenário: API rejeita quantidade acima do limite
    Dado que a API da loja está acessível
    Quando envio uma requisição para "<endpoint>" com o item "P006" em quantidade 6
    Então a resposta tem status 422
    E o campo "erro.codigo" é "QUANTIDADE_MAXIMA_EXCEDIDA"

    Exemplos:
      | endpoint                    |
      | /api/carrinho/calcular      |
      | /api/pedidos               |

  @CT-QUANTIDADE-05 @CA10 @api @automatizado
  Esquema do Cenário: API rejeita quantidade inválida
    Dado que a API da loja está acessível
    Quando envio uma requisição para "/api/carrinho/calcular" com o item "P001" em quantidade "<quantidade>"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "QUANTIDADE_INVALIDA"

    Exemplos:
      | quantidade |
      | 0          |
      | -1         |
      | 1.5        |
