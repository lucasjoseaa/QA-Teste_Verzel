# Análise da documentação

Esta análise tem como base o enunciado do teste técnico e a documentação oficial da entrega (card VZS-142, versão 2.3.0, publicada em 30/09/2026, status "Pronto para teste"). Tudo que depende do comportamento real da loja consta como "A confirmar na execução".

## 1. Resumo da entrega

| Item | Descrição |
|---|---|
| Card | VZS-142 |
| Versão | 2.3.0 |
| Publicação | 30/09/2026 |
| Status | Pronto para teste |
| Entrega | Aplicação de cupons de desconto no carrinho e regra de frete grátis |
| Observação de arquitetura | Os cálculos são feitos pela API, e a interface apenas exibe o resultado |

**História:** como cliente da Verzel Store, quero aplicar um cupom de desconto e ganhar frete grátis em compras maiores, para pagar menos nas minhas compras.

**O que mudou nesta entrega**

- Cupom BEMVINDO10, com 10% de desconto sobre o subtotal dos produtos.
- Cupom VERAO2026, com 15% de desconto, já expirado em 31/03/2026, usado para validar o tratamento de cupom fora da validade.
- Frete fixo de R$ 19,90 para subtotal abaixo de R$ 200,00 e frete grátis a partir de R$ 200,00, inclusive.
- Informação, no carrinho, do valor que falta para o frete grátis.
- Limite de 5 unidades por produto, na interface e na API.
- Arredondamento de todos os valores para 2 casas decimais.

## 2. Rastreabilidade dos critérios de aceite

| ID | O que o critério exige | O que observar para validá-lo | Camada |
|---|---|---|---|
| CA01 | BEMVINDO10 aplica 10% de desconto sobre o subtotal dos produtos. | Desconto igual a 10% do subtotal, total conforme a fórmula e mensagem de cupom aplicado. | Interface e API |
| CA02 | O código do cupom não diferencia maiúsculas de minúsculas, e espaços no início e no fim são ignorados. | Os códigos `bemvindo10`, `BemVindo10` e ` BEMVINDO10 ` produzem o mesmo resultado que `BEMVINDO10`. | Interface e API |
| CA03 | Cupom inexistente exibe "Cupom inválido." e nenhum desconto é aplicado. | Mensagem exata, desconto zero e total sem desconto. Na API, `/api/carrinho/calcular` responde 200 com `cupom.aplicado` falso e o motivo em `cupom.mensagem`; `/api/pedidos` responde 422 `CUPOM_INVALIDO`. | Interface e API |
| CA04 | Cupom fora da validade exibe "Cupom expirado." e nenhum desconto é aplicado. | Uso do VERAO2026. Mesma verificação do CA03, com 422 `CUPOM_EXPIRADO` em `/api/pedidos`. | Interface e API |
| CA05 | Apenas um cupom pode ser aplicado por vez. Para trocar, o cliente remove o cupom atual e aplica outro. | Com um cupom ativo, não há acúmulo de descontos. Remover e aplicar outro substitui o desconto. | Interface (a API recebe um único campo `cupom`) |
| CA06 | O frete é grátis para subtotal a partir de R$ 200,00, inclusive. | Subtotal de 200,00 resulta em frete 0; subtotal de 199,80 resulta em frete 19,90. | Interface e API |
| CA07 | Abaixo de R$ 200,00, o frete é de R$ 19,90 e o carrinho informa quanto falta para o frete grátis. | Valor faltante igual a 200,00 menos o subtotal, exibido na interface e retornado em `valorFaltanteFreteGratis`. | Interface e API |
| CA08 | O frete grátis considera o subtotal antes do desconto do cupom. | Carrinho de 200,00 com BEMVINDO10 mantém frete 0 e total de 180,00. | Interface e API |
| CA09 | O desconto do cupom não incide sobre o frete. | Com frete de 19,90, o desconto é calculado somente sobre o subtotal dos produtos. | Interface e API |
| CA10 | Cada produto pode ter no máximo 5 unidades por pedido, na interface e na API. | 5 unidades aceitas e 6 recusadas. Na API, 422 `QUANTIDADE_MAXIMA_EXCEDIDA`. Na interface, bloqueio do excedente. | Interface e API |
| CA11 | Todos os valores são arredondados para 2 casas decimais. | Ausência de imprecisões de ponto flutuante (por exemplo `5.990000000000001`) no JSON bruto e nos valores exibidos. | Interface e API |

## 3. Regras de cálculo e outras regras da loja

### 3.1 Cálculo do pedido

`total = subtotal - desconto + frete`

