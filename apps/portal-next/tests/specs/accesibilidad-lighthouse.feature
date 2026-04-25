# Sprint S3 · DoD Lighthouse + a11y
Feature: Accesibilidad y Lighthouse quality gates

  Scenario: Home Lighthouse >= 95 en 4 categorias
    Given que corro Lighthouse sobre "/"
    Then Performance >= 95
    And Accessibility >= 95
    And Best Practices >= 95
    And SEO >= 95

  Scenario: Paper canonico Lighthouse
    Given que corro Lighthouse sobre "/canonico/m01"
    Then las 4 categorias estan >= 95

  Scenario: Navegacion con teclado funcional
    Given que navego con tab desde el header
    Then el orden de focus es: logo > nav links > theme toggle > busqueda > main content
    And el focus es visible con outline claro
    And puedo abrir y navegar la sidebar con teclado

  Scenario: Dark mode mantiene contraste AAA
    Given el tema es dark
    Then el texto principal cumple contraste AAA (7:1) sobre el fondo
    And los enlaces son distinguibles sin depender solo de color

  Scenario: Sin errores de hidratacion
    Given el portal hace SSR
    Then al hidratar en cliente no hay warnings de mismatch
    And el toggle de tema no causa flash of unstyled content
