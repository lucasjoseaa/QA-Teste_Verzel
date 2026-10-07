# Registro de uso de IA

## Atividades conduzidas manualmente

- Definiu a execução por etapas, delimitando o escopo de cada uma e orientando que a documentação fornecida fosse a fonte das expectativas, sem antecipar etapas ou inventar comportamentos.
- Revisou os materiais e os resultados apresentados durante o trabalho, fez esclarecimentos sobre as contagens e indicou ajustes necessários na documentação e nos registros.
- Realizou a validação manual e exploratória da loja e informou a execução de 16 cenários: 15 aprovados e CT-INTERFACE-05 reprovado.
- Capturou e compartilhou imagens das verificações manuais de frete, limite de quantidade e validação dos dados do cliente, usadas como evidências para complementar os relatórios de defeito.
- Acompanhou os resultados das suítes, questionou a diferença entre testes executados, falhas esperadas e defeitos registrados, e conferiu a contagem de cenários da matriz.

## Atividades realizadas com apoio de IA

- Preparou a estrutura e as configurações do projeto com Node.js, TypeScript e Playwright, e analisou a documentação de referência para organizar critérios, regras e pontos a validar.
- Elaborou a matriz de cenários e as especificações Gherkin com base nos requisitos fornecidos, registrando as lacunas sem presumir comportamentos não documentados.
- Implementou testes automatizados de API e interface, além dos utilitários necessários, e executou as verificações de tipos e as suítes.
- Consolidou os resultados observados, preservou evidências das execuções automatizadas e preparou relatórios de defeito, mantendo distintas as expectativas documentadas e as respostas reais da aplicação.
- Configurou o workflow do GitHub Actions para verificar tipos, executar as suítes de API e interface e publicar os relatórios como artefatos.

## Observação

O escopo e as etapas foram definidos previamente, e a documentação fornecida orientou as expectativas dos testes. A IA apoiou a análise dos requisitos, a estruturação dos cenários, a implementação e execução das automações, a organização das evidências e a elaboração dos registros. Os resultados automatizados correspondem às execuções realizadas com Playwright; os resultados manuais e exploratórios refletem as informações e capturas registradas durante essas atividades. As falhas marcadas como esperadas pelo Playwright representam divergências observadas em relação às expectativas dos testes. O workflow foi criado e validado localmente quanto à sintaxe e aos comandos, sendo executado no GitHub.
