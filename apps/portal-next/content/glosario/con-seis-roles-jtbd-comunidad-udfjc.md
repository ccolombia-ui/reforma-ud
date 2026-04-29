---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:seis-roles-jtbd-comunidad-udfjc
kd_title: "6 Roles JTBD Comunidad UDFJC (Estudiante Soberano + 5 docentes especializados)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "6 Roles JTBD Comunidad UDFJC"

skos_prefLabel: "6 Roles JTBD Comunidad UDFJC (1 estudiante + 5 docentes)"
skos_altLabel: ["6 roles docentes", "6 roles JTBD UDFJC", "Roles canónicos M04"]
skos_definition: "Tipología canónica de **seis roles institucionales** propuesta en M04 §3 (Madera Sepúlveda 2026) para análisis JTBD (Jobs To Be Done) de la Comunidad UDFJC. Los 6 roles son: (1) **🎓 Estudiante Soberano** — aprender con agenda propia para transformar territorio (deriva de Art. 5g Soberanía Cognitiva + OECD student agency); (2) **🎨 Docente Diseñador** — diseñar experiencias de aprendizaje articuladas a investigación y extensión; (3) **🎤 Docente Facilitador** (también llamado Formador) — facilitar aprendizaje activo con espacios de descubrimiento; (4) **🔬 Docente Pasteur** (Investigador) — investigar problemas del territorio con rigor académico (Cuadrante Pasteur); (5) **🤝 Docente Coop** (Emprendedor / Coop) — articular cooperación universidad-territorio en proyectos transformativos (PM3); (6) **🏛️ Docente Director** — gobernar unidad académica con evidencia hacia ΩMT. Los 5 docentes corresponden a una **desagregación analítica** del estamento docente del Art. 8-17 ACU-004-25 (Comunidad Universitaria) — NO son cargos administrativos sino roles JTBD que un docente puede asumir según contexto. Aplicado al M03+M04: cada estándar internacional (M03) se mapea a roles JTBD específicos para identificar qué rol-palanca activa qué estándar."
skos_scopeNote: "Los 6 roles JTBD NO son sustitutos del estamento docente formal del ACU-004-25 (que es categorización jurídico-política). Son **desagregación analítica** del docente único en 5 perfiles JTBD + el Estudiante Soberano. Un docente puede asumir múltiples roles según contexto."
skos_example: "Una docente UDFJC en CABA bioeconomía territorial: rol Diseñadora cuando construye Paquetes CCA; rol Investigadora Pasteur cuando dirige proyecto con JACs; rol Coop cuando negocia convenio con Alcaldía; rol Directora cuando coordina la CABA. NO son 4 personas — son 4 modos JTBD del mismo docente."
skos_notation: "6 Roles JTBD UDFJC"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Tipología canónica de roles institucionales para análisis JTBD"
iso_differentia: "6 roles (1 estudiante + 5 docentes especializados); desagregación analítica del estamento docente; mapeo a estándares internacionales M03"
iso_subject_field: "Higher education / JTBD analysis / Role-based design / Curriculum design"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M04 §3 — elaboración propia + sprint BPA-003"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "seis_roles_jtbd"
  ddd_aggregate_root: "ComunidadUniversitariaUDFJC"
  ddd_bc_ref: "[[bc-roles-comunidad-udfjc]]"
  ddd_role_in_context: "Value Objects que tipifican modos de participación en la Comunidad Universitaria. Cada rol tiene: definición JTBD (functional + emotional + social), conexión con estándares M03, articulación con valores V1-V5."
  ddd_invariants:
    - "Los 6 roles son exhaustivos para análisis JTBD de la Comunidad UDFJC"
    - "Un docente puede asumir múltiples roles simultánea o secuencialmente"
    - "El Estudiante Soberano es rol único (no se desagrega)"
    - "Los 5 roles docentes son desagregación analítica del estamento docente único"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M04 §3 + JTBD Christensen + ODI Ulwick"
  neon_alignment_confidence: 0.9

