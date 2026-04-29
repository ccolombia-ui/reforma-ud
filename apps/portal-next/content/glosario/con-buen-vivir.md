---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:buen-vivir
kd_title: "Buen Vivir (principio constitutivo UDFJC, transversal en ACU-004-25)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Buen Vivir"

skos_prefLabel: "Buen Vivir"
skos_altLabel:
  - "Vivir Bien"
  - "Sumak Kawsay"
  - "Suma Qamaña"
  - "Vivir en plenitud"
  - "Good Living"
skos_definition: "Principio constitutivo y transversal de la UDFJC reformada que orienta la acción institucional hacia la educación para la vida con dignidad. Se basa en cosmovisiones andinas (Sumak Kawsay quechua, Suma Qamaña aymara) que conciben el bienestar como armonía relacional entre comunidad humana, naturaleza y espiritualidad/cultura, en oposición al modelo desarrollista basado en acumulación material. En el ACU-004-25 aparece como (a) finalidad de la educación impartida (Art. 5a 'educación para la vida con dignidad y el buen vivir'), (b) componente de la misión (Art. 4), y (c) eje del Sistema de Bienestar institucional (Arts. 88-90)."
skos_scopeNote: "Es uno de los TRES conceptos refundacionales sin precedente en el Acuerdo CSU 003/1997 (los otros son Soberanía Cognitiva y Campo del conocimiento-saber). Reorienta los fines de la educación universitaria pública hacia categorías epistémicas y éticas no occidentalistas. Conecta con tradiciones de los pueblos originarios andinos pero también con corrientes de ecología profunda y economía del bien común."
skos_example: "Un programa de extensión universitaria que co-diseñe con una comunidad rural soluciones agroecológicas alineadas con saberes locales y soberanía alimentaria materializa Buen Vivir, mientras que un programa que solo transfiera tecnología agroindustrial extractiva no lo materializa."
skos_notation: "Buen Vivir"

iso_designation_type: term
iso_definition_type: intensional
iso_genus: "Principio orientador de fines educativos institucionales"
iso_differentia: "Concibe el bienestar como armonía relacional comunidad-naturaleza-cultura, NO como acumulación material; raíz en cosmovisiones andinas (Sumak Kawsay, Suma Qamaña)"
iso_subject_field: "Filosofía de la educación / Cosmovisiones andinas / Ética institucional / Educación pública latinoamericana"
iso_term_status: preferred
iso_standardized_by: "Acuerdo CSU UDFJC 04/2025 Arts. 4, 5a, 88-90"

align_dbpedia: "http://dbpedia.org/resource/Sumak_kawsay"
align_wikidata: "https://www.wikidata.org/wiki/Q4348854"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NORMATIVE
  - NEON

concepto_facet_normative:
  origin_type: INSTITUTIONAL_BINDING
  origin_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  origin_force: BINDING
  adoption_chain:
    - adopter: "[[con-acu-004-25]]"
      adopter_locator: "ACU-004-25 Art. 5a (principio) + Art. 4 (misión) + Arts. 88-90 (Sistema de Bienestar)"
      adopter_authority_level: ESTATUTARIO
      adopted_at: "2025-05-05"
      adoption_evidence: "ACU-004-25 institucionaliza Buen Vivir como principio constitutivo refundacional · concepto NUEVO sin precedente en ACU 003/1997 · adopta cosmovisiones andinas (Sumak Kawsay quechua, Suma Qamaña aymara)"
  effective_force_in_udfjc: BINDING_DIRECT
  effective_authority_level: ESTATUTARIO

  normative_source: "[[cita-acu-004-25-csu-udfjc-2025]]"
  normative_locator: "ACU-004-25 Art. 5a + Art. 4 + Arts. 88-90"
  normative_text: "Educación para la vida con dignidad y el buen vivir (Art. 5a)"
  normative_authority_level: ESTATUTARIO
  derogated_by: ""
  derogates:
    - "Concepto NUEVO en ACU-004-25 (sin precedente en ACU 003/1997)"
  modification_type: ""
  chain_status: LINEAR
  conflicts_with: []

concepto_facet_neon:
  neon_scenario: S5
  neon_external_ontology_uri: ""
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Cosmovisiones andinas (Sumak Kawsay quechua, Suma Qamaña aymara) + Constituciones de Ecuador 2008 y Bolivia 2009 (que las incorporaron formalmente) + literatura crítica (Acosta 2013, Gudynas 2011, Huanacuni 2010) + ACU-004-25"
  neon_alignment_confidence: 0.85
  neon_methodological_notes: "Fusión S5 NeOn de tres fuentes: (a) tradiciones de los pueblos originarios andinos (no son ontologías formales sino marcos de pensamiento ancestral); (b) marco constitucional ecuatoriano-boliviano que las codificó; (c) literatura académica latinoamericana crítica. La adopción por la UDFJC es propietaria (no copia textual de constituciones sudamericanas), adaptada a contexto colombiano y a propósitos universitarios."

concepto_definitional_anchors:
  - "[[def-norm-acu-004-25-art-5a-2025-05-05]]"
concepto_current_anchor: "[[def-norm-acu-004-25-art-5a-2025-05-05]]"
concepto_anchor_chain_status: LINEAR

concepto_prerequisitos:
  - "[[con-acu-004-25]]"

applicable_domain: "Toda la acción institucional UDFJC desde 2025-05-06; criterio para evaluar coherencia de programas, proyectos, contratos y políticas con los fines refundacionales."
assumptions:
  - "La incorporación del Buen Vivir en el ACU-004-25 es operacionalizable (no solo declarativa)"
  - "Los Sistemas de Bienestar Universitario (Arts. 88-90) materializan el principio"
