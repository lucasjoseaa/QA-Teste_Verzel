# Execução dos testes

## 1. Resumo da execução

| Item | Resultado |
|---|---|
| Data | 06/10/2026 |
| Execução da API (BUG-005) | 08/10/2026 |
| Execução da interface (Etapa 6) | 20:36:47 (UTC−03:00) |
| Node.js | v24.21.0 |
| Playwright | 1.63.0 |
| Cenários definidos na matriz | 51 |
| Casos automatizados executados, com exemplos expandidos | 50 |
| Passou no Playwright | 50 |
| Falhas conhecidas marcadas como esperadas (`test.fail`) | 16 (14 API; 2 interface) |
| Falhas inesperadas | 0 |
| Cenários manuais e exploratórios executados | 16 |
| Cenários manuais e exploratórios que passaram | 15 |
| Cenários manuais e exploratórios que falharam | 1 |

Após os testes correspondentes aos defeitos receberem `test.fail`, o Playwright reportou os 50 casos automatizados como aprovados, incluindo 16 falhas esperadas e identificadas (14 de API e 2 de interface); não houve falhas inesperadas. As linhas dos cenários automatizados abaixo registram o comportamento observado como “Falhou” quando houve divergência. Na primeira execução do complemento, antes de adicionar `test.fail` aos seis novos casos, os 34 testes preexistentes passaram e os seis casos novos falharam conforme as respostas observadas. Dos 16 cenários manuais e exploratórios com status informado, 15 passaram e CT-INTERFACE-05 falhou; o status de CT-INTERFACE-06 permanece a preencher. As linhas de exemplos expandidas explicam a diferença entre as 51 definições da matriz e os 67 registros de cenários automatizados, manuais e exploratórios.

| Camada | Casos executados | Reportados como aprovados pelo Playwright | Falhas esperadas (`test.fail`) | Falhas inesperadas |
|---|---:|---:|---:|---:|
| API | 40 | 40 | 14 | 0 |
| Interface | 10 | 10 | 2 | 0 |
| Total | 50 | 50 | 16 | 0 |

Os relatórios JSON e as saídas completas de texto foram gerados em arquivos temporários durante a execução e removidos ao concluir esta etapa. As evidências de falha foram preservadas em [`evidencias/`](./evidencias/).

## 2. Resultados por área

### 2.1 Cupom de desconto

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CUPOM-01 | Aplicar o cupom válido BEMVINDO10 | Interface | Automatizado | Passou | — | — |
| CT-CUPOM-02 | Aceitar variações de caixa e espaços no código do cupom | Interface | Automatizado | Passou (4 de 4 exemplos) | — | — |
| CT-CUPOM-03 | Exibir mensagem para cupom inexistente | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-CUPOM-04 | Exibir mensagem para cupom expirado | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-CUPOM-05 | Aplicar um segundo cupom sem remover o primeiro | Interface | Exploratório | Passou | — | Execução exploratória informada pelo responsável em 06/10/2026. |
| CT-CUPOM-06 | Aplicar cupom em compra abaixo do valor de frete grátis | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |

### 2.2 Frete grátis

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-FRETE-01 | Frete cobrado abaixo do subtotal mínimo | Interface | Automatizado | Passou | — | — |
| CT-FRETE-02 | Frete grátis com subtotal mínimo exato | Interface | Automatizado | Falhou | [Captura](./evidencias/interface/CT-FRETE-02.png) | Esperado: frete R$ 0,00 e total R$ 200,00 (CA06 e matriz); obtido: frete R$ 19,90 e total R$ 219,90. Registrado em [BUG-001](./bugs/BUG-001-frete-gratis-no-limite-de-200.md). |
| CT-FRETE-03 | Frete cobrado e valor faltante para frete grátis | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-FRETE-04 | Frete grátis com cupom válido considerando subtotal antes do desconto | Interface | Automatizado | Falhou | [Captura](./evidencias/interface/CT-FRETE-04.png) | Esperado: desconto R$ 20,00, frete R$ 0,00 e total R$ 180,00 (CA06, CA08 e matriz); obtido: desconto R$ 20,00, frete R$ 19,90 e total R$ 199,90. Registrado em [BUG-001](./bugs/BUG-001-frete-gratis-no-limite-de-200.md). |
| CT-FRETE-05 | Frete grátis com jaqueta e cupom válido | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-FRETE-06 | Valor faltante para frete grátis na compra com mochila | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |

