# Análise da documentação

## 1. Resumo da entrega

- Card: VZS-142
- Versão: 2.3.0
- Publicado em: 30/09/2026
- Status: Pronto para teste
- Entrega: aplicação de cupom de desconto no carrinho e regra de frete grátis
- Observação principal: os cálculos são realizados pela API e a interface exibe o resultado, sem recalcular a regra de negócio localmente

### História

Como cliente da Verzel Store, quero aplicar um cupom de desconto e ganhar frete grátis em compras maiores, para pagar menos nas minhas compras.

### O que mudou nesta entrega

- Inclusão da regra de cupom de desconto no carrinho
- Aplicação do desconto ao subtotal, com validação de cupom, expiração e troca
- Regra de frete grátis para compras com subtotal igual ou superior a R$ 200,00
- Cálculo de valor faltante para alcançar o frete grátis
- Limite de 5 unidades por produto, tanto na interface quanto na API
- Regras de arredondamento e consistência dos valores monetários

## 2. Rastreabilidade dos critérios

| ID | Critério de aceite | O que exige | O que precisa ser observado para validação | Camada |
| --- | --- | --- | --- | --- |
| CA01 | O cupom BEMVINDO10 aplica 10% de desconto sobre o subtotal dos produtos. | Aplicar o cupom válido e verificar o percentual de desconto sobre o subtotal. | Confirmar que o desconto reduz o subtotal e que o total é calculado conforme a fórmula da loja. | Ambas |
| CA02 | O código do cupom não diferencia maiúsculas de minúsculas, e espaços no início e no fim são ignorados. | Aceitar variações do código do cupom sem alterar o resultado. | Validar entradas como `bemvindo10`, `BemVindo10`, `BEMVINDO10` e `BEMVINDO10 `; confirmar que o cupom é tratado como equivalente. | Ambas |
| CA03 | Um cupom inexistente exibe a mensagem "Cupom inválido." e nenhum desconto é aplicado. | Validar que o cupom inexistente não gera desconto e exibe a mensagem indicada. | Conferir o texto exibido, o valor do desconto e o total final em interface e API. | Ambas |
| CA04 | Um cupom fora da validade exibe a mensagem "Cupom expirado." e nenhum desconto é aplicado. | Validar que um cupom expirado não atua na regra de desconto. | Verificar o texto exibido e que o desconto permanece zerado. | Ambas |
| CA05 | Apenas um cupom pode ser aplicado por vez. Para trocar, o cliente remove o cupom atual e aplica outro. | Fazer a troca do cupom em um único carrinho. | Validar o fluxo de remoção do cupom atual e a aplicação do novo cupom, além do recálculo final. | Ambas |
| CA06 | O frete é grátis para compras com subtotal a partir de R$ 200,00, inclusive. | Considerar o subtotal antes do desconto para decidir a isenção. | Validar o limite em 200,00 e confirmar que o frete seja 0,00 ao atingir o valor mínimo. | Ambas |
| CA07 | Abaixo de R$ 200,00, é cobrado frete fixo de R$ 19,90 e o carrinho informa quanto falta para o frete grátis. | Considerar o subtotal abaixo do limite para cobrança fixa e cálculo do restante. | Verificar frete de 19,90, cálculo do valor faltante e texto do aviso na interface. | Ambas |
| CA08 | A regra do frete grátis considera o subtotal antes do desconto do cupom. | Aplicar cupom antes de decidir a isenção do frete. | Validar cenários em que o subtotal é 199,80 e o cupom reduz o valor; confirmar que o frete depende do subtotal original. | Ambas |
| CA09 | O desconto do cupom não incide sobre o frete. | Garantir que o cupom só reduza o subtotal e não o frete. | Validar o valor do frete em qualquer situação com cupom ativo e confirmar que a fórmula do total siga a regra. | Ambas |
| CA10 | Cada produto pode ter no máximo 5 unidades por pedido. A regra vale para a interface e para a API. | Impedir solicitações com quantidade superior a 5. | Validar quantidades de 5 aceitas e de 6 recusadas na interface e na API, incluindo erros de validação. | Ambas |
| CA11 | Todos os valores são arredondados para 2 casas decimais. | Garantir consistência monetária em cálculos e respostas. | Verificar imprecisão de ponto flutuante e a apresentação de valores em reais em interface e JSON. | Ambas |

## 3. Regras de cálculo e outras regras da loja

### Fórmula de cálculo

`total = subtotal - desconto + frete`

### Regras de cálculo

- Subtotal: soma do preço unitário multiplicado pela quantidade de cada item.
- Desconto: percentual do cupom aplicado sobre o subtotal; zero quando não há cupom válido.
- Frete: R$ 0,00 quando o subtotal é igual ou maior que R$ 200,00; caso contrário, R$ 19,90.
- Faltante para frete grátis: R$ 200,00 menos o subtotal, sem valor negativo.
- O desconto do cupom não incide sobre o frete.
- Todos os valores devem ser arredondados para 2 casas decimais.

### Outras regras da loja

