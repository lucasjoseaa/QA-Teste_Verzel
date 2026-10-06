# Execução dos testes

## 1. Resumo da execução

| Item | Resultado |
|---|---|
| Data | 06/10/2026 |
| Execução da API (complemento) | 19:57:19 (UTC−03:00) |
| Execução da interface | 19:12:02 (UTC−03:00) |
| Node.js | v24.21.0 |
| Playwright | 1.63.0 |
| Cenários definidos na matriz | 48 |
| Casos automatizados executados, com exemplos expandidos | 44 |
| Passou | 34 |
| Falhou | 10 |
| Não executado (cenários manuais e exploratórios) | 16 |

Os 44 resultados automatizados correspondem às 34 execuções de API deste complemento e às 10 execuções de interface registradas anteriormente; as linhas de exemplos foram expandidas. Os 16 cenários manuais e exploratórios não foram executados. Assim, os totais por resultado abrangem os casos automatizados expandidos e os cenários não executados; os cenários em outline explicam a diferença entre 48 definições da matriz e 60 registros de resultado.

| Camada | Casos executados | Passou | Falhou |
|---|---:|---:|---:|
| API | 34 | 26 | 8 |
| Interface | 10 | 8 | 2 |
| Total | 44 | 34 | 10 |

Os relatórios JSON e as saídas completas de texto foram gerados em arquivos temporários durante a execução e removidos ao concluir esta etapa. As evidências de falha foram preservadas em [`evidencias/`](./evidencias/).

## 2. Resultados por área

### 2.1 Cupom de desconto

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CUPOM-01 | Aplicar o cupom válido BEMVINDO10 | Interface | Automatizado | Passou | — | — |
| CT-CUPOM-02 | Aceitar variações de caixa e espaços no código do cupom | Interface | Automatizado | Passou (4 de 4 exemplos) | — | — |
| CT-CUPOM-03 | Exibir mensagem para cupom inexistente | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-CUPOM-04 | Exibir mensagem para cupom expirado | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-CUPOM-05 | Aplicar um segundo cupom sem remover o primeiro | Interface | Exploratório | Não executado | — | Preencher após sessão exploratória. |
| CT-CUPOM-06 | Aplicar cupom em compra abaixo do valor de frete grátis | Interface | Manual | Não executado | — | Preencher após execução manual. |

### 2.2 Frete grátis

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-FRETE-01 | Frete cobrado abaixo do subtotal mínimo | Interface | Automatizado | Passou | — | — |
| CT-FRETE-02 | Frete grátis com subtotal mínimo exato | Interface | Automatizado | Falhou | [Captura](./evidencias/interface/CT-FRETE-02.png) | Esperado: frete R$ 0,00 e total R$ 200,00 (CA06 e matriz); obtido: frete R$ 19,90 e total R$ 219,90. Divergência com a documentação, a classificar como defeito na Etapa 6. |
| CT-FRETE-03 | Frete cobrado e valor faltante para frete grátis | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-FRETE-04 | Frete grátis com cupom válido considerando subtotal antes do desconto | Interface | Automatizado | Falhou | [Captura](./evidencias/interface/CT-FRETE-04.png) | Esperado: desconto R$ 20,00, frete R$ 0,00 e total R$ 180,00 (CA06, CA08 e matriz); obtido: desconto R$ 20,00, frete R$ 19,90 e total R$ 199,90. Divergência com a documentação, a classificar como defeito na Etapa 6. |
| CT-FRETE-05 | Frete grátis com jaqueta e cupom válido | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-FRETE-06 | Valor faltante para frete grátis na compra com mochila | Interface | Manual | Não executado | — | Preencher após execução manual. |