| Valor | Como é calculado |
|---|---|
| Subtotal | Soma de preço unitário vezes quantidade de cada item. |
| Desconto | Percentual do cupom aplicado sobre o subtotal. Zero quando não há cupom válido. |
| Frete | R$ 0,00 quando o subtotal é igual ou maior que R$ 200,00. Caso contrário, R$ 19,90. |
| Faltante para frete grátis | R$ 200,00 menos o subtotal, nunca menor que zero. |

### 3.2 Outras regras da loja (anteriores a esta entrega)

- O nome do cliente precisa ter nome e sobrenome.
- O e-mail precisa ter um formato válido.
- O CEP precisa ter 8 dígitos, com ou sem hífen.
- O pagamento é feito na entrega e não existe etapa de pagamento online.

### 3.3 Dados de teste

| Id | Produto | Preço |
|---|---|---|
| P001 | Camiseta Essencial | R$ 59,90 |
| P002 | Calça Jeans Slim | R$ 139,90 |
| P003 | Tênis Casual Urbano | R$ 189,90 |
| P004 | Boné Aba Curva | R$ 49,90 |
| P005 | Mochila Urbana 20L | R$ 100,00 |
| P006 | Kit 3 Pares de Meias | R$ 29,90 |
| P007 | Jaqueta Corta-Vento | R$ 229,90 |
| P008 | Garrafa Térmica 750ml | R$ 50,00 |

| Cupom | Desconto | Situação |
|---|---|---|
| BEMVINDO10 | 10% | Válido |
| VERAO2026 | 15% | Expirado em 31/03/2026 |

### 3.4 API

A API fica no mesmo endereço da loja, no caminho `/api`, e trabalha sempre com JSON. Os valores monetários são números em reais (por exemplo, `59.9` para R$ 59,90).

| Método e rota | Função | Respostas documentadas |
|---|---|---|
| `GET /api/produtos` | Lista todos os produtos (`id`, `nome`, `descricao`, `categoria`, `preco`). | 200 |
| `GET /api/produtos/{id}` | Consulta um produto pelo id. | 200 ou 404 |
| `POST /api/carrinho/calcular` | Calcula o carrinho sem gravar nada. Cupom inválido ou expirado não gera erro: responde 200, sem desconto, com o motivo em `cupom.mensagem`. | 200 |
| `POST /api/pedidos` | Valida e confirma um pedido, com número no formato `VZ-000000`. Cupom inválido ou expirado gera erro. | 201 ou 422 |

Códigos de erro documentados (formato `{ "erro": { "codigo", "mensagem", "campo" } }`):

| Status | Código |
|---|---|
| 400 | `JSON_INVALIDO` |
| 404 | `ROTA_NAO_ENCONTRADA`, `PRODUTO_NAO_ENCONTRADO` |
| 405 | `METODO_NAO_PERMITIDO` |
| 422 | `ITENS_OBRIGATORIOS`, `ITEM_INVALIDO`, `PRODUTO_NAO_ENCONTRADO`, `ITEM_DUPLICADO`, `QUANTIDADE_INVALIDA`, `QUANTIDADE_MAXIMA_EXCEDIDA`, `DADOS_INVALIDOS`, `CUPOM_INVALIDO`, `CUPOM_EXPIRADO` |

Definições relevantes para a validação dos itens:

| Código | Definição |
|---|---|
| `ITEM_INVALIDO` | Um item não é um objeto com produtoId e quantidade. |
| `PRODUTO_NAO_ENCONTRADO` | Um item referencia um produto inexistente. |

## 4. Pontos ambíguos

Pontos em que a documentação é omissa ou inconsistente. Cada item traz a interpretação adotada e o tratamento nos testes. As interpretações são do candidato e podem ser revistas conforme o comportamento observado.

