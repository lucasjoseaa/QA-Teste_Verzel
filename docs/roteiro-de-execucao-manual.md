# Roteiro de execução manual

Execute os cenários com baixo volume de interações, pois o ambiente é compartilhado. Registre data, resultado obtido, status e evidência no [registro de execução](./03-execucao-dos-testes.md). A pasta e os nomes de evidência seguem a [convenção](./evidencias/LEIAME.md).

## Cupom de desconto

### CT-CUPOM-03 — Exibir mensagem para cupom inexistente

- Objetivo: verificar o tratamento do cupom inexistente.
- Pré-condição: carrinho vazio.
- Passos:
  1. Adicione 1 unidade da Mochila Urbana 20L.
  2. Abra o carrinho e aplique `DESCONTO99`.
  3. Observe mensagem, desconto e total.
- Resultado esperado: mensagem `Cupom inválido.`, desconto R$ 0,00 e total R$ 119,90.
- Evidência: `CT-CUPOM-03.png`.

### CT-CUPOM-04 — Exibir mensagem para cupom expirado

- Objetivo: verificar o tratamento do cupom expirado.
- Pré-condição: carrinho vazio.
- Passos:
  1. Adicione 1 unidade da Mochila Urbana 20L.
  2. Abra o carrinho e aplique `VERAO2026`.
  3. Observe mensagem, desconto e total.
- Resultado esperado: mensagem `Cupom expirado.`, desconto R$ 0,00 e total R$ 119,90.
- Evidência: `CT-CUPOM-04.png`.

### CT-CUPOM-05 — Aplicar um segundo cupom sem remover o primeiro

- Objetivo: observar a ambiguidade do comportamento ao submeter outro cupom com um cupom ativo.
- Pré-condição: carrinho com 1 Mochila Urbana 20L e `BEMVINDO10` aplicado.
- Passos:
  1. No campo de cupom, informe um segundo código sem remover o primeiro.
  2. Registre o que a interface permite, o cupom ativo e os valores exibidos.
- Resultado esperado: não há resultado fixo; registrar o comportamento observado.
- Evidência: `CT-CUPOM-05.png`.

### CT-CUPOM-06 — Aplicar cupom em compra abaixo do valor de frete grátis

- Objetivo: conferir desconto e frete em uma compra abaixo do limite.
- Pré-condição: carrinho com 1 Camiseta Essencial.
- Passos:
  1. Aplique `BEMVINDO10`.
  2. Observe desconto, frete e total.
- Resultado esperado: desconto R$ 5,99, frete R$ 19,90 e total R$ 73,81.
- Evidência: `CT-CUPOM-06.png`.

## Frete grátis

### CT-FRETE-03 — Frete cobrado e valor faltante para frete grátis

- Objetivo: validar o limite abaixo de R$ 200,00 e o valor faltante.
- Pré-condição: carrinho vazio.
- Passos:
  1. Adicione 1 Camiseta Essencial e 1 Calça Jeans Slim.
  2. Observe subtotal, frete, valor faltante e total.
- Resultado esperado: subtotal R$ 199,80, frete R$ 19,90, faltante R$ 0,20 e total R$ 219,70.
- Evidência: `CT-FRETE-03.png`.

### CT-FRETE-05 — Frete grátis com jaqueta e cupom válido

- Objetivo: verificar desconto e frete para subtotal acima de R$ 200,00.
- Pré-condição: carrinho vazio.
- Passos:
  1. Adicione 1 Jaqueta Corta-Vento.
  2. Aplique `BEMVINDO10`.
  3. Observe desconto, frete e total.
- Resultado esperado: desconto R$ 22,99, frete R$ 0,00 e total R$ 206,91.
- Evidência: `CT-FRETE-05.png`.

### CT-FRETE-06 — Valor faltante para frete grátis na compra com mochila

- Objetivo: verificar o valor faltante com subtotal de R$ 100,00.
- Pré-condição: carrinho vazio.
- Passos:
  1. Adicione 1 Mochila Urbana 20L.
  2. Observe o valor faltante exibido.