### 2.3 Limite de quantidade

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-QUANTIDADE-01 | O kit de meias aceita até 5 unidades | Interface | Automatizado | Passou | — | — |
| CT-QUANTIDADE-02 | O carrinho bloqueia a sexta unidade do kit de meias | Interface | Automatizado | Passou | — | A execução observou o limite de 5 unidades. |
| CT-QUANTIDADE-03 | API aceita até 5 unidades do kit de meias | API | Automatizado | Passou | — | — |
| CT-QUANTIDADE-04 | API rejeita quantidade acima do limite | API | Automatizado | Falhou (0 de 2 exemplos passaram) | [Resposta de cálculo](./evidencias/api/CT-QUANTIDADE-04-api-carrinho-calcular-resposta.json); [resposta de pedido](./evidencias/api/CT-QUANTIDADE-04-api-pedidos-resposta.json) | Esperado para ambos os endpoints: status 422 e código `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro); obtido: status 200 em `/api/carrinho/calcular` e status 201 em `/api/pedidos`. Divergência com a documentação, a classificar como defeito na Etapa 6. |
| CT-QUANTIDADE-05 | API rejeita quantidade inválida | API | Automatizado | Passou (3 de 3 exemplos) | — | — |

### 2.4 Cálculo do carrinho

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CALCULO-01 | Validar cálculos sem cupom | Interface | Manual | Não executado | — | Preencher após execução manual dos três exemplos. |
| CT-CALCULO-02 | Validar cálculos com cupom BEMVINDO10 | Interface | Manual | Não executado | — | Preencher após execução manual dos três exemplos. |
| CT-CALCULO-03 | Validar arredondamento para duas casas decimais | Interface | Manual | Não executado | — | Preencher após execução manual dos dois exemplos. |

### 2.5 API de cálculo do carrinho

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-API-CARRINHO-01 | Calcular carrinho com exemplo da documentação | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-02 | Calcular carrinho sem cupom com subtotal exato de 200 | API | Automatizado | Falhou | [Resposta](./evidencias/api/CT-API-CARRINHO-02-resposta.json) | Esperado: status 200, subtotal 200, frete 0 e total 200 (CA06 e matriz); obtido: status 200, subtotal 200, frete 19.9 e total 219.9. Divergência com a documentação, a classificar como defeito na Etapa 6. |
| CT-API-CARRINHO-03 | Cupom inexistente na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-04 | Cupom expirado na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-05 | Itens vazios são rejeitados na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-06 | Produto inexistente é rejeitado na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-07 | Itens duplicados são rejeitados na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-08 | Calcular frete grátis com cupom sobre subtotal de R$ 200,00 | API | Automatizado | Falhou | [Resposta](./evidencias/api/CT-API-CARRINHO-08-resposta.json) | Esperado: status 200, subtotal 200, desconto 20, frete 0 e total 180 (CA06, CA08 e matriz); obtido: status 200, subtotal 200, desconto 20, frete 19.9 e total 199.9. Divergência com a documentação, a classificar como defeito na Etapa 6. |

### 2.6 API de pedidos

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-API-PEDIDOS-01 | Confirmar pedido com exemplo da documentação | API | Automatizado | Passou | — | — |
| CT-API-PEDIDOS-02 | Pedido com cupom inexistente é rejeitado | API | Automatizado | Passou | — | — |
| CT-API-PEDIDOS-03 | Pedido com cupom expirado é rejeitado | API | Automatizado | Passou | — | — |

### 2.7 Validação do cliente

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CLIENTE-01 | Nome sem sobrenome é rejeitado | API | Automatizado | Passou | — | — |
| CT-CLIENTE-02 | E-mails inválidos são rejeitados | API | Automatizado | Passou (3 de 3 exemplos) | — | — |
| CT-CLIENTE-03 | CEP inválido é rejeitado | API | Automatizado | Passou (3 de 3 exemplos) | — | — |
| CT-CLIENTE-04 | CEP com hífen e sem hífen são aceitos | API | Manual | Não executado | — | Preencher após execução manual. |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas1 jose2` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose2-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito; não definido explicitamente pela documentação. |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas@ jose#` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas-jose-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito; não definido explicitamente pela documentação. |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas1 jose@` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito; não definido explicitamente pela documentação. |
| CT-CLIENTE-06 | Recusar e-mail com caracteres inválidos no domínio | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. |

### 2.8 API de produtos e rotas

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-API-GERAL-01 | Listar todos os produtos disponíveis | API | Automatizado | Passou | — | — |
| CT-API-GERAL-02 | Consultar o produto P001 | API | Automatizado | Passou | — | — |
| CT-API-GERAL-03 | Consultar produto inexistente | API | Automatizado | Passou | — | — |
| CT-API-GERAL-04 | Consultar rota inexistente | API | Automatizado | Passou | — | — |
| CT-API-GERAL-05 | Usar método não permitido | API | Automatizado | Passou | — | — |
| CT-API-GERAL-06 | Enviar JSON inválido na API de cálculo | API | Automatizado | Passou | — | — |

### 2.9 Fluxo da interface

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-INTERFACE-01 | Página inicial exibe os produtos da vitrine | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-INTERFACE-02 | Carrinho vazio informa que ele está vazio | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-INTERFACE-03 | Remover um item do carrinho recalcula o total | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-INTERFACE-04 | Outra aba ou janela anônima inicia com carrinho vazio | Interface | Manual | Não executado | — | Preencher após execução manual. |
| CT-INTERFACE-05 | Concluir o pedido pela interface com dados válidos | Interface | Exploratório | Não executado | — | Preencher após sessão exploratória. |

## 3. Falhas observadas

Os valores esperados abaixo vêm dos critérios e resultados registrados na documentação e na matriz. Os valores obtidos são das execuções reais. Nenhuma falha foi classificada como bug nesta etapa.

