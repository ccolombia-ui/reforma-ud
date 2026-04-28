---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:escuela-generica-udfjc
kd_title: "Escuela Genérica UDFJC (unidad de análisis post-reforma aplicable a cualquier campo disciplinar)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.1.0


skos_prefLabel: "Escuela Genérica UDFJC (unidad de análisis abstracta post-reforma)"
skos_altLabel: ["Escuela Genérica", "Generic Escuela UDFJC", "Unidad análisis Escuela"]
skos_definition: "Construcción abstracta propuesta en M04 §1.3 (Madera Sepúlveda 2026) que representa **una Escuela UDFJC tipo** post-reforma estatutaria (ACU-004-25 Arts. 69-72), aplicable a cualquier campo disciplinar específico. La Escuela Genérica es la **unidad de análisis** transversal del cap-MI12 para análisis JTBD, diseño de Paquetes CCA, diagnóstico de R1-R6, etc. Sus características invariantes son: (i) ~25 docentes distribuidos en 4 roles JTBD (Diseñador + Facilitador + Pasteur + Coop) + 1 Director; (ii) ~600-1.200 estudiantes distribuidos en programas de pregrado + posgrado; (iii) 2-4 CABAs activas como nichos transformativos; (iv) un campo de conocimiento-saber (Art. 59) como dominio epistémico; (v) presupuesto Art. 88-90. La Escuela de Física es usada como **ilustración metodológica** principal en M04. Aplicado al cap-MI12: análisis JTBD, diseño curricular CCA, métricas BSC-s, monitoreo R1-R6 — todos se desarrollan primero sobre la Escuela Genérica y se particularizan después por campo disciplinar."
skos_scopeNote: "Escuela Genérica NO es UNA Escuela específica UDFJC — es construcción abstracta para análisis. Cualquier Escuela real (Física, Ingeniería de Sistemas, Educación, etc.) instancia la Escuela Genérica con particularidades disciplinares propias. NO confundir con `con-escuela` (M00, definición jurídica)."
skos_example: "Análisis JTBD Estudiante Soberano de Física: comienza con perfil genérico (Escuela Genérica) + se particulariza con dominio Física (currículo cuántica, laboratorios espectroscopía, semilleros con Observatorio Astronómico, prácticas con Planetario Distrital)."
skos_notation: "Escuela Genérica UDFJC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Construcción abstracta de unidad académica para análisis transversal"
iso_differentia: "Aplicable a cualquier campo disciplinar; ~25 docentes + ~600-1.200 estudiantes + 2-4 CABAs; instanciable en Escuelas reales; unidad de análisis cap-MI12"
iso_subject_field: "Methodology / Higher education analysis / Generic models"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M04 §1.3 — elaboración propia"

pasteur_quadrant: PASTEUR



# ═══════════════════════════════════════════════════════════════════════════
#  Facet SCHEMA — Capa 2 del patrón Type → Schema → Instance
# ═══════════════════════════════════════════════════════════════════════════





cited_in: ["[[sec-MI12-04--jtbd-comunidad]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - escuela-generica
  - propietario-udfjc
  - patron-capa-2-schema
  - schema-instanciacion
  - m04-corpus
  - audit-v2-3
---


# Escuela Genérica UDFJC

## Definición operativa

Construcción abstracta que representa una Escuela tipo post-reforma, aplicable a cualquier campo disciplinar.

## Características invariantes

| Dimensión | Valor típico |
|---|---|
| Docentes | ~25 (5 roles JTBD) |
| Estudiantes | ~600-1.200 |
| CABAs activas | 2-4 |
| Campo conocimiento-saber | 1 (Art. 59) |
| Presupuesto | Art. 88-90 |

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §04 · JTBD de la Comunidad UDFJC. *Capítulo MI-12* §1.3. UDFJC.

## Lenguaje ubicuo asociado

Escuela Genérica · Unidad de análisis · Instanciación · Particularización disciplinar.

## Notas de aplicación

- **Conexión M04 §1.3**: alcance del paper.
- **NO confundir** con Escuelas reales ni con `con-escuela` (definición jurídica).

## Patrón Type → Schema → Instance (v1.1.0 · 2026-04-27)

Este concepto es la **Capa 2 (Schema)** de un patrón 3-capas que materializa el mandato Art. 105 ACU-004-25:

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TB
    C1["Capa 1 · Type jurídico abstracto<br/>[[con-escuela]] · Arts. 69-72"]:::c1
    C2["Capa 2 · Schema metodológico<br/>[[con-escuela-generica-udfjc]] · este archivo"]:::c2
    C3["Capa 3 · Instances mandatorias<br/>7 escuelas Art. 105 (4 CB + 3 CS)"]:::c3
    F["[[con-escuela-fisica]]<br/>★ piloto"]:::piloto
    P["6 escuelas restantes<br/>(placeholders)"]:::pendiente

    C1 -->|inherits jurídico| C2
    C2 -->|generates schema| C3
    C3 --> F
    C3 -.-> P

    classDef c1 fill:#0891b2,color:#fff,stroke:#155e75,stroke-width:3px
    classDef c2 fill:#7c3aed,color:#fff,stroke:#5b21b6,stroke-width:3px
    classDef c3 fill:#10b981,color:#fff,stroke:#047857,stroke-width:3px
    classDef piloto fill:#a78bfa,color:#fff,stroke:#7c3aed,stroke-width:3px
    classDef pendiente fill:#6b7280,color:#fff,stroke:#374151,stroke-dasharray: 5 5
```

### Especificación del schema

Toda instancia (`con-escuela-{nombre}`) debe:

1. Declarar `concepto_capabilities: [NORMATIVE, NEON, DDD, SCENARIO, INSTANCE]`.
2. Apuntar `concepto_instance_of: "[[con-escuela-generica-udfjc]]"` y `concepto_instance_of_type: "[[con-escuela]]"`.
3. Particularizar `concepto_instance_specifics` con: campo conocimiento-saber, ámbito disciplinar (CB/CS), vicerrectoría (siempre Formación), facultad de articulación, CABAs proyectadas, fechas meta de creación.
4. Modelar transición S0→S5 con `concepto_facet_scenario.bindings[]` referenciando `[[con-framework-86-indicadores-s0-s5]]`.
5. Establecer adoption_chain con: ACU-004-25 Art. 69-72 (jurídico) + Art. 105 (mandato) + Acuerdo CSU específico de creación (cuando se expida).

Ver el piloto [[con-escuela-fisica]] para template completo.
