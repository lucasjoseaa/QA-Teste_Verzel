# Matriz de cenários

Legenda: CT = caso de teste, CAnn = critério de aceite, BUG-NNN = defeito.

## 1. Resumo por área

| Área | Quantidade de cenários |
| --- | ---: |
| Cupom de desconto | 6 |
| Frete grátis | 6 |
| Limite de quantidade | 5 |
| Cálculo do carrinho | 3 |
| API de cálculo do carrinho | 8 |
| API de pedidos | 3 |
| Validação do cliente | 6 |
| API de produtos e rotas | 6 |
| Fluxo da interface | 5 |
| Total | 48 |

## 2. Resumo por tipo

| Tipo | Quantidade |
| --- | ---: |
| Automatizado | 32 |
| Manual | 14 |
| Exploratório | 2 |

## 3. Cobertura dos critérios de aceite

| Critério | Cenários |
| --- | --- |
| CA01 | CT-CUPOM-01, CT-CUPOM-06, CT-CALCULO-02, CT-API-CARRINHO-01, CT-API-PEDIDOS-01 |
| CA02 | CT-CUPOM-02 |
| CA03 | CT-CUPOM-03, CT-API-CARRINHO-03, CT-API-PEDIDOS-02 |
| CA04 | CT-CUPOM-04, CT-API-CARRINHO-04, CT-API-PEDIDOS-03 |
| CA05 | CT-CUPOM-05 |
| CA06 | CT-FRETE-02, CT-FRETE-04, CT-CALCULO-02, CT-API-CARRINHO-02, CT-API-CARRINHO-08, CT-API-PEDIDOS-01 |
| CA07 | CT-FRETE-01, CT-FRETE-03, CT-FRETE-06, CT-CUPOM-06 |
| CA08 | CT-FRETE-03, CT-FRETE-04, CT-CALCULO-02, CT-API-CARRINHO-08 |
| CA09 | CT-FRETE-04, CT-FRETE-05, CT-API-CARRINHO-01 |
| CA10 | CT-QUANTIDADE-01, CT-QUANTIDADE-02, CT-QUANTIDADE-03, CT-QUANTIDADE-04, CT-QUANTIDADE-05, CT-API-CARRINHO-05, CT-API-CARRINHO-06, CT-API-CARRINHO-07 |
| CA11 | CT-CALCULO-01, CT-CALCULO-02, CT-CALCULO-03, CT-API-CARRINHO-01, CT-API-CARRINHO-02, CT-CLIENTE-01, CT-CLIENTE-02, CT-CLIENTE-03, CT-CLIENTE-04, CT-CLIENTE-05, CT-CLIENTE-06 |

## 4. Cupom de desconto

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-CUPOM-01 | CA01 | Aplicar o cupom válido BEMVINDO10 em mochila x1. | Carrinho vazio. | Mochila x1, BEMVINDO10. | Desconto R$ 10,00; total R$ 109,90. | Interface | Automatizado | Alta |
| CT-CUPOM-02 | CA02 | Aceitar variações de caixa e espaços no código do cupom. | Carrinho vazio. | Mochila x1, códigos `bemvindo10`, `BemVindo10`, ` BEMVINDO10`, `BEMVINDO10 `. | Mesmo resultado do cenário 01. | Interface | Automatizado | Alta |
| CT-CUPOM-03 | CA03 | Exibir mensagem para cupom inexistente. | Carrinho vazio. | Mochila x1, DESCONTO99. | Mensagem "Cupom inválido."; sem desconto; total R$ 119,90. | Interface | Manual | Alta |
| CT-CUPOM-04 | CA04 | Exibir mensagem para cupom expirado. | Carrinho vazio. | Mochila x1, VERAO2026. | Mensagem "Cupom expirado."; sem desconto; total R$ 119,90. | Interface | Manual | Alta |
| CT-CUPOM-05 | CA05 | Registrar o comportamento ao aplicar um segundo cupom sem remover o primeiro. | Carrinho com mochila x1 e cupom aplicado. | Segundo cupom sem remover o primeiro. | Comportamento registrado; ambiguidade nº 2 da análise. | Interface | Exploratório | Média |
| CT-CUPOM-06 | CA01, CA07 | Aplicar cupom em compra abaixo do valor de frete grátis. | Carrinho com camiseta x1. | Camiseta x1, BEMVINDO10. | Desconto R$ 5,99, frete R$ 19,90, total R$ 73,81. | Interface | Manual | Média |

