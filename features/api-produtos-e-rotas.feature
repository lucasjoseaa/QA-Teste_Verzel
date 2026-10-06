# language: pt
Funcionalidade: Produtos e rotas da API

  Contexto:
    Dado que a API da loja está acessível

  @CT-API-GERAL-01 @api @automatizado
  Cenário: Listar todos os produtos disponíveis
    Quando envio uma requisição GET para "/api/produtos"
    Então a resposta tem status 200
    E a API retorna 8 produtos
    E cada produto possui id, nome e preço conforme a documentação

  @CT-API-GERAL-02 @api @automatizado
  Cenário: Consultar o produto P001
    Quando envio uma requisição GET para "/api/produtos/P001"
    Então a resposta tem status 200
    E o campo "nome" é "Camiseta Essencial"
    E o campo "preco" é 59.9

  @CT-API-GERAL-03 @api @automatizado
  Cenário: Consultar produto inexistente
    Quando envio uma requisição GET para "/api/produtos/P999"
    Então a resposta tem status 404
    E o campo "erro.codigo" é "PRODUTO_NAO_ENCONTRADO"

  @CT-API-GERAL-04 @api @automatizado
  Cenário: Consultar rota inexistente
    Quando envio uma requisição GET para "/api/rota-inexistente"
    Então a resposta tem status 404
    E o campo "erro.codigo" é "ROTA_NAO_ENCONTRADA"

  @CT-API-GERAL-05 @api @automatizado
  Cenário: Usar método não permitido
    Quando envio uma requisição GET para "/api/pedidos"
    Então a resposta tem status 405
    E o campo "erro.codigo" é "METODO_NAO_PERMITIDO"

  @CT-API-GERAL-06 @api @automatizado
  Cenário: Enviar JSON inválido na API de cálculo
    Quando envio uma requisição POST para "/api/carrinho/calcular" com corpo que não é um JSON válido
    Então a resposta tem status 400
    E o campo "erro.codigo" é "JSON_INVALIDO"
