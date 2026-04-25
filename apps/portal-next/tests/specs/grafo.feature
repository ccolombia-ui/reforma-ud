# Sprint S3 · Grafo de conocimiento estilo pyvis con vis-network
Feature: Grafo de conocimiento (global canonico + local por CoP)

  Scenario: Grafo global del canonico
    Given que entro a "/canonico/grafo"
    Then veo un canvas con vis-network renderizando 12 nodos M01-M12
    And ademas veo nodos de las 21 BPAs conectadas
    And los edges son wikilinks + "cites" entre papers
    And el color del nodo es por ruta Clark dominante (R1-R5)
    And puedo hacer zoom con rueda, pan con drag, click en nodo

  Scenario: Click en nodo abre panel de detalle
    Given que estoy en el grafo global
    When hago click en el nodo "M05"
    Then veo un panel lateral con: titulo, descripcion breve, CTA "Abrir paper"
    And el CTA lleva a /canonico/m05

  Scenario: Grafo local de una CoP muestra solo su vault + puentes
    Given que entro a "/comunidades/formacion/escuelas/fisica/grafo"
    Then veo nodos de notas de la Escuela de Fisica (principios-... y cabas/*)
    And veo nodos "puente" en otro color (gris) que representan papers canonicos citados
    And los edges muestran wikilinks internos del vault

  Scenario: Fisica de vis-network es interactiva (estilo pyvis)
    Then los nodos tienen repulsion + spring entre edges
    And al soltar un nodo despues de arrastrar, se acomoda suavemente
    And el grafo es responsive (se adapta al viewport)

  Scenario: Grafo se construye en build (no runtime)
    Given que ejecuto "pnpm build"
    Then se genera ".velite/graph.json" con nodos + edges del corpus completo
    And el JSON pesa menos de 200kb
    And se sirve estatico desde /static/graph.json