## 5. Frete grátis

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-FRETE-01 | CA07 | Frete cobrado abaixo do subtotal mínimo. | Carrinho vazio. | Camiseta x1. | Frete R$ 19,90; total R$ 79,80. | Interface | Automatizado | Alta |
| CT-FRETE-02 | CA06 | Frete grátis com subtotal mínimo exato. | Carrinho vazio. | Mochila x2. | Frete R$ 0,00; total R$ 200,00. | Interface | Automatizado | Alta |
| CT-FRETE-03 | CA07, CA08 | Frete cobrado e valor faltante para frete grátis. | Carrinho vazio. | Camiseta x1 + Calça x1. | Frete R$ 19,90; faltante R$ 0,20; total R$ 219,70. | Interface | Manual | Alta |
| CT-FRETE-04 | CA06, CA08, CA09 | Frete grátis com cupom válido considerando subtotal antes do desconto. | Carrinho vazio. | Mochila x2 + BEMVINDO10. | Desconto R$ 20,00; frete R$ 0,00; total R$ 180,00. | Interface | Automatizado | Alta |
| CT-FRETE-05 | CA06, CA09 | Frete grátis com jaqueta e cupom válido. | Carrinho vazio. | Jaqueta x1 + BEMVINDO10. | Desconto R$ 22,99; frete R$ 0,00; total R$ 206,91. | Interface | Manual | Média |
| CT-FRETE-06 | CA07 | Valor faltante para frete grátis na compra com mochila. | Carrinho vazio. | Mochila x1. | Valor faltante para frete grátis de R$ 100,00; exibição na interface: A confirmar na execução. | Interface | Manual | Média |

## 6. Limite de quantidade

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-QUANTIDADE-01 | CA10 | O kit de meias aceita até 5 unidades. | Carrinho vazio. | Kit de Meias x5. | Subtotal R$ 149,50; frete R$ 19,90; total R$ 169,40. | Interface | Automatizado | Alta |
| CT-QUANTIDADE-02 | CA10 | O carrinho bloqueia a sexta unidade do kit de meias. | Carrinho com 5 unidades do kit. | Adicionar mais 1 unidade. | Não ultrapassa 5 unidades; mecanismo registrado. | Interface | Automatizado | Alta |
| CT-QUANTIDADE-03 | CA10 | API aceita até 5 unidades do kit de meias. | API acessível. | POST /api/carrinho/calcular com P006 x5. | Status 200; subtotal 149.5. | API | Automatizado | Alta |
| CT-QUANTIDADE-04 | CA10 | API rejeita quantidade acima do limite. | API acessível. | Outline com /api/carrinho/calcular e /api/pedidos com P006 x6. | Status 422; erro QUANTIDADE_MAXIMA_EXCEDIDA. | API | Automatizado | Alta |
| CT-QUANTIDADE-05 | CA10 | API rejeita quantidade inválida. | API acessível. | Outline com quantidade 0, -1, 1.5 em P001. | Status 422; erro QUANTIDADE_INVALIDA. | API | Automatizado | Alta |