- O nome do cliente precisa ter nome e sobrenome.
- O e-mail precisa ter um formato válido.
- O CEP precisa ter 8 dígitos, com ou sem hífen.
- O pagamento é feito na entrega; não existe etapa de pagamento online.
- Os produtos, preços e cupons são fixos e iguais para todos.

### Observações de cálculo para testes

- Os valores monetários em API são enviados como números em reais, como `59.9` para R$ 59,90.
- A implementação deve recalcular a partir das regras, em centavos, para evitar imprecisão de ponto flutuante.
- O cálculo do valor faltante para frete grátis deve resultar em zero quando o subtotal já atinge ou supera 200,00.
- A regra de frete grátis considera o subtotal antes do desconto do cupom.

## 4. Pontos ambíguos

### 1. "Primeira compra"

- Interpretação adotada: a expressão "na primeira compra" na home não tem suporte documental suficiente para criar nova regra de negócio. O comportamento deve ser tratado como texto promocional e não como regra funcional de loja, até que a execução confirme se há alguma validação real por cliente ou por sessão.
- Tratamento nos testes: validar a mensagem exibida apenas como conteúdo da interface, sem assumir qualquer lógica de controle de primeira compra na API ou no carrinho.

### 2. CA05: troca de cupom

- Interpretação adotada: a troca de cupom exige remover o cupom atual antes de aplicar outro. O comportamento exato da interface em caso de cupom já ativo deve ser validado na execução, mas a regra funcional presumida é que apenas um cupom seja aceito por vez.
- Tratamento nos testes: validar a remoção do cupom atual, a aplicação de um novo cupom e o recálculo do total. Se a interface bloquear ou substituir o cupom, isso deve ser registrado como comportamento observado e não como suposição de regra.

### 3. CA02: tratamento de espaços internos e outros caracteres

- Interpretação adotada: a documentação exige ignorar apenas espaços no início e no fim do código, e não menciona espaços internos ou caracteres especiais. O tratamento de outros formatos deve permanecer como comportamento a confirmar na execução.
- Tratamento nos testes: validar `BEMVINDO10`, `bemvindo10`, `BemVindo10` e `BEMVINDO10 `; qualquer variação com espaços internos ou caracteres extras deve ser tratada como caso de confirmação na execução.

### 4. CA10: limite de quantidade por produto

- Interpretação adotada: a regra se aplica a um único produto por pedido, com limite máximo de 5 unidades. O texto da documentação informa que a regra vale para a interface e para a API, mas não define a mensagem ou a forma de exibição quando o limite for excedido.
- Tratamento nos testes: validar que 5 unidades sejam aceitas e que 6 unidades sejam recusadas em ambos os canais; a mensagem exata deve ser considerada "A confirmar na execução".

### 5. CA07: aviso de valor faltante para frete grátis

- Interpretação adotada: o aviso deve indicar o valor restante para atingir R$ 200,00 e deve ser calculado sobre o subtotal antes do desconto.
- Tratamento nos testes: validar o valor faltante em cenários abaixo de 200,00, sem assumir o texto exato antes da execução.

### 6. CA11: arredondamento

- Interpretação adotada: todos os valores devem ser arredondados para 2 casas decimais. Como os preços documentados têm no máximo uma casa decimal, o arredondamento só se torna relevante em operações como desconto de 10% e somas de valores com mais de duas casas.
- Tratamento nos testes: validar resultados em interface e JSON para garantir que não haja imprecisão como `5.990000000000001`.

### 7. Formato do erro

- Interpretação adotada: o exemplo usa `campo` (singular), enquanto a descrição de `DADOS_INVALIDOS` menciona `campos` (plural). A estrutura do erro deve ser validada na execução para confirmar o campo ou campos retornados.
- Tratamento nos testes: validar o payload do erro e registrar a estrutura real observada. A confirmação da propriedade exata fica como "A confirmar na execução".

### 8. `cupom.mensagem` no cálculo

- Interpretação adotada: para `POST /api/carrinho/calcular`, cupom inválido ou expirado não deve gerar erro, mas deve retornar a mensagem no objeto `cupom.mensagem` junto com a resposta 200.
- Tratamento nos testes: validar o código de resposta 200, a ausência de desconto e a presença da mensagem correta no campo indicado. O texto exato deve ser confirmado na execução.

### 9. Precedência de validação

- Interpretação adotada: quando cliente e cupom estão inválidos na mesma requisição de pedido, a validação de cliente e cupom deve ser tratada pela API e os erros observados devem ser registrados na execução.
- Tratamento nos testes: validar a resposta real em cenários combinados, sem assumir a prioridade de erro antes da execução.

### 10. Cupom vazio ou nulo

- Interpretação adotada: o corpo da requisição pode enviar cupom vazio (`""`) ou nulo; como a documentação não define a regra, o comportamento deve ser interpretado como "A confirmar na execução".
- Tratamento nos testes: validar como caso de comportamento não documentado e registrar a resposta observada.

### 11. JSON válido que não é objeto

