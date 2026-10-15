# BUG-004: O campo e-mail aceita endereço com caracteres inválidos no domínio

## 2. Identificação

| ID | Status | Severidade | Prioridade | Camada | Funcionalidade | Critérios de aceite relacionados | Cenários de teste relacionados | Data e hora da observação | Reprodutibilidade |
|---|---|---|---|---|---|---|---|---|---|
| BUG-004 | Aberto | Média | Média | Interface e API | Validação de e-mail do cliente | Regra de cliente, seção 3.2 da análise: o e-mail precisa ter formato válido; não há CA específico | CT-CLIENTE-06; CT-CLIENTE-02 como contraste; CT-INTERFACE-05 (execução manual) | API: 06/10/2026, 19:57:19, 20:21:06 e 20:36:30 (UTC−03:00). Interface (execução manual): 06/10/2026, antes das 21:26 (UTC−03:00). | CT-CLIENTE-06 retornou HTTP 201 nas execuções de API registradas. A interface permitiu confirmar o pedido com o mesmo e-mail na execução manual, registrada em captura. |

## 3. Ambiente

- URL da loja: https://verzel-store.qa-test-verzel-store.workers.dev/
- Entrega: VZS-142, versão 2.3.0.
- Sistema operacional: Windows 11, versão 23H2 (build 22631.6199).
- Node.js: v24.21.0.
- Playwright: 1.63.0.
- Navegador nos testes automatizados de interface: Chromium 153.0.8010.12.
- Testes automatizados de API usam `APIRequestContext`, sem navegador.
- Navegador e versão usados na execução manual: Google Chrome 155.0.8059.40 (64 bits).

## 4. Resumo

O endereço `usuario@!#%.com` foi aceito pela API e o pedido foi criado. Na execução manual, a interface também permitiu confirmar o pedido com esse e-mail, sem exibir mensagem de validação.

## 5. Pré-condições

- A loja/API está acessível.
- Usar P005, Mochila Urbana 20L, em quantidade 1.
- Usar os demais dados exatamente como registrados na evidência atual: nome Lucas José e CEP `01310-100`.
- O e-mail sob teste é `usuario@!#%.com`.

## 6. Passos para reproduzir

### Na interface

1. Abrir a loja.
2. Adicionar um produto ao carrinho.
3. Abrir o carrinho e seguir para o fechamento do pedido.
4. Preencher o e-mail com `usuario@!#%.com` e informar nome e CEP válidos.
5. Confirmar o pedido.
6. Nenhuma mensagem de validação foi exibida e o pedido foi confirmado.

A captura está na seção 10 e mostra o formulário preenchido com o e-mail testado, sem mensagem de validação, antes da confirmação.

### Na API

Enviar o corpo registrado pelo teste para `POST /api/pedidos`:

```sh
curl -X POST "https://verzel-store.qa-test-verzel-store.workers.dev/api/pedidos" -H "Content-Type: application/json" -d '{"cliente":{"nome":"Lucas José","email":"usuario@!#%.com","cep":"01310-100"},"itens":[{"produtoId":"P005","quantidade":1}]}'
```

Resultado observado: HTTP 201; pedido `VZ-940556` criado.

## 7. Resultado esperado

O pedido deveria ser recusado por e-mail inválido; na API, HTTP 422 e código `DADOS_INVALIDOS`. Fonte: análise da documentação, seção 3.2 (regra de e-mail válido) e seção 3.4 (código `DADOS_INVALIDOS`).

## 8. Resultado obtido

### Interface

Na execução manual, a interface não exibiu mensagem de validação para o e-mail e permitiu confirmar o pedido. A captura está na seção 10.

### API

HTTP 201:

```json
{
  "numero": "VZ-940556",
  "criadoEm": "2026-10-06T23:20:11.482Z",
  "cliente": {
    "nome": "Lucas José",
    "email": "usuario@!#%.com",
    "cep": "01310100"
  },
  "itens": [
    {
      "produtoId": "P005",
      "nome": "Mochila Urbana 20L",
      "precoUnitario": 100,
      "quantidade": 1,
      "total": 100
    }
  ],
  "subtotal": 100,
  "desconto": 0,
  "frete": 19.9,
  "freteGratis": false,
  "valorFaltanteFreteGratis": 100,
  "total": 119.9,
  "cupom": null
}
```

## 9. Comparação

| Campo | Esperado | Obtido |
|---|---|---|
| Status HTTP | 422 | 201 |
| Código | `DADOS_INVALIDOS` | Pedido criado; resposta sem código de erro |
| E-mail do cliente | Rejeitado por formato inválido | `usuario@!#%.com` aceito como enviado |
| Número do pedido | Não deve ser criado | `VZ-940556` |

## 10. Evidências

- [CT-CLIENTE-06-email-invalido-resposta.json](../evidencias/api/CT-CLIENTE-06-email-invalido-resposta.json) — requisição e resposta real da API.
- ![BUG-004: captura manual do e-mail inválido](../evidencias/manual/BUG-004-email-invalido.png)

## 11. Impacto

Um pedido pode ser criado com um endereço de e-mail que a documentação caracteriza como inválido, comprometendo a qualidade dos dados de contato do pedido.

## 12. Hipótese de causa

**Hipótese:** a validação pode verificar apenas a presença de `@` e de ponto, sem validar os caracteres do domínio. Não houve inspeção do código e essa causa não está confirmada.

## 13. Observações

- Como contraste, CT-CLIENTE-02 passou: os valores `maria`, `maria@` e `maria@exemplo` foram recusados pela API.
- A documentação exige e-mail em formato válido, mas não especifica formalmente a gramática completa de endereços. O exemplo testado contém caracteres especiais no domínio.
- A captura manual do e-mail inválido está anexada.