### 2.3 Limite de quantidade

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-QUANTIDADE-01 | O kit de meias aceita até 5 unidades | Interface | Automatizado | Passou | — | — |
| CT-QUANTIDADE-02 | O carrinho bloqueia a sexta unidade do kit de meias | Interface | Automatizado | Passou | — | A execução observou o limite de 5 unidades. |
| CT-QUANTIDADE-03 | API aceita até 5 unidades do kit de meias | API | Automatizado | Passou | — | — |
| CT-QUANTIDADE-04 | API rejeita quantidade acima do limite | API | Automatizado | Falhou (0 de 2 exemplos passaram) | [Resposta de cálculo](./evidencias/api/CT-QUANTIDADE-04-api-carrinho-calcular-resposta.json); [resposta de pedido](./evidencias/api/CT-QUANTIDADE-04-api-pedidos-resposta.json) | Esperado para ambos os endpoints: status 422 e código `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro); obtido: status 200 em `/api/carrinho/calcular` e status 201 em `/api/pedidos`. Registrado em [BUG-002](./bugs/BUG-002-api-sem-limite-de-5-unidades.md). |
| CT-QUANTIDADE-05 | API rejeita quantidade inválida | API | Automatizado | Passou (3 de 3 exemplos) | — | — |

### 2.4 Cálculo do carrinho

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CALCULO-01 | Validar cálculos sem cupom | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-CALCULO-02 | Validar cálculos com cupom BEMVINDO10 | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-CALCULO-03 | Validar arredondamento para duas casas decimais | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |

### 2.5 API de cálculo do carrinho

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-API-CARRINHO-01 | Calcular carrinho com exemplo da documentação | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-02 | Calcular carrinho sem cupom com subtotal exato de 200 | API | Automatizado | Falhou | [Resposta](./evidencias/api/CT-API-CARRINHO-02-resposta.json) | Esperado: status 200, subtotal 200, frete 0 e total 200 (CA06 e matriz); obtido: status 200, subtotal 200, frete 19.9 e total 219.9. Registrado em [BUG-001](./bugs/BUG-001-frete-gratis-no-limite-de-200.md). |
| CT-API-CARRINHO-03 | Cupom inexistente na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-04 | Cupom expirado na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-05 | Itens vazios são rejeitados na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-06 | Produto inexistente é rejeitado na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-07 | Itens duplicados são rejeitados na API de cálculo | API | Automatizado | Passou | — | — |
| CT-API-CARRINHO-08 | Calcular frete grátis com cupom sobre subtotal de R$ 200,00 | API | Automatizado | Falhou | [Resposta](./evidencias/api/CT-API-CARRINHO-08-resposta.json) | Esperado: status 200, subtotal 200, desconto 20, frete 0 e total 180 (CA06, CA08 e matriz); obtido: status 200, subtotal 200, desconto 20, frete 19.9 e total 199.9. Registrado em [BUG-001](./bugs/BUG-001-frete-gratis-no-limite-de-200.md). |
| CT-API-CARRINHO-09 — sem `produtoId` | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-CARRINHO-09-sem-produtoid-resposta.json) | HTTP 422; mensagem `Produto undefined não encontrado.`; BUG-005. |
| CT-API-CARRINHO-09 — `produtoId` nulo | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-CARRINHO-09-produtoid-nulo-resposta.json) | HTTP 422; mensagem `Produto null não encontrado.`; BUG-005. |
| CT-API-CARRINHO-09 — `produtoId` vazio | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-CARRINHO-09-produtoid-vazio-resposta.json) | HTTP 422; mensagem `Produto  não encontrado.`; BUG-005. |

### 2.6 API de pedidos

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-API-PEDIDOS-01 | Confirmar pedido com exemplo da documentação | API | Automatizado | Passou | — | — |
| CT-API-PEDIDOS-02 | Pedido com cupom inexistente é rejeitado | API | Automatizado | Passou | — | — |
| CT-API-PEDIDOS-03 | Pedido com cupom expirado é rejeitado | API | Automatizado | Passou | — | — |
| CT-API-PEDIDOS-04 — sem `produtoId` | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-PEDIDOS-04-sem-produtoid-resposta.json) | HTTP 422; mensagem `Produto undefined não encontrado.`; BUG-005. |
| CT-API-PEDIDOS-04 — `produtoId` nulo | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-PEDIDOS-04-produtoid-nulo-resposta.json) | HTTP 422; mensagem `Produto null não encontrado.`; BUG-005. |
| CT-API-PEDIDOS-04 — `produtoId` vazio | Mensagem sem valores internos | API | Automatizado | Falhou (falha esperada) | [JSON](./evidencias/api/CT-API-PEDIDOS-04-produtoid-vazio-resposta.json) | HTTP 422; mensagem `Produto  não encontrado.`; BUG-005. |

### 2.7 Validação do cliente

| ID | Título | Camada | Tipo | Resultado | Evidência | Observação |
|---|---|---|---|---|---|---|
| CT-CLIENTE-01 | Nome sem sobrenome é rejeitado | API | Automatizado | Passou | — | — |
| CT-CLIENTE-02 | E-mails inválidos são rejeitados | API | Automatizado | Passou (3 de 3 exemplos) | — | — |
| CT-CLIENTE-03 | CEP inválido é rejeitado | API | Automatizado | Passou (3 de 3 exemplos) | — | — |
| CT-CLIENTE-04 | CEP com hífen e sem hífen são aceitos | API | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas1 jose2` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose2-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito e sujeito a revisão; registrado em [BUG-003](./bugs/BUG-003-nome-aceita-numeros-e-simbolos.md). |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas@ jose#` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas-jose-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito e sujeito a revisão; registrado em [BUG-003](./bugs/BUG-003-nome-aceita-numeros-e-simbolos.md). |
| CT-CLIENTE-05 | Recusar nome com número ou símbolo — `lucas1 jose@` | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Requisito implícito e sujeito a revisão; registrado em [BUG-003](./bugs/BUG-003-nome-aceita-numeros-e-simbolos.md). |
| CT-CLIENTE-06 | Recusar e-mail com caracteres inválidos no domínio | API | Automatizado | Falhou | [Evidência](./evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) | Esperado: HTTP 422 e `DADOS_INVALIDOS`; obtido: HTTP 201. Registrado em [BUG-004](./bugs/BUG-004-email-aceita-caracteres-invalidos.md). |

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
| CT-INTERFACE-01 | Página inicial exibe os produtos da vitrine | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-INTERFACE-02 | Carrinho vazio informa que ele está vazio | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-INTERFACE-03 | Remover um item do carrinho recalcula o total | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-INTERFACE-04 | Outra aba ou janela anônima inicia com carrinho vazio | Interface | Manual | Passou | — | Execução manual informada pelo responsável em 06/10/2026. |
| CT-INTERFACE-05 | Concluir o pedido pela interface com dados válidos | Interface | Exploratório | Falhou | — | Falha informada pelo responsável em 06/10/2026; detalhes da execução não fornecidos. |
| CT-INTERFACE-06 | Verificar a navegação na versão mobile | Interface | Exploratório | [preencher: Executado] | [CT-INTERFACE-06-versao-mobile.png](./evidencias/manual/CT-INTERFACE-06-versao-mobile.png) | Observação exploratória; não é tratada como defeito. Detalhes de execução abaixo. |