## 7. Cálculo do carrinho

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-CALCULO-01 | CA11 | Validar cálculos sem cupom. | Carrinho vazio. | Outline com Camiseta x1, Mochila x2, Tênis x1. | Subtotal, frete e total conforme a tabela da documentação. | Interface | Manual | Alta |
| CT-CALCULO-02 | CA01, CA06, CA08, CA09, CA11 | Validar cálculos com cupom BEMVINDO10. | Carrinho vazio. | Outline com Mochila x1, Calça x1 + Boné x2, Camiseta x1 + Calça x1. | Desconto, frete e total conforme a tabela da documentação. | Interface | Manual | Alta |
| CT-CALCULO-03 | CA11 | Validar arredondamento para duas casas decimais. | Carrinho vazio. | Outline com Camiseta x3 + cupom e Kit de Meias x3 + cupom. | Nenhum valor apresenta mais de duas casas decimais. | Interface | Manual | Alta |

## 8. API de cálculo do carrinho

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-API-CARRINHO-01 | CA01, CA09, CA11 | Calcular carrinho com exemplo da documentação. | API acessível. | Payload do exemplo. | Status 200; subtotal 239.7; desconto 23.97; frete 0; total 215.73; cupom aplicado. | API | Automatizado | Alta |
| CT-API-CARRINHO-02 | CA06 | Calcular carrinho sem cupom com subtotal exato de 200. | API acessível. | P005 x2 sem cupom. | Status 200; subtotal 200; frete 0; total 200. | API | Automatizado | Alta |
| CT-API-CARRINHO-03 | CA03 | Cupom inexistente na API de cálculo. | API acessível. | P005 x1, cupom DESCONTO99. | Status 200; cupom.aplicado false; desconto 0. | API | Automatizado | Alta |
| CT-API-CARRINHO-04 | CA04 | Cupom expirado na API de cálculo. | API acessível. | P005 x1, cupom VERAO2026. | Status 200; cupom.aplicado false; desconto 0. | API | Automatizado | Alta |
| CT-API-CARRINHO-05 | CA10 | Itens vazios são rejeitados. | API acessível. | Lista de itens vazia. | Status 422; erro ITENS_OBRIGATORIOS. | API | Automatizado | Média |
| CT-API-CARRINHO-06 | CA10 | Produto inexistente é rejeitado. | API acessível. | P999 x1. | Status 422; erro PRODUTO_NAO_ENCONTRADO. | API | Automatizado | Média |
| CT-API-CARRINHO-07 | CA10 | Itens duplicados são rejeitados. | API acessível. | Mesmo produto em duas linhas. | Status 422; erro ITEM_DUPLICADO. | API | Automatizado | Média |
| CT-API-CARRINHO-08 | CA06, CA08 | Calcular frete grátis com cupom sobre subtotal de R$ 200,00. | API acessível. | POST /api/carrinho/calcular com P005 x2 e BEMVINDO10. | Status 200; subtotal 200; desconto 20; frete 0; total 180. | API | Automatizado | Alta |

## 9. API de pedidos

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-API-PEDIDOS-01 | CA01, CA06 | Confirmar pedido com exemplo da documentação. | API acessível. | Maria Silva, maria@exemplo.com, CEP 01310-100, P005 x1, BEMVINDO10. | Status 201; número no padrão VZ- + 6 dígitos; total 109.9. | API | Automatizado | Alta |
| CT-API-PEDIDOS-02 | CA03 | Pedido com cupom inexistente rejeitado. | API acessível. | P005 x1, cupom DESCONTO99. | Status 422; erro CUPOM_INVALIDO. | API | Automatizado | Alta |
| CT-API-PEDIDOS-03 | CA04 | Pedido com cupom expirado rejeitado. | API acessível. | P005 x1, cupom VERAO2026. | Status 422; erro CUPOM_EXPIRADO. | API | Automatizado | Alta |