breaks_at:
  - "Si se interpreta como mera retórica decorativa (riesgo de uso ornamental)"
  - "Si se aplica con literalidad colonialista a tradiciones culturalmente distintas"

valid_from: "2025-05-06"
valid_to: ""
rol_seleccionado: estudiante-soberano


tupla__relations:
  - rel_id: rel-buenvivir-defined-by-acu00425
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    bc_domain: filosofia-institucional
  - rel_id: rel-buenvivir-componente-mision
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-mision-institucional-udfjc]]"
    rel_frame: skos
    bc_domain: filosofia-institucional
    rel_propiedades:
      skos_evidence: "Art. 4 cita 'buen vivir' como uno de los principios colectivos de la misión"
  - rel_id: rel-buenvivir-operacionalizado-bienestar
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-sistema-bienestar-buen-vivir]]"
    rel_frame: skos
    bc_domain: bienestar-universitario
    rel_propiedades:
      skos_evidence: "Arts. 88-90 crean el Sistema de Bienestar y Buen Vivir como operacionalización institucional"
  - rel_id: rel-buenvivir-related-soberania-cognitiva
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-soberania-cognitiva]]"
    rel_frame: skos
    bc_domain: filosofia-institucional
    rel_propiedades:
      skos_strength: 0.9
      skos_evidence: "Ambos son principios refundacionales sin precedente en Acuerdo 003/1997; mutuamente reforzantes"

cited_in: ["[[sec-MI12-00--carta-constitucional-acu-004-25]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 2

tags:
  - glosario-universal
  - concepto-normativo
  - t1-normativo
  - refundacional
  - buen-vivir
  - sumak-kawsay
  - art-5a
  - m00-base
  - concepto-nuevo
  - audit-v2-2
  - tpl-v2
---


# Buen Vivir (principio constitutivo UDFJC)

> [!important]+ 🌱 Concepto refundacional sin precedente
> El Buen Vivir es uno de los **tres conceptos refundacionales sin precedente** en el Acuerdo CSU 003/1997 (junto con Soberanía Cognitiva y Campo del conocimiento-saber). Su incorporación al ACU-004-25 reorienta los fines de la educación universitaria pública UDFJC hacia categorías epistémicas y éticas no occidentalistas, conectando con tradiciones de los pueblos originarios andinos.

## Definición operativa

Principio constitutivo y transversal de la UDFJC reformada que orienta la acción institucional hacia la **educación para la vida con dignidad**. Se basa en cosmovisiones andinas (**Sumak Kawsay** quechua, **Suma Qamaña** aymara) que conciben el bienestar como **armonía relacional entre comunidad humana, naturaleza y espiritualidad/cultura**, en oposición al modelo desarrollista basado en acumulación material y crecimiento ilimitado.

En el ACU-004-25 aparece como (a) finalidad de la educación impartida (Art. 5a: *educación para la vida con dignidad y el buen vivir*), (b) componente explícito de la misión institucional (Art. 4), y (c) eje del Sistema de Bienestar institucional (Arts. 88-90).

## Fuentes primarias (citas textuales)

> "La educación impartida por la Universidad… persigue la formación integral, la vida con dignidad y el buen vivir." — **ACU-004-25 Art. 5a** (paráfrasis del texto del principio).

> "...bajo los principios colectivos de convivencia, de paz, de equidad, de inclusión social y no discriminación, **del buen vivir** y de la defensa del medio ambiente..." — **ACU-004-25 Art. 4** (Misión).

> Sistema de Bienestar y Buen Vivir — **ACU-004-25 Arts. 88-90**.

## Genealogía conceptual (NeOn S5)

Tres fuentes fusionadas:

1. **Cosmovisiones andinas ancestrales**: Sumak Kawsay (quechua, "vida en plenitud"), Suma Qamaña (aymara, "vivir bien"). No son ontologías formales sino marcos de pensamiento de los pueblos originarios.
2. **Marco constitucional sudamericano**: Constitución de Ecuador 2008 (Art. 14, 32, 275-278 — Régimen del Buen Vivir) y Constitución de Bolivia 2009 (Art. 8 — Sistema de Vivir Bien) las incorporaron formalmente.
3. **Literatura académica latinoamericana**: Acosta (2013), Gudynas (2011), Huanacuni Mamani (2010), Walsh (2010) — desarrollos críticos.

La UDFJC adopta el principio de manera **propietaria** (no copia literal), adaptado a contexto colombiano y a propósitos universitarios.

## Lenguaje ubicuo asociado

Buen Vivir · Sumak Kawsay · Suma Qamaña · Vida con dignidad · Armonía comunidad-naturaleza-cultura · Bienestar relacional · Sistema de Bienestar y Buen Vivir.

## Notas de aplicación

- **Cuándo invocarlo**: criterios de evaluación de proyectos de extensión territorial, programas pedagógicos con enfoque diferencial, políticas de bienestar universitario, alianzas con comunidades étnicas.
- **Cuándo NO basta**: cuando el problema es estrictamente técnico-instrumental sin componente social-territorial (ej. registro calificado MEN — ahí basta Decreto 1330).
- **Riesgo lectura ornamental**: el Buen Vivir NO es retórica decorativa. Su interpretación en M02-M12 debe traducirse a indicadores verificables (BMK-001 indicadores de bienestar territorial, evaluación cualitativa de impacto comunitario en PM3).
- **Riesgo apropiación colonialista**: como principio derivado de saberes ancestrales, su uso debe respetar las comunidades portadoras y evitar literalidad descontextualizada.
