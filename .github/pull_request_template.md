# Pull Request — reforma·ud

## Resuelve
Cierra # <!-- número del issue RED -->

## Tipo de cambio
- [ ] 📄 Paper nuevo (M##)
- [ ] 🔧 Corrección de paper existente
- [ ] 📚 Ficha BPA
- [ ] 👥 Guía de CoP
- [ ] 🏗️ Código / componente portal
- [ ] 🔄 Configuración / infra

---

## Criterios de aceptación — todos deben pasar antes del merge

### Contenido (papers y docs)
- [ ] Pregunta trazadora respondida explícitamente en la introducción
- [ ] Mínimo 3 fuentes primarias con URL o DOI verificado
- [ ] Al menos 1 diagrama Mermaid o tabla estructurada
- [ ] Callout `> [!abstract]` con resumen ejecutivo ≤ 3 párrafos
- [ ] Frontmatter YAML completo (`title`, `description`)

### Técnico
- [ ] Build local verde: `pnpm --filter portal build`
- [ ] Sin errores de schema en content collections
- [ ] No rompe páginas existentes

### CoP
- [ ] Tipo DIATAXIS declarado: [ ] Tutorial [ ] How-to [ ] Reference [ ] Explanation
- [ ] Roles CoP servidos declarados

---

## Checklist del reviewer (CODEOWNERS)
- [ ] Pregunta trazadora respondida satisfactoriamente
- [ ] Fuentes verificadas y accesibles
- [ ] Coherente con POC v4.2 §K y AUDIT v1
- [ ] Lenguaje accesible para el rol objetivo