## 3. Falhas observadas

Os valores esperados abaixo vêm dos critérios e resultados registrados na documentação e na matriz. Os valores obtidos são das execuções reais. As divergências automatizadas estão associadas aos relatórios de defeito da Etapa 6.

| Teste | Esperado e fonte | Obtido na execução | Evidência |
|---|---|---|---|
| CT-API-CARRINHO-02 | Frete 0 e total 200 para subtotal 200 (CA06; matriz). | `{"subtotal":200,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":0,"total":219.9}` | [CT-API-CARRINHO-02-resposta.json](./evidencias/api/CT-API-CARRINHO-02-resposta.json) |
| CT-API-CARRINHO-08 | Frete 0 e total 180 para subtotal 200 com desconto 20 (CA06, CA08; matriz). | `{"subtotal":200,"desconto":20,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":0,"total":199.9}` | [CT-API-CARRINHO-08-resposta.json](./evidencias/api/CT-API-CARRINHO-08-resposta.json) |
| CT-QUANTIDADE-04 — `/api/carrinho/calcular` | Status 422 e `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro; matriz). | Status 200; resposta inclui quantidade 6, subtotal 179.4 e total 199.3. | [Resposta de cálculo](./evidencias/api/CT-QUANTIDADE-04-api-carrinho-calcular-resposta.json) |
| CT-QUANTIDADE-04 — `/api/pedidos` | Status 422 e `QUANTIDADE_MAXIMA_EXCEDIDA` (seção de códigos de erro; matriz). | Status 201; resposta inclui quantidade 6, subtotal 179.4 e total 199.3. | [Resposta do pedido](./evidencias/api/CT-QUANTIDADE-04-api-pedidos-resposta.json) |
| CT-FRETE-02 | Frete R$ 0,00 e total R$ 200,00 para subtotal R$ 200,00 (CA06; matriz e feature). | Tela: subtotal R$ 200,00; frete R$ 19,90; total R$ 219,90. | [CT-FRETE-02.png](./evidencias/interface/CT-FRETE-02.png) |
| CT-FRETE-04 | Desconto R$ 20,00, frete R$ 0,00 e total R$ 180,00 (CA06, CA08, CA09; matriz e feature). | Tela: subtotal R$ 200,00; desconto - R$ 20,00; frete R$ 19,90; total R$ 199,90. | [CT-FRETE-04.png](./evidencias/interface/CT-FRETE-04.png) |
| CT-CLIENTE-05 — `lucas1 jose2` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-168747","criadoEm":"2026-10-06T23:20:09.511Z","cliente":{"nome":"lucas1 jose2","email":"lucas@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose2-resposta.json) |
| CT-CLIENTE-05 — `lucas@ jose#` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-626198","criadoEm":"2026-10-06T23:20:10.179Z","cliente":{"nome":"lucas@ jose#","email":"lucas@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas-jose-resposta.json) |
| CT-CLIENTE-05 — `lucas1 jose@` | HTTP 422 e `DADOS_INVALIDOS` (matriz; expectativa implícita, pois a documentação não define caracteres permitidos no nome). | HTTP 201; `{"numero":"VZ-082874","criadoEm":"2026-10-06T23:20:10.823Z","cliente":{"nome":"lucas1 jose@","email":"lucas@exemplo.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-05-lucas1-jose-resposta.json) |
| CT-CLIENTE-06 | HTTP 422 e `DADOS_INVALIDOS` (matriz; a documentação exige e-mail válido). | HTTP 201; `{"numero":"VZ-940556","criadoEm":"2026-10-06T23:20:11.482Z","cliente":{"nome":"Lucas José","email":"usuario@!#%.com","cep":"01310100"},"itens":[{"produtoId":"P005","nome":"Mochila Urbana 20L","precoUnitario":100,"quantidade":1,"total":100}],"subtotal":100,"desconto":0,"frete":19.9,"freteGratis":false,"valorFaltanteFreteGratis":100,"total":119.9,"cupom":null}` | [Evidência](./evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) |

## 4. Execução manual e exploratória

Dos 16 cenários manuais e exploratórios com execução registrada em 06/10/2026, 15 passaram e CT-INTERFACE-05 falhou. O registro de CT-INTERFACE-06 foi incluído, mas seus campos de execução permanecem pendentes de preenchimento.

| ID | Data | Status |
|---|---|---|
| CT-CUPOM-03 | 06/10/2026 | Passou |
| CT-CUPOM-04 | 06/10/2026 | Passou |
| CT-CUPOM-05 | 06/10/2026 | Passou |
| CT-CUPOM-06 | 06/10/2026 | Passou |
| CT-FRETE-03 | 06/10/2026 | Passou |
| CT-FRETE-05 | 06/10/2026 | Passou |
| CT-FRETE-06 | 06/10/2026 | Passou |
| CT-CALCULO-01 | 06/10/2026 | Passou |
| CT-CALCULO-02 | 06/10/2026 | Passou |
| CT-CALCULO-03 | 06/10/2026 | Passou |
| CT-CLIENTE-04 | 06/10/2026 | Passou |
| CT-INTERFACE-01 | 06/10/2026 | Passou |
| CT-INTERFACE-02 | 06/10/2026 | Passou |
| CT-INTERFACE-03 | 06/10/2026 | Passou |
| CT-INTERFACE-04 | 06/10/2026 | Passou |
| CT-INTERFACE-05 | 06/10/2026 | Falhou |
| CT-INTERFACE-06 | — | [preencher: Executado] |

### CT-INTERFACE-06 — Verificar a navegação na versão mobile

- Status: [preencher: Executado]
- Navegador e dispositivo simulado: [preencher]
- Existe menu de navegação (lateral ou ícone) na versão mobile: [preencher: Sim/Não]
- Itens de navegação visíveis: [preencher]
- Largura em que os itens "Produtos" e "Documentação" deixam de aparecer: [preencher, em px, se aplicável]
- Observação: Na versão mobile, a barra do topo exibe apenas o logotipo e o carrinho. Os itens "Produtos" e "Documentação" não são exibidos e não há ícone de menu. O layout não prevê menu lateral em nenhuma versão. A documentação não define o comportamento na versão mobile, e a vitrine e o link da documentação permanecem acessíveis pela página inicial. Não é tratado como defeito.
- Evidência: [CT-INTERFACE-06-versao-mobile.png](./evidencias/manual/CT-INTERFACE-06-versao-mobile.png) (arquivo a ser adicionado).

## 5. Observações

- Os relatórios JSON e as saídas textuais foram temporários; não foram mantidos no repositório. As evidências de falha estão preservadas na pasta de evidências.
- As respostas de validação do cliente foram preservadas dos anexos JSON gerados pelos próprios testes, sem reconstruir ou alterar os corpos recebidos.
- Em 06/10/2026 às 20:21:06 (UTC−03:00), a suíte de API foi reexecutada após a atualização dos dados padrão do cliente. Dos 34 testes, 26 passaram e 8 falharam, os mesmos totais da execução anterior. Os JSONs abaixo contêm as respostas reais desta reexecução e substituem as evidências anteriores dos mesmos cenários, mantendo um arquivo por cenário.

| Cenário | Nome enviado | E-mail enviado | Resultado | Evidência atual |
|---|---|---|---|---|
| CT-CLIENTE-05 — `lucas1 jose2` | `lucas1 jose2` | `lucas@exemplo.com` | Falhou; HTTP 201 | [JSON](./evidencias/api/CT-CLIENTE-05-lucas1-jose2-resposta.json) |
| CT-CLIENTE-05 — `lucas@ jose#` | `lucas@ jose#` | `lucas@exemplo.com` | Falhou; HTTP 201 | [JSON](./evidencias/api/CT-CLIENTE-05-lucas-jose-resposta.json) |
| CT-CLIENTE-05 — `lucas1 jose@` | `lucas1 jose@` | `lucas@exemplo.com` | Falhou; HTTP 201 | [JSON](./evidencias/api/CT-CLIENTE-05-lucas1-jose-resposta.json) |
| CT-CLIENTE-06 | `Lucas José` | `usuario@!#%.com` | Falhou; HTTP 201 | [JSON](./evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) |