- Interpretação adotada: quando o corpo é um JSON válido, mas não um objeto, a regra esperada pela documentação é responder 400 com erro `JSON_INVALIDO`.
- Tratamento nos testes: aplicar o caso e registrar a resposta real, confirmando se a API trata lista, texto e número como JSON inválido para o endpoint.

### 12. Quantidade informada como texto, decimal ou nula

- Interpretação adotada: a documentação define que a quantidade deve ser um número inteiro maior ou igual a 1. Qualquer valor em texto, decimal ou nulo deve ser rejeitado com o erro correspondente da API.
- Tratamento nos testes: considerar `"2"`, `1.5`, `null` e ausência como casos de validação e registrar a resposta real.

### 13. Remoção do cupom após aplicação e recálculo

- Interpretação adotada: a documentação indica que o cupom pode ser removido e que o carrinho recalcula ao alterar os itens. A sequência de eventos precisa ser validada na execução.
- Tratamento nos testes: verificar a remoção do cupom ativo, o recálculo no carrinho e a consistência entre a interface e a API.

### Ponto ambíguo adicional para revisão

- O texto da documentação indica que `valorFaltanteFreteGratis` é calculado como `R$ 200,00 menos o subtotal, nunca menor que zero`, mas não especifica a exibição quando o subtotal já ultrapassa ou iguala 200,00. Interpretação adotada: o valor deve ser exibido como 0,00 quando o subtotal atinge ou excede 200,00.
- Tratamento nos testes: validar 0,00 em todos os cenários em que o subtotal seja 200,00 ou maior. A confirmação da exibição exata permanece como "A confirmar na execução".

## 5. Comportamentos esperados do ambiente, que não devem ser reportados como bug

- O carrinho fica guardado apenas na aba do navegador. Outra aba, outro navegador ou janela anônima iniciam com carrinho vazio.
- Os pedidos não são armazenados. O número gerado na confirmação é fictício e não existe consulta de pedidos.
- Nenhum e-mail é enviado e nenhuma cobrança é feita.
- Produtos, preços e cupons são fixos e iguais para todos. Não existe controle de estoque.
- A API não guarda nada entre uma chamada e outra: ela recebe os dados, calcula e responde.
- Ficam fora do escopo: login, cadastro de clientes, pagamento online e consulta de pedidos.

## 6. Escopo

### O que será testado

- Aplicação, validade, troca e remoção de cupom de desconto
- Regra de frete grátis e cálculo do valor faltante
- Limite de quantidade por produto em interface e API
- Fórmula do total, arredondamento e consistência dos valores
- Respostas de API para produtos, cálculo de carrinho e criação de pedidos
- Códigos de erro e estrutura das respostas
- Fluxos de interface e consistência entre a vitrine e o carrinho
- Validação de cliente e dados do pedido

### O que está fora do escopo

- Login e cadastro de clientes
- Pagamento online
- Armazenamento de pedidos e consulta posterior
- Estoque e controle de inventário
- Carga, estresse e testes de segurança
- Qualquer comportamento que dependa de histórico real de compras ou autenticação
- Validação de UI não documentada, sem correspondência na documentação oficial

## 7. Estratégia de teste

### Camadas

- API: validação das rotas, payloads, códigos de erro, cálculos e respostas JSON
- Interface: consistência visual e funcional do carrinho, promoções, mensagens e valores exibidos
- Ambos: rastreabilidade entre a documentada e o comportamento observado na execução

### Abordagem manual

- Verificar os cenários principais de cupom, frete e limite de quantidade conforme os critérios de aceite
- Validar a resposta da API para cada caso antes de escrever asserções automáticas
- Confirmar o comportamento real da interface quando houver ambiguidade documental

### Abordagem exploratória

- Validar a consistência entre a vitrine, o carrinho e a resposta da API
- Confirmar se a regra de frete grátis considera corretamente o subtotal antes do desconto
- Inspecionar textos, mensagens e formatos de resposta em cenários de erro
- Registrar anotações por sessão, com missão, duração e observações

### Abordagem automatizada

- Cobrir cenários de cupom, frete, cálculo e quantidade com Playwright
- Implementar testes de API para validar respostas e códigos de erro
- Implementar testes de interface quando os seletores forem confirmados por execução real ou por HTML fornecido
- Usar a estrutura do projeto para separar testes de API e interface

### Limitações por causa do ambiente compartilhado

- O ambiente é compartilhado entre candidatos; portanto, o uso deve ser conservador
- Não devem ser criados testes de carga, estresse ou segurança
- O carrinho é guardado apenas na aba do navegador, então cada contexto de teste deve iniciar em estado limpo
- A política operacional exige `workers: 1`, `fullyParallel: false` e `retries: 0`
- A documentação e os critérios devem ser confirmados na execução antes de qualquer declaração final de bug ou comportamento

## Observações finais

- A fonte da verdade para a análise foi a documentação oficial da entrega, transcrita no arquivo de referência anexado.
- Onde a informação faltou ou ficou ambígua, a conclusão foi marcada como "A confirmar na execução".
- Esta análise tem como objetivo preparar a etapa seguinte de matriz de cenários e execução dos testes sem inventar comportamento da loja.