- Resultado esperado: valor numérico faltante de R$ 100,00; texto exibido: a confirmar na execução.
- Evidência: `CT-FRETE-06.png`.

## Cálculo do carrinho

### CT-CALCULO-01 — Validar cálculos sem cupom

- Objetivo: conferir subtotal, frete e total sem cupom nos três exemplos.
- Pré-condição: carrinho vazio para cada exemplo.
- Passos:
  1. Adicione 1 Camiseta Essencial; confira subtotal R$ 59,90, frete R$ 19,90 e total R$ 79,80.
  2. Esvazie o carrinho; adicione 2 Mochilas Urbanas 20L; confira subtotal R$ 200,00, frete R$ 0,00 e total R$ 200,00.
  3. Esvazie o carrinho; adicione 1 Tênis Casual Urbano; confira subtotal R$ 189,90, frete R$ 19,90 e total R$ 209,80.
- Resultado esperado: os valores de cada exemplo correspondem aos valores indicados nos passos.
- Evidência: `CT-CALCULO-01-1.png`, `CT-CALCULO-01-2.png` e `CT-CALCULO-01-3.png`.

### CT-CALCULO-02 — Validar cálculos com cupom BEMVINDO10

- Objetivo: conferir subtotal, desconto, frete e total nos três exemplos com cupom.
- Pré-condição: carrinho vazio para cada exemplo.
- Passos:
  1. Adicione 1 Mochila Urbana 20L e aplique `BEMVINDO10`; confira subtotal R$ 100,00, desconto R$ 10,00, frete R$ 19,90 e total R$ 109,90.
  2. Esvazie o carrinho; adicione 1 Calça Jeans Slim e 2 Bonés Aba Curva; aplique `BEMVINDO10`; confira subtotal R$ 239,70, desconto R$ 23,97, frete R$ 0,00 e total R$ 215,73.
  3. Esvazie o carrinho; adicione 1 Camiseta Essencial e 1 Calça Jeans Slim; aplique `BEMVINDO10`; confira subtotal R$ 199,80, desconto R$ 19,98, frete R$ 19,90 e total R$ 199,72.
- Resultado esperado: os valores de cada exemplo correspondem aos valores indicados nos passos.
- Evidência: `CT-CALCULO-02-1.png`, `CT-CALCULO-02-2.png` e `CT-CALCULO-02-3.png`.

### CT-CALCULO-03 — Validar arredondamento para duas casas decimais

- Objetivo: verificar os valores monetários e a apresentação com até duas casas decimais.
- Pré-condição: carrinho vazio para cada exemplo.
- Passos:
  1. Adicione 3 Camisetas Essenciais, aplique `BEMVINDO10` e confira subtotal R$ 179,70, desconto R$ 17,97, frete R$ 19,90 e total R$ 181,63.
  2. Esvazie o carrinho; adicione 3 Kits de Meias, aplique `BEMVINDO10` e confira subtotal R$ 89,70, desconto R$ 8,97, frete R$ 19,90 e total R$ 100,63.
  3. Em cada exemplo, observe se algum valor exibe mais de duas casas decimais.
- Resultado esperado: valores correspondentes aos exemplos e nenhum valor com mais de duas casas decimais.
- Evidência: `CT-CALCULO-03-1.png` e `CT-CALCULO-03-2.png`.

## Validação do cliente pela API

### CT-CLIENTE-04 — CEP com hífen e sem hífen são aceitos

- Objetivo: enviar duas requisições de pedido variando somente o formato do CEP e registrar o formato retornado.
- Pré-condição: API acessível; cada chamada é independente.
- Passos:
  1. Envie o corpo abaixo para `POST /api/pedidos` com CEP `01310-100`.
  2. Repita a requisição com CEP `01310100`.
  3. Registre status e formato do CEP de cada resposta.
- Corpo da primeira requisição:

```json
{
  "cliente": {
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "cep": "01310-100"
  },
  "itens": [
    {
      "produtoId": "P005",
      "quantidade": 1
    }
  ]
}
```

- Para a segunda chamada, altere somente o CEP para `"01310100"`.
- Comando curl para a primeira chamada (ajuste `URL_BASE` para o endereço da loja, se necessário):

```sh
BASE_URL="${URL_BASE:-https://verzel-store.qa-test-verzel-store.workers.dev}"
BASE_URL="${BASE_URL%/}"
curl -i -X POST "$BASE_URL/api/pedidos" \
  -H "Content-Type: application/json" \
  --data '{"cliente":{"nome":"Maria Silva","email":"maria@exemplo.com","cep":"01310-100"},"itens":[{"produtoId":"P005","quantidade":1}]}'
```

- Para a segunda chamada, use o mesmo comando com `"cep":"01310100"`.
- Resultado esperado: status 201 nas duas chamadas; registrar o formato do CEP retornado, sem pressupor normalização.
- Evidência: `CT-CLIENTE-04-1.txt` e `CT-CLIENTE-04-2.txt`.

## Fluxo da interface

### CT-INTERFACE-01 — Página inicial exibe os produtos da vitrine

- Objetivo: conferir os dados e a ação disponíveis para cada produto.
- Pré-condição: loja acessível.
- Passos:
  1. Acesse a página inicial.
  2. Conte os produtos e confira categoria, nome, descrição, preço e botão “Adicionar ao carrinho”.
- Resultado esperado: 8 produtos, cada um com os dados e botão indicados.
- Evidência: `CT-INTERFACE-01.png`.

### CT-INTERFACE-02 — Carrinho vazio informa que ele está vazio

- Objetivo: conferir o conteúdo apresentado sem itens no carrinho.
- Pré-condição: carrinho vazio.
- Passos:
  1. Acesse o carrinho sem adicionar produtos.
  2. Confira os textos e a ação previstos no cenário.
- Resultado esperado: “Seu carrinho está vazio”, “Escolha um produto na vitrine para começar.” e botão “Ver produtos”.
- Evidência: `CT-INTERFACE-02.png`.

### CT-INTERFACE-03 — Remover um item do carrinho recalcula o total

- Objetivo: verificar o recálculo após remover item.
- Pré-condição: carrinho com 1 Mochila Urbana 20L.
- Passos:
  1. Remova o item do carrinho.
  2. Observe subtotal, frete e total.
- Resultado esperado: subtotal, frete e total recalculados; valores específicos não definidos neste cenário.
- Evidência: `CT-INTERFACE-03.png`.

### CT-INTERFACE-04 — Outra aba ou janela anônima inicia com carrinho vazio

- Objetivo: confirmar o comportamento documentado do carrinho por aba.
- Pré-condição: carrinho com pelo menos um item na aba original.
- Passos:
  1. Abra outra aba ou uma janela anônima.
  2. Acesse a loja e consulte o carrinho.
- Resultado esperado: carrinho vazio; comportamento esperado do ambiente, não é bug.
- Evidência: `CT-INTERFACE-04.png`.

### CT-INTERFACE-05 — Concluir o pedido pela interface com dados válidos

- Objetivo: explorar o fluxo de conclusão do pedido.
- Pré-condição: carrinho com itens válidos; fluxo ainda não mapeado.
- Passos:
  1. Inicie a conclusão do pedido pela interface.
  2. Registre as telas, campos, ações e validações encontrados, sem presumir comportamento não documentado.
- Missão exploratória: mapear o fluxo até a confirmação com dados válidos.
- O que registrar: duração, observações do fluxo, textos apresentados e eventuais pontos que precisem de confirmação.
- Resultado esperado: nenhum resultado fixo; confirmar comportamento durante a exploração.
- Evidência: `CT-INTERFACE-05-1.png`, `CT-INTERFACE-05-2.png` e demais capturas necessárias.
