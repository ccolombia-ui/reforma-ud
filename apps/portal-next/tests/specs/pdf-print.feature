# Sprint S2 · Print-to-PDF con @media print (patron experto.html)
Feature: Descarga PDF via print del navegador

  Scenario: Boton "Guardar como PDF" visible en paper canonico
    Given que estoy en "/canonico/m05"
    Then veo un boton "Guardar como PDF" en el header del paper
    And el boton tiene aria-label "Imprimir o guardar como PDF"

  Scenario: Click en boton dispara window.print()
    When hago click en "Guardar como PDF"
    Then window.print() se ejecuta
    And el dialogo del navegador permite "Guardar como PDF"

  Scenario: CSS @media print oculta UI no esencial
    Given activo el modo print
    Then .chat-widget · .sidebar · header nav · footer · .theme-toggle NO aparecen
    And solo aparece: titulo · metadata · cuerpo MDX · pie de licencia CC BY-SA

  Scenario: Colores se preservan con print-color-adjust
    Given el CSS aplica "print-color-adjust: exact; -webkit-print-color-adjust: exact;"
    Then callouts mantienen sus fondos coloreados
    And badges de Ruta Clark mantienen su color
    And el navy de los headings se preserva

  Scenario: Page breaks respetan estructura
    Given el MDX tiene h2 principales
    Then cada h2 tiene "page-break-before: auto"
    And secciones cortas tienen "break-inside: avoid"
    And callouts "> [!abstract]" nunca se parten en medio

  Scenario: Tipografia legible en print
    Then en print el body usa 10.5pt Source Serif o Crimson
    And el line-height es 1.4 (mas compacto que en screen)
    And el color de texto es #0f172a (navy) sobre fondo blanco
