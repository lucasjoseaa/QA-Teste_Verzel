# language: pt
Funcionalidade: API de pedidos

  Contexto:
    Dado que a API da loja está acessível

  @CT-API-PEDIDOS-01 @CA01 @CA06 @api @automatizado
  Cenário: Confirmar pedido com exemplo da documentação
    Quando envio uma requisição POST para "/api/pedidos" com o payload do exemplo da documentação
    Então a resposta tem status 201
    E o campo "numero" corresponde ao padrão "VZ-" seguido de 6 dígitos
    E o campo "total" é 109.9
    E o campo "cupom.codigo" é "BEMVINDO10"

  @CT-API-PEDIDOS-02 @CA03 @api @automatizado
  Cenário: Pedido com cupom inexistente é rejeitado
    Quando envio uma requisição POST para "/api/pedidos" com o item "P005" em quantidade 1 e cupom "DESCONTO99"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "CUPOM_INVALIDO"

  @CT-API-PEDIDOS-03 @CA04 @api @automatizado
  Cenário: Pedido com cupom expirado é rejeitado
    Quando envio uma requisição POST para "/api/pedidos" com o item "P005" em quantidade 1 e cupom "VERAO2026"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "CUPOM_EXPIRADO"

  @CT-API-PEDIDOS-04 @api @automatizado
  Cenário: A mensagem de erro não expõe produtoId ausente ou inválido
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido e produtoId <estado>
    Então a resposta tem status 422
    E a mensagem de erro não contém valores internos do código