| Teste | Esperado e fonte | Obtido na execução | Evidência |
|---|---|---|---|
| CT-API-CARRINHO-02 | Frete 0 e total 200 para subtotal 200 (CA06; matriz). | `{"subtotal":200,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":0,"total":219.9}` | [CT-API-CARRINHO-02-resposta.json](./evidencias/api/CT-API-CARRINHO-02-resposta.json) |
| CT-API-CARRINHO-08 | Frete 0 e total 180 para subtotal 200 com desconto 20 (CA06, CA08; matriz). | `{"subtotal":200,"desconto":20,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":0,"total":199.9}` | [CT-API-CARRINHO-08-resposta.json](./evidencias/api/CT-API-CARRINHO-08-resposta.json) |
| CT-QUANTIDADE-04 — `/api/carrinho/calcular` | Status 422 e `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro; matriz). | Status 200; resposta inclui quantidade 6, subtotal 179.4 e total 199.3. | [Resposta de cálculo](./evidencias/api/CT-QUANTIDADE-04-api-carrinho-calcular-resposta.json) |
| CT-QUANTIDADE-04 — `/api/pedidos` | Status 422 e `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro; matriz). | Status 201; resposta inclui quantidade 6, subtotal 179.4 e total 199.3. | [Resposta do pedido](./evidencias/api/CT-QUANTIDADE-04-api-pedidos-resposta.json) |
| CT-FRETE-02 | Frete R$ 0,00 e total R$ 200,00 para subtotal R$ 200,00 (CA06; matriz e feature). | Tela: subtotal R$ 200,00; frete R$ 19,90; total R$ 219,90. | [CT-FRETE-02.png](./evidencias/interface/CT-FRETE-02.png) |
| CT-FRETE-04 | Desconto R$ 20,00, frete R$ 0,00 e total R$ 180,00 (CA06, CA08, CA09; matriz e feature). | Tela: subtotal R$ 200,00; desconto - R$ 20,00; frete R$ 19,90; total R$ 199,90. | [CT-FRETE-04.png](./evidencias/interface/CT-FRETE-04.png) |
| CT-CLIENTE-05 — `lucas1 jose2` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-271642","criadoEm":"2026-10-06T22:56:21.966Z","cliente":{"nome":"lucas1 jose2","email":"maria@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose2-resposta.json) |
| CT-CLIENTE-05 — `lucas@ jose#` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-045397","criadoEm":"2026-10-06T22:56:22.641Z","cliente":{"nome":"lucas@ jose#","email":"maria@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas-jose-resposta.json) |
| CT-CLIENTE-05 — `lucas1 jose@` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-512833","criadoEm":"2026-10-06T22:56:23.291Z","cliente":{"nome":"lucas1 jose@","email":"maria@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose-resposta.json) |
| CT-CLIENTE-06 | HTTP 422 e `DADOS_INVALIDOS` (matriz; a documentação exige e-mail válido). | HTTP 201; `{"numero":"VZ-284142","criadoEm":"2026-10-06T22:56:23.999Z","cliente":{"nome":"Maria Silva","email":"usuario@!#%.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) |

## 4. Execução manual e exploratória

Os campos abaixo permanecem em branco para preenchimento pelo responsável após executar os cenários.

| ID | Data | Resultado obtido | Status | Evidência |
|---|---|---|---|---|
| CT-CUPOM-03 |  |  |  |  |
| CT-CUPOM-04 |  |  |  |  |
| CT-CUPOM-05 |  |  |  |  |
| CT-CUPOM-06 |  |  |  |  |
| CT-FRETE-03 |  |  |  |  |
| CT-FRETE-05 |  |  |  |  |
| CT-FRETE-06 |  |  |  |  |
| CT-CALCULO-01 |  |  |  |  |
| CT-CALCULO-02 |  |  |  |  |
| CT-CALCULO-03 |  |  |  |  |
| CT-CLIENTE-04 |  |  |  |  |
| CT-INTERFACE-01 |  |  |  |  |
| CT-INTERFACE-02 |  |  |  |  |
| CT-INTERFACE-03 |  |  |  |  |
| CT-INTERFACE-04 |  |  |  |  |
| CT-INTERFACE-05 |  |  |  |  |

## 5. Observações

- Os relatórios JSON e as saídas textuais foram temporários; não foram mantidos no repositório. As evidências de falha estão preservadas na pasta de evidências.
- As quatro respostas novas de validação do cliente foram preservadas dos anexos JSON gerados pelos próprios testes nesta execução, sem novas requisições.
- Os cenários manuais e exploratórios permanecem sem execução e sem evidência nesta etapa.
- A tela de fechamento do pedido não foi exercitada nesta etapa.
- A matriz informa 29 cenários automatizados e 15 manuais; a contagem dos IDs classificados nas suas linhas resulta em 30 automatizados e 14 manuais, além de 2 exploratórios. A contagem de cenários totaliza 46. A divergência está registrada para revisão, sem alterar a matriz.
