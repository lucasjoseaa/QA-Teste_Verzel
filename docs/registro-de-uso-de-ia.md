# Registro de uso de IA

## Etapa 0 - Preparação

- Foi criada a estrutura inicial do repositório, o projeto Node.js, a configuração do Playwright e do TypeScript, além do arquivo de registro desta etapa.
- A execução desta etapa foi conduzida conforme as instruções permanentes do projeto e sem criação de outros documentos ou testes.

## Etapa 1 - Análise da documentação

- Foi lido e usado como fonte da verdade o arquivo de referência da entrega, contendo critérios, regras de cálculo, regras da loja, API, códigos de erro e pontos ambíguos.
- Foi criado o documento de análise da documentação com a estrutura solicitada e com a marcação de informações faltantes como "A confirmar na execução".
- A análise manteve o foco em rastreabilidade dos critérios, regras de cálculo, escopo, comportamento esperado do ambiente e estratégia de teste, sem avançar para etapas posteriores.

## Etapa 2 - Matriz de cenários e arquivos Gherkin

- Foi lida a análise da documentação e os critérios de aceite foram mapeados para a matriz de cenários e para os arquivos de especificação em Gherkin.
- Foram criados os arquivos feature correspondentes aos 45 cenários previstos pela etapa, incluindo o arquivo novo de fluxo da interface.
- Foi registrada a matriz de cenários com cobertura por área, por tipo e por critério de aceite, sem inventar regras, mensagens ou resultados que não constem na documentação.

## Etapa 3 - Automação dos testes de API

- Foram criados testes Playwright de API com os cenários automatizados das especificações de produtos e rotas, cálculo do carrinho, pedidos, validação do cliente e limite de quantidade.
- Foi acrescentado o cenário CT-API-CARRINHO-08 à matriz e à especificação, e foram criados utilitários compartilhados para produtos, cupons, requisições e comparação monetária em centavos.
- Foram executados `npm run test:api` e `npx tsc --noEmit`; os resultados foram comunicados na conclusão desta etapa.
