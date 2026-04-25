# Sprint S2 · Rendering Obsidian-native de wikilinks, callouts, embeds, tags
Feature: Rendering Obsidian-native en Next via remark/rehype

  Scenario: Wikilink [[m05]] se resuelve al paper canonico
    Given una nota en "/comunidades/formacion/escuelas/fisica/principios-escuela-emprendedora"
    And el body MDX contiene "Este enfoque deriva de [[m05]]"
    When la pagina se renderiza
    Then "[[m05]]" es un <a href="/canonico/m05">M05</a>
    And al hacer click navego a /canonico/m05

  Scenario: Wikilink con alias [[m05|Escuela Emprendedora]]
    Given el body contiene "[[m05|Escuela Emprendedora]]"
    When se renderiza
    Then el link muestra "Escuela Emprendedora" pero apunta a /canonico/m05

  Scenario: Wikilink con heading [[m05#seccion-3]]
    Given el body contiene "[[m05#seccion-3]]"
    When se renderiza
    Then el href es "/canonico/m05#seccion-3"

  Scenario: Wikilink roto muestra estado broken (sin romper build)
    Given el body contiene "[[paper-inexistente]]"
    When se renderiza
    Then el texto se muestra con clase "wikilink-broken" (estilo rojo/tachado)
    And el build NO falla

  Scenario: Callout Obsidian > [!abstract] renderiza con estilo
    Given el body contiene "> [!abstract]\n> Resumen del paper"
    When se renderiza
    Then veo un div con clase "callout callout-abstract"
    And incluye icono 📄 o info-square
    And el titulo del callout es "Abstract"

  Scenario: Callouts tipos soportados
    Then los callouts renderizan correctamente para: abstract, info, note, tip, warning, danger, quote, example, important

  Scenario: Tag #ruta-clark-r4 es clickeable
    Given el body contiene "#ruta-clark-r4"
    When se renderiza
    Then es un link a /canonico/tags/ruta-clark-r4
    And el estilo es pill con fondo tinte

  Scenario: Embed ![[imagen.png]] resuelve a asset local
    Given el body contiene "![[diagrama.png]]"
    And existe "content/.../diagrama.png"
    When se renderiza
    Then es un <img src="/static/diagrama-HASH.png">
