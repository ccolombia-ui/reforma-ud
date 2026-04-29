---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:arcu-sur
kd_title: "ARCU-SUR — Sistema de Acreditación Regional de Carreras Universitarias del MERCOSUR"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "ARCU-SUR — Sistema de Acreditación Regional MERCOSUR"
skos_prefLabel: "ARCU-SUR — Sistema de Acreditación Regional de Carreras Universitarias del MERCOSUR"
skos_altLabel: ["ARCU-SUR", "Acreditación MERCOSUR", "MERCOSUR Educativo"]
skos_definition: "Sistema regional de acreditación universitaria del MERCOSUR Educativo que certifica programas de pregrado en 7 disciplinas reconocidas: Agronomía, Arquitectura, Enfermería, Ingeniería, Medicina, Odontología y Veterinaria. Establecido formalmente en 2008 con la firma del *Acuerdo sobre la creación e implementación de un Sistema de Acreditación de Carreras Universitarias para el reconocimiento regional de la calidad académica de sus respectivas titulaciones en el MERCOSUR y Estados Asociados*. Sus criterios cubren: (i) contexto institucional, (ii) plan de estudios, (iii) docentes, (iv) estudiantes, (v) infraestructura, (vi) gestión académica. La acreditación tiene 6 años de validez y permite reconocimiento profesional intra-MERCOSUR. **Colombia NO es Estado miembro ni asociado del MERCOSUR**, por lo cual ARCU-SUR opera para UDFJC como **referente regional comparativo**, no como acreditación obtenible. Aplicado a M03: ARCU-SUR aporta vista latinoamericana complementaria a TUNING-AL (metodológico-curricular) y a la acreditación CNA nacional."
skos_scopeNote: "ARCU-SUR NO es accesible a Colombia — el país no es miembro ni asociado del MERCOSUR. Aporta valor solo como referente regional latinoamericano comparativo. NO confundir con TUNING-AL (que sí incluye Colombia)."
skos_example: "UDFJC NO puede obtener acreditación ARCU-SUR para sus programas. Sí puede usar los criterios ARCU-SUR como benchmark comparativo regional para sus programas de Ingeniería + Salud, contrastándose contra programas brasileños/argentinos acreditados ARCU-SUR."
skos_notation: "ARCU-SUR"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Sistema de acreditación regional universitaria MERCOSUR"
iso_differentia: "7 disciplinas (Agronomía + Arquitectura + Enfermería + Ingeniería + Medicina + Odontología + Veterinaria); 6 años validez; intra-MERCOSUR; 2008"
iso_subject_field: "Higher education accreditation / Regional integration / Latin American education"
iso_term_status: preferred
iso_standardized_by: "MERCOSUR Educativo (2008). *Acuerdo sobre la creación e implementación de un Sistema de Acreditación de Carreras Universitarias para el reconocimiento regional de la calidad académica de sus respectivas titulaciones en el MERCOSUR y Estados Asociados*."

pasteur_quadrant: EDISON

concepto_capabilities:
  - NEON

concepto_facet_neon:
  neon_scenario: S3
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "MERCOSUR Educativo (2008) Acuerdo ARCU-SUR"
  neon_alignment_confidence: 0.9

applicable_domain: "Benchmark comparativo regional para programas Ingeniería + Salud UDFJC"
assumptions:
  - "Aporta valor referencial aunque Colombia no sea miembro MERCOSUR"
breaks_at:
  - "Si se confunde con TUNING-AL (que sí incluye Colombia)"
  - "Si se intenta solicitar (Colombia no es elegible)"

valid_from: "2008-01-01"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-arcu-relacion-tuning
    rel_nombre: skos_related
    rel_direccion: co
    rel_target: "[[con-tuning-america-latina]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "TUNING-AL (incluye Colombia) y ARCU-SUR (excluye Colombia) son los dos referentes regionales LatAm más relevantes — complementarios."

cited_in: ["[[sec-MI12-03--estandares-internacionales]]"]
cited_count: 1

tags:
  - glosario-universal
  - concepto-academico
  - t7-referencia-internacional
  - arcu-sur
  - mercosur
  - aspirational-reference
  - benchmark-comparativo
  - m03-corpus
  - audit-v2-2
---


# ARCU-SUR · Sistema de Acreditación Regional MERCOSUR

## Definición operativa

Sistema regional de acreditación universitaria del MERCOSUR Educativo (2008). Cubre 7 disciplinas:

> Agronomía · Arquitectura · Enfermería · Ingeniería · Medicina · Odontología · Veterinaria.

## ⚠️ Colombia no es miembro MERCOSUR

ARCU-SUR opera para UDFJC como **referente regional comparativo**, no como acreditación obtenible.

## Fuente primaria

> MERCOSUR Educativo (2008). *Acuerdo sobre la creación e implementación de un Sistema de Acreditación...*

## Lenguaje ubicuo asociado

ARCU-SUR · MERCOSUR Educativo · Acreditación regional · 7 disciplinas.

## Notas de aplicación

- **Conexión M03 §4.11**: estándar regional referencial.
- **NO obtenible** por UDFJC; **comparable** sí.