## 6. Defeitos registrados

| ID | Título | Severidade | Prioridade | Camada | Cenários relacionados |
|---|---|---|---|---|---|
| [BUG-001](./bugs/BUG-001-frete-gratis-no-limite-de-200.md) | Frete grátis não é aplicado no subtotal de R$ 200,00 | Alta | Alta | Interface e API | CT-API-CARRINHO-02, CT-API-CARRINHO-08, CT-FRETE-02, CT-FRETE-04 |
| [BUG-002](./bugs/BUG-002-api-sem-limite-de-5-unidades.md) | A API não aplica o limite de 5 unidades por produto | Média | Média | API | CT-QUANTIDADE-04; CT-QUANTIDADE-02 como contraste |
| [BUG-003](./bugs/BUG-003-nome-aceita-numeros-e-simbolos.md) | O campo nome aceita números e símbolos | Baixa | Baixa | Interface e API | CT-CLIENTE-05; CT-INTERFACE-05 (observação manual informada) |
| [BUG-004](./bugs/BUG-004-email-aceita-caracteres-invalidos.md) | O campo e-mail aceita caracteres inválidos no domínio | Média | Média | Interface e API | CT-CLIENTE-06; CT-CLIENTE-02 como contraste; CT-INTERFACE-05 (observação manual informada) |
| [BUG-005](./bugs/BUG-005-mensagem-de-erro-com-valores-internos.md) | A mensagem de erro exibe valores internos quando o produtoId é ausente, nulo ou vazio | Baixa | Baixa | API | CT-API-CARRINHO-09, CT-API-PEDIDOS-04 |
