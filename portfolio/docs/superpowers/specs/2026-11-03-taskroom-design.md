# Taskroom — primeira entrega para o portfólio

Proposta para revisão · 3 de novembro de 2026

## Intenção

Uma pessoa de uma equipe criativa pequena recebe um pedido incompleto. Ela precisa saber o que falta, quem assume a próxima ação e quando o pedido está pronto para começar. Taskroom demonstra essa passagem de uma mensagem solta para um brief acionável. A recorrência do problema e a utilidade da solução são hipóteses a validar.

## Abordagem escolhida

Construir e revisar Taskroom antes de começar Clearflow e First Value. A alternativa de montar as três páginas como conceitos permitiria apresentar os temas mais cedo, com menos material concreto para avaliar. O fluxo funcional do Taskroom fornece a imagem principal e a evidência de implementação para o primeiro case.

As fontes são a Product Bible, o Case Guide e o UI/UX & Build Blueprint de Taskroom, v0.1. O Blueprint orienta os comportamentos da demo. A Product Bible orienta regras e microcopy. O Case Guide orienta a narrativa e o plano de validação.

## Experiência da demo

Cinco vistas para experimentar a jornada:

| Vista | Ação e resultado |
| --- | --- |
| Requests | Buscar por título, filtrar por status e abrir um pedido. Exibir responsável, prazo e próxima ação. |
| New request | Informar título, origem e descrição. Prazo é opcional. Validar campos, salvar rascunho ou criar pedido. |
| Request details | Consultar o brief, ajustar responsável e prazo e ver o histórico. Usar o botão correspondente ao estado atual. |
| Ask for details | Escolher o que falta e registrar uma nota que indique como esclarecer o pedido. A gravação muda o status e aparece no histórico. |
| Completed | Ver o resumo da conclusão, voltar ao pedido ou reabrir. |

Cenário inicial fictício: um pedido de peças para campanha chegou sem os formatos finais. Quem abre o pedido vê a lacuna, registra a solicitação de detalhes e adiciona a resposta quando ela chega. A demo mostra a sequência New → Needs details → Ready → In progress → Completed e permite reabrir para In progress. Também permite a transição direta New → Ready para um pedido completo.

Um pedido pode ser criado sem responsável. Para marcar Ready, o brief precisa de título, descrição, origem, responsável e resolução das pendências. No caminho de correção, editar as informações do brief e confirmar a resolução de cada item pendente. Expor a razão quando uma ação estiver bloqueada. Cada mudança de estado registra horário e ação. A conclusão mantém o brief legível em uma vista que pode ser impressa pelo navegador.

A demo abre com três exemplos fictícios e usa armazenamento do navegador para pedidos, rascunho e histórico. Indicar o armazenamento junto às ações de gravação e informar quando ele falhar. Pedir confirmação antes de descartar mudanças. O esclarecimento fica salvo no pedido. Integrações, contas, anexos reais, entrega de mensagens e telemetria externa ficam fora desta primeira entrega.

## Integração editorial e visual

Usar a base atual de sampayobreno/portfolio, com a aplicação Next.js em portfolio/. Adicionar Taskroom a Work em inglês e francês, com páginas equivalentes e navegação entre idiomas. Usar a estrutura de case, os tokens e os componentes editoriais existentes. O Relay continua na lista de trabalhos. A demo compartilhada tem interface em inglês, seguindo a microcopy do Drive. As duas páginas informam o idioma antes de abrir a demo, que oferece retorno ao case na língua de origem.

A imagem principal virá da interface em funcionamento. No desktop, o foco visual é a lista com um pedido bloqueado e o próximo passo legível. No celular, a lista e o detalhe aparecem em sequência. A demo recebe navegação por teclado, foco visível, validação por campo e estados de lista vazia, erro de gravação e sucesso.

O case apresenta a hipótese, o fluxo e a decisão de exigir responsável antes de Ready, permitindo captura rápida na abertura. Inclui o que o protótipo demonstra e o plano para verificar se alguém consegue criar, esclarecer e encaminhar um pedido sem ajuda. O texto identifica o trabalho como protótipo independente e a origem fictícia dos exemplos. Atualizar o status editorial a partir da evidência disponível na entrega.

## Critérios de entrega

- Abrir o case a partir de Work em cada idioma e entrar na demo.
- Percorrer criação, esclarecimento, correção, início, conclusão e reabertura. Conferir status, próxima ação e histórico a cada transição.
- Conferir persistência após recarregar, busca sem resultados, validação, descarte de alterações e falha de armazenamento.
- Verificar a jornada no teclado, em desktop e numa largura móvel de 390 px. Registrar a cobertura real dos testes.
- Conferir o build e as rotas do site. Capturar a interface implementada para a página do case.
- Revisar o resultado em preview antes da publicação no Vercel. A ordem acordada segue com Clearflow e depois First Value.