| Nº | Ponto ambíguo | Onde aparece | Interpretação adotada | Tratamento nos testes |
|---|---|---|---|---|
| 1 | A home diz que, "na primeira compra", o cupom BEMVINDO10 dá 10% de desconto, mas o CA01 não impõe essa restrição e a documentação não define "primeira compra". Também não há login, e os pedidos não são armazenados. | Home e CA01 | O cupom é tratado como disponível para qualquer carrinho, pois a loja não tem como identificar a primeira compra. | Aplicar o cupom em mais de uma compra na mesma sessão e registrar o comportamento observado. |
| 2 | O CA05 diz que apenas um cupom pode ser aplicado por vez e que, para trocar, o cliente remove o atual e aplica outro. Não diz o que ocorre se um segundo cupom for aplicado sem remover o primeiro (bloqueio, substituição ou outro desfecho). | CA05 | Não pode haver mais de um cupom ativo ao mesmo tempo. O desfecho exato não é definido, e o que a loja fizer será registrado. | Tentar aplicar um segundo cupom com um ativo e registrar o resultado. Como só existe um cupom válido, o segundo será o expirado, um inexistente ou o próprio BEMVINDO10 reaplicado. Dois descontos ativos ao mesmo tempo contrariam o CA05. |
| 3 | O CA10 diz que o limite vale para a interface e para a API, mas a documentação só descreve o erro da API (`QUANTIDADE_MAXIMA_EXCEDIDA`). Não diz como a interface aplica o limite (bloqueio do botão, mensagem ou outro mecanismo). | CA10 e tabela de erros | O critério é cumprido se a interface impedir mais de 5 unidades de um produto no pedido, por qualquer mecanismo. | Tentar passar de 5 unidades pela vitrine e pelo carrinho e registrar o que a interface faz. |
| 4 | O CA11 exige que todos os valores sejam arredondados para 2 casas decimais, sem informar o método de arredondamento. | CA11 | O requisito é que todo valor tenha no máximo 2 casas e coincida com o cálculo esperado. O método não é tratado como critério. | Comparar os valores do JSON e da tela com o cálculo esperado, feito em centavos. |
| 5 | O exemplo de erro mostra o campo `campo` (singular), enquanto `DADOS_INVALIDOS` diz que os detalhes vêm em "campos" (plural). | Códigos de erro | A documentação é inconsistente. Vale o que a API devolver de fato. | Observar a resposta real de `DADOS_INVALIDOS` e dos erros de item antes de fixar qualquer verificação sobre esse campo. |

## 5. Comportamentos esperados do ambiente (não são bugs)

Conforme a seção "Sobre este ambiente" da documentação, os comportamentos abaixo são esperados e não devem ser reportados como bugs:

- O carrinho fica guardado apenas na aba do navegador. Outra aba, outro navegador ou uma janela anônima começam com o carrinho vazio.
- Os pedidos não são armazenados. O número gerado na confirmação é fictício e não existe consulta de pedidos.
- Nenhum e-mail é enviado e nenhuma cobrança é feita.
- Produtos, preços e cupons são fixos e iguais para todos. Não existe controle de estoque.
- A API não guarda nada entre uma chamada e outra: ela recebe os dados, calcula e responde.

## 6. Escopo

**Em escopo**

- Critérios de aceite CA01 a CA11, na interface e na API.
- Endpoints `/api/produtos`, `/api/produtos/{id}`, `/api/carrinho/calcular` e `/api/pedidos`, incluindo todos os códigos de erro documentados.
- Validação dos dados do cliente (nome e sobrenome, e-mail e CEP).
- Consistência entre os valores exibidos na interface e os retornados pela API.
- Testes exploratórios do fluxo: vitrine, carrinho, cupom e confirmação do pedido.

**Fora de escopo**

- Login, cadastro de clientes, pagamento online e consulta de pedidos (conforme a documentação).
- Testes de carga, estresse e segurança (conforme o enunciado).

## 7. Estratégia de teste

- **Fonte da verdade:** a documentação da entrega e o enunciado. Os cenários derivam dos critérios de aceite e das regras de cálculo, com rastreabilidade entre critério, cenário, execução e bug.
- **Camadas:** a API é validada primeiro, porque concentra os cálculos e não depende de seletores. A interface é validada depois, com ênfase na consistência com a API e na exibição das mensagens.
- **Tipos de teste:** manual e exploratório, para o fluxo completo e para o que a documentação não cobre; automatizado com Playwright, para os cenários de maior valor (cupom, frete grátis, limite de quantidade, cálculo e validações da API).
- **Valores esperados:** calculados em centavos, para evitar imprecisão de ponto flutuante, e conferidos com os exemplos da própria documentação.
- **Classificação de defeitos:** um comportamento só é reportado como bug se divergir de um critério de aceite, de uma regra de cálculo ou de um código de erro documentado, e se não constar entre os comportamentos esperados da seção 5. Antes de qualquer declaração de bug, o comportamento é confirmado na execução.
- **Ambiguidades:** registradas na seção 4, com a interpretação adotada. O que a documentação não define não é tratado como defeito sem confirmação.
- **Evidências:** capturas de tela e respostas JSON, organizadas por identificador de cenário.
- **Limitação conhecida:** as telas do carrinho com itens, do campo de cupom e do fechamento do pedido ainda não foram mapeadas. A modelagem da interface depende da observação direta da loja.