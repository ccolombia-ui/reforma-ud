# Cómo contribuir — reforma·ud

Bienvenido/a al portal del proyecto MI-12 Reforma Vinculante UDFJC. Tu contribución depende de tu rol.

## Soy Estudiante

1. **Comenta un paper**: [abre un issue](https://github.com/ccolombia-ui/reforma-ud/issues/new/choose) con el template "Feedback sobre un paper"
2. **Comparte tu experiencia**: inicia una [Discussion](https://github.com/ccolombia-ui/reforma-ud/discussions) en la categoría "Voces del aula"
3. **Propón contenido**: abre un PR a `content/drive-sync/` (necesitas git) o usa el issue de feedback

## Soy Director/a de programa

1. **Valida factibilidad de una BPA**: issue con label `cop:director`
2. **Propón un ADR de governance**: PR a `docs/architecture/adr-*.md`
3. **Reporta contexto institucional**: Discussion en "Gobernanza académica"

## Soy Diseñador/a curricular

1. **Propón ajuste curricular**: issue con label `cop:disenador`
2. **Mejora un schema CCA**: PR a `packages/content-schemas/`
3. **Comparte tu diseño**: Discussion en "Arquitectura curricular"

## Soy Formador/a (docente)

1. **Comparte práctica pedagógica**: Discussion en "Práctica pedagógica"
2. **Propón ejemplo PBL/co-op**: issue con label `cop:formador`
3. **Valida contenido del paper**: PR con correcciones al paper correspondiente

## Soy Investigador/a

1. **Sugiere fuente bibliográfica**: issue con label `cop:investigador`
2. **Reporta investigación relacionada**: Discussion en "Agenda investigativa"
3. **Propón BPA basada en evidencia**: PR a `content/drive-sync/` vía git

## Soy Emprendedor/a académico

1. **Reporta caso de transferencia**: Discussion en "Transferencia y territorio"
2. **Sugiere alianza territorial**: issue con label `cop:emprendedor`
3. **Conecta con ODS**: PR con propuesta de extensión territorial

## Setup técnico (para PRs de código/contenido)

```bash
git clone https://github.com/ccolombia-ui/reforma-ud.git
cd reforma-ud
pnpm install
pnpm dev    # portal en http://localhost:4321
```

## Licencia de contribuciones

Al contribuir aceptas que tu aporte se publique bajo **CC BY-SA 4.0**, coherente con la licencia del corpus MI-12.
