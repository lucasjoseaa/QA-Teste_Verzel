# BUG-005: A mensagem de erro exibe valores internos quando o produtoId é ausente, nulo ou vazio

> **Nota de requisito:** a documentação não define o texto dessas mensagens. A expectativa de que mensagens de erro não exponham valores internos é tratada nestes cenários como requisito implícito de qualidade.

## 2. Identificação

| ID | Status | Severidade | Prioridade | Camada | Funcionalidade | Critérios de aceite relacionados | Cenários de teste relacionados | Data da observação | Reprodutibilidade |
|---|---|---|---|---|---|---|---|---|---|
| BUG-005 | Aberto | Baixa | Baixa | API | Validação dos itens do carrinho e pedido | Requisito implícito de qualidade da mensagem; sem critério de aceite explícito | CT-API-CARRINHO-09; CT-API-PEDIDOS-04 (três exemplos cada) | 08/10/2026; horário não registrado | Os seis casos executados retornaram HTTP 422 e mensagens que expõem `undefined`, `null` ou um valor vazio. |

## 3. Ambiente

- URL da loja/API: https://verzel-store.qa-test-verzel-store.workers.dev/
- Entrega: VZS-142, versão 2.3.0.
- Testes automatizados executados com Playwright por meio de `APIRequestContext`.
- Os testes usam os endpoints `/api/carrinho/calcular` e `/api/pedidos`.

## 4. Resumo

Para `produtoId` ausente, nulo ou vazio, ambos os endpoints respondem HTTP 422, porém a mensagem inclui o valor interno interpolado: `undefined`, `null` ou espaço em branco. A validação verifica o erro, mas expõe o dado de entrada de forma confusa.

Na seção 3.4 de [`docs/01-analise-da-documentacao.md`](../01-analise-da-documentacao.md), a documentação define `ITEM_INVALIDO` como **“Um item não é um objeto com produtoId e quantidade.”** e `PRODUTO_NAO_ENCONTRADO` como **“Um item referencia um produto inexistente.”** A expectativa testada é que a mensagem não exponha valores internos; o texto específico não é definido pela documentação.

## 5. Pré-condições

- A API da loja está acessível.
- Para `/api/pedidos`, usar o cliente válido `Lucas José`, `lucas@exemplo.com`, CEP `01310-100`.
- Enviar um item com quantidade 1 e `produtoId` ausente, nulo ou vazio, conforme os corpos abaixo.

## 6. Passos para reproduzir

Executar os comandos em Bash ou Git Bash. Os corpos são os mesmos usados pelos testes.

### POST `/api/carrinho/calcular`

```sh
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular" -H "Content-Type: application/json" -d '{"itens":[{"quantidade":1}]}'
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular" -H "Content-Type: application/json" -d '{"itens":[{"produtoId":null,"quantidade":1}]}'
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular" -H "Content-Type: application/json" -d '{"itens":[{"produtoId":"","quantidade":1}]}'
```

### POST `/api/pedidos`

```sh
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos" -H "Content-Type: application/json" -d '{"cliente":{"nome":"Lucas José","email":"lucas@exemplo.com","cep":"01310-100"},"itens":[{"quantidade":1}]}'
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos" -H "Content-Type: application/json" -d '{"cliente":{"nome":"Lucas José","email":"lucas@exemplo.com","cep":"01310-100"},"itens":[{"produtoId":null,"quantidade":1}]}'
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos" -H "Content-Type: application/json" -d '{"cliente":{"nome":"Lucas José","email":"lucas@exemplo.com","cep":"01310-100"},"itens":[{"produtoId":"","quantidade":1}]}'
```

## 7. Resultado esperado

Os seis casos devem responder HTTP 422 e apresentar mensagem de erro sem `undefined`, `null` ou interpolação vazia (dois espaços consecutivos). A expectativa de mensagem sem valores internos é um requisito implícito de qualidade; a documentação não define o texto exato nem exige um código específico para esses cenários.

## 8. Resultado obtido

Os seis casos responderam HTTP 422 com o código `PRODUTO_NAO_ENCONTRADO`. As mensagens e os campos recebidos, conforme as evidências da execução:

| Cenário | Endpoint | Status | Código | Mensagem recebida | Campo recebido | Evidência |
|---|---|---:|---|---|---|---|
| CT-API-CARRINHO-09 — sem `produtoId` | `/api/carrinho/calcular` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto undefined não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-CARRINHO-09-sem-produtoid-resposta.json) |
| CT-API-CARRINHO-09 — `produtoId` nulo | `/api/carrinho/calcular` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto null não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-CARRINHO-09-produtoid-nulo-resposta.json) |
| CT-API-CARRINHO-09 — `produtoId` vazio | `/api/carrinho/calcular` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto  não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-CARRINHO-09-produtoid-vazio-resposta.json) |
| CT-API-PEDIDOS-04 — sem `produtoId` | `/api/pedidos` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto undefined não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-PEDIDOS-04-sem-produtoid-resposta.json) |
| CT-API-PEDIDOS-04 — `produtoId` nulo | `/api/pedidos` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto null não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-PEDIDOS-04-produtoid-nulo-resposta.json) |
| CT-API-PEDIDOS-04 — `produtoId` vazio | `/api/pedidos` | 422 | `PRODUTO_NAO_ENCONTRADO` | `Produto  não encontrado.` | `itens[0].produtoId` | [JSON](../evidencias/api/CT-API-PEDIDOS-04-produtoid-vazio-resposta.json) |

## 9. Contraste com outras validações

No comportamento informado para comparação, um elemento de `itens` que não é um objeto retorna `ITEM_INVALIDO` com a mensagem `Cada item deve ser um objeto com produtoId e quantidade.`. Quantidade ausente ou nula retorna `QUANTIDADE_INVALIDA` com uma mensagem clara e o campo indicado. Esses casos contrastam com a interpolação do valor interno de `produtoId` observada neste defeito.

## 10. Impacto

A mensagem pode confundir quem consome a API e expõe valores internos (`undefined`, `null` ou campo vazio) na resposta de erro.

## 11. Hipótese de causa

**Hipótese:** a validação procura o produto e monta a mensagem antes de verificar se `produtoId` está presente e contém um valor utilizável. Esta hipótese não foi confirmada por inspeção da implementação da API.

## 12. Observações

- Para item sem `produtoId`, a definição documentada de `ITEM_INVALIDO` — “Um item não é um objeto com produtoId e quantidade.” — parece aplicável, enquanto `PRODUTO_NAO_ENCONTRADO` — “Um item referencia um produto inexistente.” — descreve outro caso. O retorno de `PRODUTO_NAO_ENCONTRADO` para esse exemplo pode ser uma divergência com a documentação.
- Para `produtoId` vazio, `PRODUTO_NAO_ENCONTRADO` é aceitável: o identificador vazio não referencia um produto existente. A mensagem, porém, continua expondo uma interpolação vazia.
- O defeito principal registrado é a exposição de valores internos na mensagem; severidade e prioridade permanecem Baixa.
