# language: pt
Funcionalidade: Validação do cliente

  Contexto:
    Dado que a API da loja está acessível

  @CT-CLIENTE-01 @CA11 @api @automatizado
  Cenário: Nome sem sobrenome é rejeitado
    Quando envio uma requisição POST para "/api/pedidos" com cliente "Ana" e dados válidos
    Então a resposta tem status 422
    E o campo "erro.codigo" é "DADOS_INVALIDOS"

  @CT-CLIENTE-02 @CA11 @api @automatizado
  Esquema do Cenário: E-mails inválidos são rejeitados
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido e e-mail "<email>"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "DADOS_INVALIDOS"

    Exemplos:
      | email       |
      | maria       |
      | maria@      |
      | maria@exemplo |

  @CT-CLIENTE-03 @CA11 @api @automatizado
  Esquema do Cenário: CEP inválido é rejeitado
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido e CEP "<cep>"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "DADOS_INVALIDOS"

    Exemplos:
      | cep        |
      | 01310-1    |
      | 013101000  |
      | 01310A100  |

  @CT-CLIENTE-04 @CA11 @api @manual
  Cenário: CEP com hífen e sem hífen são aceitos
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido e CEP "01310-100"
    Então a resposta tem status 201
    E quando envio a mesma requisição com CEP "01310100"
    E a resposta também tem status 201
    E o formato do CEP retornado deve ser registrado

  @CT-CLIENTE-05 @CA11 @api @automatizado
  Esquema do Cenário: Recusar nome com número ou símbolo
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido, nome "<nome>" e o item "P005" em quantidade 1
    Então a resposta tem status 422
    E o campo "erro.codigo" é "DADOS_INVALIDOS"

    Exemplos:
      | nome         |
      | lucas1 jose2 |
      | lucas@ jose# |
      | lucas1 jose@ |

  @CT-CLIENTE-06 @CA11 @api @automatizado
  Cenário: Recusar e-mail com caracteres inválidos no domínio
    Quando envio uma requisição POST para "/api/pedidos" com cliente válido, exceto o e-mail "usuario@!#%.com"
    Então a resposta tem status 422
    E o campo "erro.codigo" é "DADOS_INVALIDOS"

  # A documentação exige nome e sobrenome, mas não define caracteres permitidos; a expectativa é implícita e requer revisão.
