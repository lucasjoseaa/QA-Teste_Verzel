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

## Etapa 4 - Automação dos testes de interface

- Foi executado um script temporário de descoberta com Playwright para inspecionar vitrine, carrinho, cupom, resumo e mecanismo do limite de quantidade; o script foi removido após a descoberta.
- Foram criados Page Objects para vitrine e carrinho, uma função de conversão de valores monetários para centavos e testes para os cenários de interface automatizados solicitados.
- `npm run test:interface` executou 10 testes: 8 passaram e 2 falharam porque a tela exibiu frete de R$ 19,90 em CT-FRETE-02 e CT-FRETE-04, cujos resultados esperados documentados indicam R$ 0,00.
- `npx tsc --noEmit` foi executado e terminou com código de saída 0.
