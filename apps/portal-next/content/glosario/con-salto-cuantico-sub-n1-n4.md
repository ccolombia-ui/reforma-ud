---
kd_id: urn:aleia:udfjc:reforma:cap-mi12:con:salto-cuantico-sub-n1-n4
kd_title: "Salto Cuántico Sub-N1 → N4 (transición vía nichos protegidos sin pasar por escalones intermedios)"
kd_type: glosario-universal
kd_status: APPROVED
kd_version: v1.0.0

tupla_tipo: DEFINITION
tupla_concepto: "Salto Cuántico Sub-N1 → N4 vía Nichos Protegidos"

skos_prefLabel: "Salto Cuántico Sub-N1 → N4 (transición no-lineal vía nichos)"
skos_altLabel: ["Salto cuántico universitario", "Reconfiguración vía nichos", "Sub-N1 to N4 leap", "Quantum leap institucional"]
skos_definition: "Estrategia de transición institucional propuesta en M02 §4.4.2 (Madera Sepúlveda 2026) que evita la ruta lineal Sub-N1 → N1 → N2 → N3 → N4 (que tomaría generaciones y casi siempre fracasa) mediante la activación simultánea de **nichos transformativos** (CABAs, escuelas piloto) que saltan directamente a N4 en su dominio específico, mientras el resto de la institución permanece en Sub-N1. Inspirado en el patrón **Reconfiguración (P3)** de Geels & Schot 2007: los nichos protegidos coexisten con el régimen dominante hasta que demuestran viabilidad N4 en escala reducida; entonces el régimen incorpora elementos del nicho (Reconfiguración) sin colapso institucional. La estrategia exige tres condiciones simultáneas: (i) **diagnóstico Sub-N1 honesto** (no aplicar modelos N4 a condiciones Sub-N1 sin diagnóstico); (ii) **activación de CABAs como nichos protegidos** con autonomía curricular, presupuesto propio, autorización para créditos UROP; (iii) **demostración de N4 en escala reducida** + irradiación gradual al resto de la institución mediante mecanismos de Reconfiguración."
skos_scopeNote: "El salto cuántico NO es 'milagro' ni 'big bang' institucional — es una estrategia disciplinada que combina diagnóstico realista (Sub-N1) + nichos protegidos (CABAs) + escalamiento gradual. Su éxito depende de mecanismos de protección de nicho explícitos (autonomía curricular, presupuesto independiente). Sin protección formal, los nichos son absorbidos y domesticados por el régimen."
skos_example: "Aplicado a UDFJC 2025-2034: en lugar de reformar las 9 Escuelas linealmente (Sub-N1 → N1 → ... → N4 en 20 años), se activan 3-5 CABAs piloto que saltan directamente a N4 en bioeconomía/territorio/educación digital (5 años); luego se irradia el modelo CABA al resto de Escuelas mediante el patrón Reconfiguración (5 años más)."
skos_notation: "Salto Cuántico Sub-N1→N4"

iso_designation_type: term
iso_definition_type: extensional
iso_genus: "Estrategia de transición institucional no-lineal vía nichos protegidos"
iso_differentia: "Salto Sub-N1 → N4 sin escalones intermedios; vía CABAs como nichos transformativos; basado en patrón Reconfiguración Geels-Schot 2007; aplicable a IES públicas en condición sub-departamental"
iso_subject_field: "Reforma universitaria / Sustainability transitions / Diseño organizacional"
iso_term_status: preferred
iso_standardized_by: "Madera Sepúlveda (2026) M02 §4.4.2 — derivación propia sobre Geels & Schot 2007 + Clark 1998"

pasteur_quadrant: PASTEUR

concepto_capabilities:
  - NEON
  - DDD

concepto_facet_ddd:
  ddd_id: "salto_cuantico_sub_n1_n4"
  ddd_aggregate_root: "TransicionInstitucionalUDFJC"
  ddd_bc_ref: "[[bc-arquitectura-misional-udfjc]]"
  ddd_role_in_context: "Domain Service que orquesta la transición Sub-N1 → N4. Coordina los Aggregates CABA (nichos), Régimen (universidad-departamento) y Paisaje (ACU-004-25). Implementa el patrón Reconfiguración (Geels & Schot 2007)."
  ddd_invariants:
    - "El salto exige diagnóstico Sub-N1 honesto previo (no aplicar N4 sin diagnóstico)"
    - "Las CABAs deben tener mecanismos formales de protección (autonomía + presupuesto + créditos)"
    - "La irradiación es GRADUAL (Reconfiguración), no big bang (Sustitución)"
    - "El régimen sub-N1 dominante coexiste durante la transición"
  ddd_ubiquitous_terms:
    - "Salto cuántico"
    - "Diagnóstico Sub-N1 honesto"
    - "Nicho protegido"
    - "Reconfiguración Geels-Schot"
    - "Coexistencia régimen-nicho"
    - "Irradiación gradual"

concepto_facet_neon:
  neon_scenario: S5
  neon_alignment_strategy: DERIVED_FROM
  neon_reuse_source: "Madera Sepúlveda 2026 M02 §4.4.2 — derivación sobre Geels & Schot 2007 (Reconfiguración) + Clark 1998 (5 vías simultáneas)"
  neon_alignment_confidence: 0.8

