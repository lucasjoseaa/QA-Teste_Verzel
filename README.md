# Teste de QA: Verzel Store (entrega VZS-142)

Validação da entrega **VZS-142 – Cupom de desconto e frete grátis** (versão 2.3.0) da loja fictícia Verzel Store, desenvolvida como teste técnico para a vaga de QA Júnior.

O repositório reúne a análise da documentação, os cenários de teste em Gherkin, a execução manual e exploratória, os relatórios de defeitos, as evidências e a automação de API e de interface com Playwright, com integração contínua no GitHub Actions.

- Loja: https://verzel-store.qa-test-verzel-store.workers.dev/
- Documentação da entrega: https://verzel-store.qa-test-verzel-store.workers.dev/documentacao
- API: https://verzel-store.qa-test-verzel-store.workers.dev/api

## Mapa dos entregáveis

| O que o teste pede | Onde está |
|---|---|
| Cenários de teste em Gherkin, derivados da documentação | [`features/`](features/) e [`docs/02-matriz-de-cenarios.md`](docs/02-matriz-de-cenarios.md) |
| Execução manual e exploratória, com resultado por cenário | [`docs/03-execucao-dos-testes.md`](docs/03-execucao-dos-testes.md) e [`docs/roteiro-de-execucao-manual.md`](docs/roteiro-de-execucao-manual.md) |
| Relatório de bugs | [`docs/bugs/`](docs/bugs/) |
| Evidências | [`docs/evidencias/`](docs/evidencias/) |
| Automação com Playwright (mínimo de 3 cenários) | [`testes/`](testes/) |
| Análise da documentação e pontos ambíguos | [`docs/01-analise-da-documentacao.md`](docs/01-analise-da-documentacao.md) |
| Integração contínua | [`.github/workflows/testes.yml`](.github/workflows/testes.yml) |

## Escopo

**Dentro do escopo:** os critérios de aceite CA01 a CA11 da entrega, a fórmula do total (subtotal − desconto + frete), o cupom BEMVINDO10 (10%), o cupom expirado VERAO2026, o frete fixo de R$ 19,90 e o frete grátis a partir de R$ 200,00, o limite de 5 unidades por produto, a validação dos dados do cliente, a API (produtos, cálculo do carrinho e pedidos) e o fluxo da interface.

**Fora do escopo:** testes de carga, de estresse e de segurança.

A análise completa, com a rastreabilidade dos critérios, as regras de cálculo, os dados de teste e a estratégia, está em [`docs/01-analise-da-documentacao.md`](docs/01-analise-da-documentacao.md).

## 🛠️ Tecnologias e Ferramentas

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg" width="25" />
  <strong> Playwright 1.63</strong> — automação dos testes de interface e de API, com relatório HTML, capturas de tela e traces das falhas.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="25" />
  <strong> TypeScript</strong> — linguagem dos testes, dos Page Objects e dos utilitários, com verificação de tipos no pipeline.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="25" />
  <strong> Node.js</strong> — ambiente de execução dos testes, localmente e no pipeline.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="25" />
  <strong> npm</strong> — gerenciamento das dependências e dos scripts de execução.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg" width="25" />
  <strong> Gherkin</strong> — escrita dos cenários de teste (Funcionalidade, Cenário, Dado, Quando e Então) na pasta <code>features/</code>.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg" width="25" />
  <strong> Chromium</strong> — navegador utilizado nos testes de interface.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="25" />
  <strong> Visual Studio Code</strong> — ambiente de desenvolvimento do projeto.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="25" />
  <strong> Git</strong> — versionamento do projeto, com um commit por etapa.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="25" />
  <strong> GitHub</strong> — hospedagem do repositório.
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" width="25" />
  <strong> GitHub Actions</strong> — integração contínua: verificação de tipos, execução da suíte e publicação dos relatórios.
</p>

<p>
  🛒 <strong>Verzel Store v2.3.0 (entrega VZS-142)</strong> — aplicação utilizada como sistema sob teste.
</p>

## Estrutura do repositório