applicable_domain: "Análisis JTBD UDFJC + diseño de plataforma comunitaria + mapeo de roles ↔ estándares internacionales"
assumptions:
  - "La desagregación 5 docentes + 1 estudiante captura los modos JTBD principales"
breaks_at:
  - "Si se confunde con cargos administrativos formales"
  - "Si se aplica como categorización rígida (un docente = un rol fijo)"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-roles-deriva-jtbd
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-jtbd-christensen]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los 6 roles aplican el marco JTBD (Christensen) a la Comunidad UDFJC: cada rol tiene jobs functional + emotional + social específicos."
  - rel_id: rel-roles-aplica-odi
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-odi-ulwick]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "ODI (Ulwick) provee la metodología cuantitativa de outcome statements para cada rol — convergente con el análisis JTBD."
  - rel_id: rel-roles-desagrega-comunidad
    rel_nombre: skos_narrower
    rel_direccion: post
    rel_target: "[[con-comunidad-universitaria]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Los 6 roles JTBD son desagregación analítica de la Comunidad Universitaria (Arts. 8-17 ACU-004-25): 1 rol estudiante + 5 roles docentes especializados."
  - rel_id: rel-roles-encarna-valores
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-valores-culturales-v1-v5]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Cada rol JTBD tiene arquetipos diferenciados en los 5 V culturales — el Estudiante Soberano se diagnostica diferente al Docente Director en V1 (Soberanía) y V3 (Participación)."
  - rel_id: rel-roles-mapea-estandares
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-abet-acreditacion]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "M03 §3.2 establece matriz 6 roles × 8 estándares (incluido ABET): cada rol-palanca activa estándares específicos en su dominio de actuación."
  - rel_id: rel-estudiante-soberano-art5g
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Estudiante Soberano (rol 1) deriva conceptualmente del Art. 5g Soberanía Cognitiva refundacional + OECD Learning Compass student agency."
  - rel_id: rel-investigador-pasteur
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-cuadrante-pasteur-stokes]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Docente Pasteur (rol 4) opera específicamente en el Cuadrante Pasteur — investigación uso-inspirada con territorio."

cited_in: ["[[sec-MI12-03--estandares-internacionales]]", "[[sec-MI12-04--jtbd-comunidad]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - seis-roles-jtbd
  - comunidad-udfjc
  - propietario-udfjc
  - m04-corpus
  - audit-v2-2
---


# 6 Roles JTBD Comunidad UDFJC

## Definición operativa

| # | Rol | Símbolo | Core Job |
|:-:|---|:-:|---|
| **1** | Estudiante Soberano | 🎓 | Aprender con agenda propia para transformar territorio |
| **2** | Docente Diseñador | 🎨 | Diseñar experiencias articuladas a investigación-extensión |
| **3** | Docente Facilitador | 🎤 | Facilitar aprendizaje activo con descubrimiento |
| **4** | Docente Pasteur | 🔬 | Investigar problemas del territorio con rigor académico |
| **5** | Docente Coop | 🤝 | Articular cooperación universidad-territorio |
| **6** | Docente Director | 🏛️ | Gobernar unidad con evidencia hacia ΩMT |

> Los 5 roles docentes son **desagregación analítica** del estamento docente único — NO son cargos.

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §04 · JTBD de la Comunidad UDFJC. *Capítulo MI-12* §3. UDFJC.

## Lenguaje ubicuo asociado

6 roles JTBD · Estudiante Soberano · Docente Diseñador/Facilitador/Pasteur/Coop/Director · Rol-palanca.

## Notas de aplicación

- **Conexión M04 §3**: tipología canónica del paper.
- **Conexión M03 §3.2**: matriz 6 roles × 8 estándares.
- **Conexión M00 Comunidad Universitaria**: desagregación, no sustitución.