applicable_domain: "Reforma UDFJC 2025-2034 + cualquier IES en condición Sub-N1 que planifique transición sistémica"
assumptions:
  - "Las IES en condición Sub-N1 NO pueden reformarse linealmente en plazos razonables"
  - "Los nichos protegidos pueden saltar directamente a N4 en su dominio específico"
  - "El régimen sub-N1 puede coexistir con nichos N4 sin colapsar (período de transición)"
breaks_at:
  - "Si los nichos no tienen protección formal (son absorbidos por régimen)"
  - "Si se aplica como big bang/Sustitución (genera resistencia paralizante RT6)"
  - "Si se omite el diagnóstico Sub-N1 honesto previo"

valid_from: "2026-04-27"
concepto_anchor_chain_status: LINEAR


tupla__relations:
  - rel_id: rel-salto-aplica-taxonomia
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-taxonomia-sub-n1-n4]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El salto cuántico opera sobre la taxonomía Sub-N1 → N4 desarrollada en M05 BMK-001. Sin la taxonomía, no hay diagnóstico honesto del estadio actual."
  - rel_id: rel-salto-derivado-mlp
    rel_nombre: norm_implements
    rel_direccion: pre
    rel_target: "[[con-mlp-geels]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El salto cuántico es la aplicación específica del patrón Reconfiguración (P3 de Geels & Schot 2007) al contexto UDFJC: nichos protegidos (CABAs) reconfiguran el régimen sin colapso."
  - rel_id: rel-salto-vehiculo-caba
    rel_nombre: skos_related
    rel_direccion: post
    rel_target: "[[con-caba]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "Las CABAs (Art. 73 ACU-004-25) son el vehículo institucional del salto cuántico — los nichos protegidos que saltan directamente a N4 en su dominio."
  - rel_id: rel-salto-protegido-acu
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-acu-004-25]]"
    rel_frame: normativo
    rel_propiedades:
      skos_evidence: "El ACU-004-25 provee la perturbación de paisaje + el marco legal de protección que las CABAs requieren para saltar Sub-N1 → N4 sin ser absorbidas por el régimen."
  - rel_id: rel-salto-mitiga-rt
    rel_nombre: skos_related
    rel_direccion: pre
    rel_target: "[[con-riesgos-rt1-rt6]]"
    rel_frame: skos
    rel_propiedades:
      skos_evidence: "El salto cuántico es la estrategia que mitiga RT1 (fragmentación) y RT6 (resistencia al cambio) — al activar nichos puntuales en lugar de big bang, reduce resistencia paralizante."

cited_in: ["[[sec-MI12-02--ciclo-virtuoso]]", "[[sec-MI12-05--bmk-procesos-misionales]]", "[[sec-MI12-12--meta-paper-integrador]]"]
cited_count: 3

tags:
  - glosario-universal
  - concepto-meta-instrumental
  - t4-operativo-institucional
  - salto-cuantico
  - sub-n1-n4
  - propietario-udfjc
  - m02-corpus
  - audit-v2-2
---


# Salto Cuántico Sub-N1 → N4 vía Nichos Protegidos

## Definición operativa

Estrategia de transición institucional **no-lineal** que evita la ruta lineal Sub-N1 → N1 → N2 → N3 → N4 (generaciones, alto fracaso) mediante activación simultánea de nichos protegidos que saltan directamente a N4.

## Comparación: lineal vs cuántico

| Estrategia | Tiempo | Riesgo | Mecanismo |
|---|:-:|:-:|---|
| **Lineal** Sub-N1 → N1 → N2 → N3 → N4 | 20-30 años | 🔴 Alto fracaso | Reforma incremental |
| **Cuántico** Sub-N1 → N4 vía nichos | 5-10 años | 🟡 Riesgo medio | Reconfiguración (Geels-Schot P3) |

## Tres condiciones simultáneas

1. **Diagnóstico Sub-N1 honesto previo** — no aplicar modelos N4 a condiciones Sub-N1 sin diagnóstico.
2. **CABAs como nichos protegidos** — autonomía curricular + presupuesto propio + autorización créditos UROP.
3. **Demostración + irradiación gradual** — N4 en escala reducida → escalamiento Reconfiguración → resto institución.

## Fuente primaria

> Madera Sepúlveda, C. C. (2026). §02 · Ciclo Virtuoso ΩMT. *Capítulo MI-12* §4.4.2. UDFJC. — derivación sobre Geels & Schot (2007) Patrón P3 Reconfiguración + Clark (1998) cinco vías simultáneas.

## Invariantes operativas DDD

1. El salto exige **diagnóstico Sub-N1 honesto previo**.
2. Las CABAs deben tener **mecanismos formales de protección**.
3. La irradiación es **gradual** (Reconfiguración), no big bang (Sustitución).
4. El régimen sub-N1 **coexiste** durante la transición.

## Lenguaje ubicuo asociado

Salto cuántico · Diagnóstico Sub-N1 honesto · Nicho protegido · Reconfiguración Geels-Schot · Coexistencia régimen-nicho · Irradiación gradual.

## Notas de aplicación

- **Conexión M02 §4.4.2**: estrategia operativa central del modelo ΩMT.
- **Conexión M05 BMK-001**: la taxonomía Sub-N1 → N4 es el insumo del diagnóstico previo.
- **Riesgo crítico**: si las CABAs no tienen protección formal (autonomía + presupuesto + créditos), son absorbidas y el salto fracasa.
- **NO confundir con big bang**: el salto cuántico es estratégico-disciplinado, no milagroso.
