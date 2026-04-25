# Sprint S2 · Canonico = biblioteca + grafo del corpus MI-12
Feature: Canonico biblioteca MI-12

  Scenario: Indice del canonico lista los 12 papers
    Given que entro a "/canonico"
    Then veo listado de M01-M12 con filtros por fase CRISP-DM y ruta Clark
    And veo enlace "Ver grafo global" que lleva a /canonico/grafo
    And la busqueda pagefind esta disponible en el header

  Scenario: Vista de paper individual renderiza MDX Obsidian-native
    Given que entro a "/canonico/m04"
    Then veo el titulo y descripcion en el hero
    And veo la tabla de contenidos en el sidebar derecho (sticky)
    And el cuerpo MDX renderiza callouts "> [!abstract]" con estilo Obsidian
    And los wikilinks [[m05]] son clickeables y llevan a /canonico/m05
    And los tags #ruta-clark-r4 son clickeables y llevan a /canonico/tags/ruta-clark-r4

  Scenario: Boton "Guardar como PDF" usa print del navegador
    Given que estoy en "/canonico/m05"
    When hago click en "Guardar como PDF"
    Then se abre el dialogo de impresion del navegador
    And el CSS @media print oculta sidebar, header, toggles y widgets
    And el PDF generado conserva paleta B.3 (print-color-adjust: exact)
    And los saltos de pagina respetan headings de seccion

  Scenario: Backlinks panel muestra quien cita este paper
    Given que estoy en "/canonico/m05"
    Then veo un panel "Referenciado en" al final o sidebar
    And lista notas de comunidades que tienen "cites: [m05]" o wikilink [[m05]]
    And cada backlink es clickeable