```
.
├── .github/workflows/     Pipeline de integração contínua
├── docs/
│   ├── 01-analise-da-documentacao.md
│   ├── 02-matriz-de-cenarios.md
│   ├── 03-execucao-dos-testes.md
│   ├── roteiro-de-execucao-manual.md
│   ├── bugs/              Relatórios de defeitos (BUG-NNN)
│   └── evidencias/
│       ├── api/           Requisições e respostas reais da API
│       ├── interface/     Capturas de tela das falhas automatizadas
│       └── manual/        Capturas de tela da execução manual
├── features/              Cenários em Gherkin, por funcionalidade
├── testes/
│   ├── api/               Testes de API (e pasta de apoio com dados e utilitários)
│   ├── interface/         Testes de interface
│   ├── paginas/           Page Objects (vitrine e carrinho)
│   └── suporte/           Utilitários compartilhados (valores monetários)
├── playwright.config.ts   Configuração do Playwright (projetos "api" e "interface")
├── tsconfig.json
└── package.json
```

## Pré-requisitos e instalação

- Node.js (versão LTS)
- npm

Clone o repositório, entre na pasta do projeto e execute:

```bash
npm ci
npx playwright install chromium
```

## Como executar

| Objetivo | Comando |
|---|---|
| Todos os testes (API e interface) | `npm test` |
| Somente os testes de API | `npm run test:api` |
| Somente os testes de interface | `npm run test:interface` |
| Interface com o navegador visível | `npm run test:headed` |
| Abrir o relatório HTML | `npm run relatorio` |

Os testes usam a variável de ambiente `URL_BASE` para o endereço da loja. Quando ela não é informada, o valor padrão definido em `playwright.config.ts` é usado. Para apontar para outro endereço:

```bash
# Git Bash ou Linux/macOS
URL_BASE=https://exemplo.com npm test

# PowerShell
$env:URL_BASE = "https://exemplo.com"; npm test
```

## Convenção de identificadores

- `CT-ÁREA-NN`: caso de teste (por exemplo, `CT-CUPOM-01`). A área indica a funcionalidade e `NN` é o número sequencial.
- `CAnn`: critério de aceite da documentação (CA01 a CA11).
- `BUG-NNN`: defeito registrado em [`docs/bugs/`](docs/bugs/).

Cada cenário tem o mesmo identificador e o mesmo título na matriz, no arquivo `.feature` e no título do teste automatizado.

## Cobertura

São **50 cenários**, distribuídos por área e por tipo de execução:

| Área | Cenários | Automatizado | Manual | Exploratório |
|---|---|---|---|---|
| Cupom de desconto | 6 | 2 | 3 | 1 |
| Frete e frete grátis | 6 | 3 | 3 | 0 |
| Limite de quantidade | 5 | 5 | 0 | 0 |
| Cálculo e arredondamento | 3 | 0 | 3 | 0 |
| API: cálculo do carrinho | 9 | 9 | 0 | 0 |
| API: pedidos | 4 | 4 | 0 | 0 |
| Dados do cliente | 6 | 5 | 1 | 0 |
| API: produtos, rotas e erros gerais | 6 | 6 | 0 | 0 |
| Fluxo da interface | 5 | 0 | 4 | 1 |
| **Total** | **50** | **34** | **14** | **2** |

Os cenários automatizados são executados com Playwright e, onde há exemplos (Esquema do Cenário), cada linha de exemplo gera um teste. A tabela de cobertura de cada critério de aceite está no final da matriz de cenários.

## Resultados da execução

Os resultados de cada cenário estão em [`docs/03-execucao-dos-testes.md`](docs/03-execucao-dos-testes.md), com o resumo, a data da execução e a evidência de cada falha.

Na execução mais recente, **40 testes de API e 10 de interface** foram executados. Os 16 casos com divergências conhecidas estão marcados com `test.fail` (14 de API e 2 de interface), vinculados aos defeitos correspondentes; o Playwright os contabiliza como resultados esperados. Assim, um teste passa a sinalizar quando o defeito for corrigido.

## Defeitos encontrados

