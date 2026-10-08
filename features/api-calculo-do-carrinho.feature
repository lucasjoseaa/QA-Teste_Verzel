# language: pt
Funcionalidade: API de cálculo do carrinho

  Contexto:
    Dado que a API da loja está acessível

  @CT-API-CARRINHO-01 @CA01 @CA06 @CA07 @CA09 @CA11 @api @automatizado
  Cenário: Calcular carrinho com exemplo da documentação
    Quando envio uma requisição POST para "/api/carrinho/calcular" com o payload do exemplo da documentação
    Então a resposta tem status 200
    E o campo "subtotal" é 239.7
    E o campo "desconto" é 23.97
    E o campo "frete" é 0
    E o campo "total" é 215.73
    E o campo "cupom.codigo" é "BEMVINDO10"
    E o campo "cupom.aplicado" é true

  @CT-API-CARRINHO-02 @CA06 @api @automatizado
  Cenário: Calcular carrinho sem cupom com subtotal exato de 200
    Quando envio uma requisição POST para "/api/carrinho/calcular" com os itens "P005" em quantidade 2 e sem cupom
    Então a resposta tem status 200
    E o campo "subtotal" é 200
    E o campo "frete" é 0
    E o campo "total" é 200

  @CT-API-CARRINHO-03 @CA03 @api @automatizado
  Cenário: Cupom inexistente na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com os itens "P005" em quantidade 1 e cupom "DESCONTO99"
    Então a resposta tem status 200
    E o campo "cupom.aplicado" é false
    E o campo "desconto" é 0

  @CT-API-CARRINHO-04 @CA04 @api @automatizado
  Cenário: Cupom expirado na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com os itens "P005" em quantidade 1 e cupom "VERAO2026"
    Então a resposta tem status 200
    E o campo "cupom.aplicado" é false
    E o campo "desconto" é 0

  @CT-API-CARRINHO-05 @CA10 @api @automatizado
  Cenário: Itens vazios são rejeitados na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com itens vazios
    Então a resposta tem status 422
    E o campo "erro.codigo" é "ITENS_OBRIGATORIOS"

  @CT-API-CARRINHO-06 @CA10 @api @automatizado
  Cenário: Produto inexistente é rejeitado na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com o item "P999" em quantidade 1
    Então a resposta tem status 422
    E o campo "erro.codigo" é "PRODUTO_NAO_ENCONTRADO"

  @CT-API-CARRINHO-07 @CA10 @api @automatizado
  Cenário: Itens duplicados são rejeitados na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com o item "P005" duplicado em duas linhas
    Então a resposta tem status 422
    E o campo "erro.codigo" é "ITEM_DUPLICADO"

  @CT-API-CARRINHO-08 @CA06 @CA08 @api @automatizado
  Cenário: Calcular frete grátis com cupom sobre subtotal de R$ 200,00
    Quando envio uma requisição POST para "/api/carrinho/calcular" com os itens "P005" em quantidade 2 e cupom "BEMVINDO10"
    Então a resposta tem status 200
    E o campo "subtotal" é 200
    E o campo "desconto" é 20
    E o campo "frete" é 0
    E o campo "total" é 180

  @CT-API-CARRINHO-09 @api @automatizado
  Cenário: A mensagem de erro não expõe produtoId ausente ou inválido
    Quando envio uma requisição POST para "/api/carrinho/calcular" com produtoId <estado>
    Então a resposta tem status 422
    E a mensagem de erro não contém valores internos do código
