# Sprint S2 · Navegacion jerarquica de comunidades (organigrama Reforma 2024)
Feature: Comunidades como unidades organizativas UDFJC

  Scenario: Hub de comunidades muestra 4 ramas principales
    Given que entro a "/comunidades"
    Then veo 4 cards grandes: "Gobierno" · "VR Formacion" · "VR Investigacion" · "VR Extension"
    And cada card muestra descripcion breve + conteo de sub-comunidades

  Scenario: Navegacion Gobierno tiene CSU + Rectoria + Direcciones
    Given que entro a "/comunidades/gobierno"
    Then veo links a: /comunidades/gobierno/csu · /comunidades/gobierno/rectoria
    And veo seccion "Direcciones" con 3 sub-nodos: bienestar, administrativa, planeacion

  Scenario: VR Formacion tiene dos ramas paralelas (facultades + escuelas)
    Given que entro a "/comunidades/formacion"
    Then veo seccion "Facultades" con link a "Ciencias Matematicas y Naturales"
    And veo seccion "Escuelas" con link a "Escuela de Fisica"
    And la sidebar izquierda muestra el tree expandido

  Scenario: Programa de Fisica (demo poblado)
    Given que entro a "/comunidades/formacion/facultades/ciencias-matematicas-y-naturales/programas/fisica"
    Then veo el landing con nombre oficial "Programa de Fisica"
    And veo breadcrumb: Inicio > Comunidades > VR Formacion > Facultades > CMN > Programas > Fisica
    And veo listado de 2-3 notas demo del vault
    And veo seccion "Fundado en" con enlaces a papers canonicos citados (m06, m08, m11)

  Scenario: Escuela de Fisica (demo nuevo M05)
    Given que entro a "/comunidades/formacion/escuelas/fisica"
    Then veo landing con tipo "Escuela Emprendedora Transformativa"
    And veo seccion "CABAs" listando "Magnetismo"
    And los wikilinks [[m05]] dentro de notas llevan a /canonico/m05

  Scenario: CABA Magnetismo (nivel mas profundo)
    Given que entro a "/comunidades/formacion/escuelas/fisica/cabas/magnetismo"
    Then veo landing con descripcion del CABA
    And veo nota "evaluaciones-tipo" en el listado del vault
    And breadcrumb muestra los 7 niveles sin romperse en mobile

  Scenario: VR Investigacion lista Institutos
    Given que entro a "/comunidades/investigacion"
    Then veo seccion "Institutos" con 3 sub-nodos: IPAZUD, IEIE, IJ+
    And cada instituto tiene su propio landing (placeholder en MVP)

  Scenario: VR Extension lista Centros
    Given que entro a "/comunidades/extension"
    Then veo seccion "Centros" con link a ILUD