| ID | Título | Severidade | Prioridade | Camada |
|---|---|---|---|---|
| [BUG-001](docs/bugs/BUG-001-frete-gratis-no-limite-de-200.md) | Frete grátis não é aplicado quando o subtotal é exatamente R$ 200,00 | Alta | Alta | Interface e API |
| [BUG-002](docs/bugs/BUG-002-api-sem-limite-de-5-unidades.md) | A API não aplica o limite de 5 unidades por produto | Média | Média | API |
| [BUG-003](docs/bugs/BUG-003-nome-aceita-numeros-e-simbolos.md) | O campo nome aceita números e símbolos | Baixa | Baixa | Interface e API |
| [BUG-004](docs/bugs/BUG-004-email-aceita-caracteres-invalidos.md) | O campo e-mail aceita endereço com caracteres inválidos no domínio | Média | Média | Interface e API |
| [BUG-005](docs/bugs/BUG-005-mensagem-de-erro-com-valores-internos.md) | A mensagem de erro expõe valores internos quando o produtoId é ausente, nulo ou vazio | Baixa | Baixa | API |

Observação sobre o BUG-003: a documentação exige nome e sobrenome, mas não define os caracteres permitidos. O relatório registra a expectativa como requisito implícito, baseado em prática comum de validação.

## Pontos ambíguos da documentação

A análise identificou cinco pontos em que a documentação não define o comportamento de forma única. Para cada um, o documento de análise registra a interpretação adotada e como os testes tratam o ponto:

1. A página inicial menciona o cupom "na primeira compra", mas o critério CA01 não traz essa restrição e a loja não tem login nem histórico de compras.
2. O CA05 não define o que acontece quando um segundo cupom é aplicado sem remover o primeiro.
3. O CA10 define o limite de 5 unidades, mas não descreve o comportamento da interface ao atingi-lo.
4. O CA11 exige duas casas decimais, mas não especifica o método de arredondamento.
5. A documentação de erros usa `campo` e `campos` de forma inconsistente.

Detalhes e tratamento de cada ponto: [`docs/01-analise-da-documentacao.md`](docs/01-analise-da-documentacao.md).

## Decisões de projeto

- **Page Object na interface:** as ações e leituras das telas (vitrine e carrinho) ficam em classes dedicadas, e as asserções ficam nos testes.
- **Seletores por papéis acessíveis:** a loja não expõe `data-testid`; os elementos são localizados por papel, nome e texto.
- **Valores monetários em centavos:** as comparações são feitas com inteiros para evitar imprecisão de ponto flutuante.
- **Expectativas vindas da documentação:** nenhum valor esperado foi ajustado para fazer um teste passar. As divergências são registradas como defeitos.
- **Defeitos conhecidos com `test.fail`:** cada teste que falha por um defeito aberto referencia o ID do relatório.
- **Evidências de execuções reais:** respostas de API e capturas de tela vêm das execuções, sem edição.

## Integração contínua

O pipeline em [`.github/workflows/testes.yml`](.github/workflows/testes.yml) é executado a cada push e pull request, e também pode ser iniciado manualmente. Ele verifica os tipos do TypeScript, executa os testes de API e os de interface e publica o relatório do Playwright e os resultados das falhas (capturas de tela e traces) como artefatos da execução.

## Limitações e observações

- A tela de fechamento do pedido foi explorada apenas de forma manual e exploratória. Ela não possui automação.
- Os cenários exploratórios registram o comportamento observado; um comportamento só é tratado como defeito quando contraria a documentação.
- Comportamentos descritos como esperados do ambiente (carrinho guardado apenas na aba do navegador, pedidos não armazenados, sem cobrança nem e-mail, produtos, preços e cupons fixos) não são tratados como defeitos.

## Autor

### ***🧑‍💻 Lucas José - QA Engineer***

<p>
  <a href="https://www.linkedin.com/in/lucas-jose-alves/" title="LinkedIn"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="25" alt="LinkedIn" /></a>
  &nbsp;&nbsp;
  <a href="mailto:lucasjoseaa@gmail.com" title="lucasjoseaa@gmail.com"><img src="https://cdn.simpleicons.org/gmail" width="25" alt="Gmail" /></a>
</p>


  
