# Sprint S2 · Busqueda full-text con pagefind
Feature: Busqueda full-text con pagefind

  Scenario: Input de busqueda en header
    Given que estoy en cualquier pagina
    Then veo un input "Buscar..." con icono lupa en el header
    And el atajo "/" o "Ctrl+K" abre el modal de busqueda

  Scenario: Busqueda devuelve resultados del canonico + comunidades
    Given que escribo "magnetismo" en el buscador
    Then veo resultados tanto de /canonico/m08 (si menciona magnetismo)
    And como de /comunidades/formacion/escuelas/fisica/cabas/magnetismo
    And cada resultado muestra tipo (Paper / Comunidad / Nota) + snippet resaltado

  Scenario: Indice se construye en build con pagefind
    Given ejecuto "pnpm build"
    Then se genera "public/pagefind/" con indice
    And el indice pesa menos de 500kb para el corpus MVP
    And no hay backend: busqueda corre en cliente
