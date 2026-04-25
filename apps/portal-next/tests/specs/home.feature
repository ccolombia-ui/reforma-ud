# Sprint S2 · Home pública del portal reforma·ud
Feature: Home del portal reforma·ud

  Background:
    Given que el portal esta desplegado en reforma-ud.vercel.app

  Scenario: Visitante anonimo ve hero + navegacion principal
    Given que entro a "/" sin estado previo
    Then veo header con logo "reforma·ud" y toggle de tema (sol/luna)
    And veo un hero con titulo que menciona el Acuerdo CSU 04/2025
    And veo CTAs "Explorar canonico" y "Ver comunidades"
    And la sidebar izquierda muestra tree jerarquico: Canonico · Gobierno · 3 Vicerrectorias

  Scenario: Grid de KPIs del corpus
    When desplazo hacia abajo
    Then veo 4 KPI cards: "12 papers canonicos" · "5 tipos de CoP" · "21 BPAs" · "Q2 2026"

  Scenario: Grid de 12 investigaciones M01-M12
    Then veo 12 cards M01-M12 con badge TDD (RED/YELLOW/GREEN)
    And cada card es clickeable a /canonico/[mid]
    And cada card muestra titulo corto + fase CRISP-DM

  Scenario: Toggle de tema persiste entre paginas
    Given que estoy en tema light (default)
    When hago click en el toggle de tema
    Then la pagina cambia a tema dark
    And localStorage["theme"] = "dark"
    When navego a /canonico/m01
    Then la pagina m01 se renderiza en tema dark