## 10. Validação do cliente

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-CLIENTE-01 | CA11 | Nome sem sobrenome é rejeitado. | API acessível. | Cliente "Ana" com dados válidos. | Status 422; erro DADOS_INVALIDOS. | API | Automatizado | Alta |
| CT-CLIENTE-02 | CA11 | E-mails inválidos são rejeitados. | API acessível. | Outline com maria, maria@, maria@exemplo. | Status 422; erro DADOS_INVALIDOS. | API | Automatizado | Alta |
| CT-CLIENTE-03 | CA11 | CEP inválido é rejeitado. | API acessível. | Outline com 7 dígitos, 9 dígitos e letras. | Status 422; erro DADOS_INVALIDOS. | API | Automatizado | Média |
| CT-CLIENTE-04 | CA11 | CEP com hífen e sem hífen são aceitos. | API acessível. | CEP 01310-100 e 01310100. | Status 201 em ambos; formato retornado registrado. | API | Manual | Média |
| CT-CLIENTE-05 | CA11 | Recusar nome com número ou símbolo. | API acessível. | Outline com os nomes `lucas1 jose2`, `lucas@ jose#` e `lucas1 jose@`; P005 x1; demais dados válidos. | Status 422; erro DADOS_INVALIDOS. A documentação exige nome e sobrenome, mas não define caracteres permitidos. Expectativa baseada em validação usual de nomes (requisito implícito), não em regra explícita; revisar. | API | Automatizado | Média |
| CT-CLIENTE-06 | CA11 | Recusar e-mail com caracteres inválidos no domínio. | API acessível. | P005 x1; e-mail `usuario@!#%.com`; demais dados válidos. | Status 422; erro DADOS_INVALIDOS, conforme requisito documentado de e-mail válido. | API | Automatizado | Média |

## 11. API de produtos e rotas

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-API-GERAL-01 | - | Listar todos os produtos disponíveis. | API acessível. | GET /api/produtos. | Status 200; 8 produtos com id, nome e preço. | API | Automatizado | Alta |
| CT-API-GERAL-02 | - | Consultar o produto P001. | API acessível. | GET /api/produtos/P001. | Status 200; nome e preço conforme a documentação. | API | Automatizado | Média |
| CT-API-GERAL-03 | - | Consultar produto inexistente. | API acessível. | GET /api/produtos/P999. | Status 404; erro PRODUTO_NAO_ENCONTRADO. | API | Automatizado | Média |
| CT-API-GERAL-04 | - | Consultar rota inexistente. | API acessível. | GET /api/rota-inexistente. | Status 404; erro ROTA_NAO_ENCONTRADA. | API | Automatizado | Média |
| CT-API-GERAL-05 | - | Usar método não permitido. | API acessível. | GET /api/pedidos. | Status 405; erro METODO_NAO_PERMITIDO. | API | Automatizado | Baixa |
| CT-API-GERAL-06 | - | Enviar JSON inválido na API de cálculo. | API acessível. | POST /api/carrinho/calcular com corpo não JSON. | Status 400; erro JSON_INVALIDO. | API | Automatizado | Baixa |

## 12. Fluxo da interface

| ID | Critério | Descrição | Pré-condições | Dados de entrada | Resultado esperado | Camada | Tipo | Prioridade |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CT-INTERFACE-01 | - | Página inicial exibe os produtos da vitrine. | Loja acessível. | Página inicial. | 8 produtos com categoria, nome, descrição, preço e botão "Adicionar ao carrinho". | Interface | Manual | Alta |
| CT-INTERFACE-02 | - | Carrinho vazio informa que ele está vazio. | Loja acessível. | Carrinho sem produtos. | Texto "Seu carrinho está vazio"; texto "Escolha um produto na vitrine para começar."; botão "Ver produtos". | Interface | Manual | Baixa |
| CT-INTERFACE-03 | - | Remover um item do carrinho recalcula o total. | Carrinho com item válido. | Remoção do item. | Subtotal, frete e total recalculados. | Interface | Manual | Média |
| CT-INTERFACE-04 | - | Outra aba ou janela anônima inicia com carrinho vazio. | Loja acessível. | Outra aba ou janela anônima. | Carrinho vazio; comportamento esperado do ambiente. | Interface | Manual | Baixa |
| CT-INTERFACE-05 | - | Concluir o pedido pela interface com dados válidos. | Carrinho com itens válidos. | Fluxo completo da interface. | Resultado a confirmar na execução; tela de fechamento ainda não mapeada. | Interface | Exploratório | Alta |
