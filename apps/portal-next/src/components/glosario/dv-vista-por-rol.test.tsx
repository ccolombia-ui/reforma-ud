import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DvVistaPorRol } from './dv-vista-por-rol';

const SAMPLE_VISTAS = {
  'estudiante-soberano': {
    titulo: '🎓 Para el Estudiante Soberano',
    contenido: ['**Tu situación**: conoce tus derechos.', '**Acción**: ejercélos.'],
  },
  'docente-disenador': {
    titulo: '🎨 Para el Docente Diseñador',
    contenido: ['**Tu situación**: diseña con el Acuerdo.'],
  },
};

describe('<DvVistaPorRol>', () => {
  it('muestra vista del rol activo', () => {
    const html = renderToString(
      <DvVistaPorRol vistas={SAMPLE_VISTAS} rol="docente-disenador" />
    );
    expect(html).toContain('🎨 Para el Docente Diseñador');
    expect(html).toContain('diseña con el Acuerdo');
    expect(html).not.toContain('🎓 Para el Estudiante Soberano');
  });

  it('fallback a estudiante-soberano si rol no existe', () => {
    const html = renderToString(
      <DvVistaPorRol vistas={SAMPLE_VISTAS} rol="rol-inexistente" />
    );
    expect(html).toContain('🎓 Para el Estudiante Soberano');
  });

  it('sin rol prop → usa estudiante-soberano por defecto', () => {
    const html = renderToString(<DvVistaPorRol vistas={SAMPLE_VISTAS} />);
    expect(html).toContain('🎓 Para el Estudiante Soberano');
  });

  it('vistas vacío → mensaje informativo', () => {
    const html = renderToString(<DvVistaPorRol vistas={{}} />);
    expect(html).toContain('Vistas por rol no declaradas');
  });

  it('renderiza múltiples líneas de contenido', () => {
    const html = renderToString(
      <DvVistaPorRol vistas={SAMPLE_VISTAS} rol="estudiante-soberano" />
    );
    expect(html).toContain('conoce tus derechos');
    expect(html).toContain('ejercélos');
  });

  it('a11y: usa <h3> para el título del rol', () => {
    const html = renderToString(
      <DvVistaPorRol vistas={SAMPLE_VISTAS} rol="estudiante-soberano" />
    );
    expect(html).toContain('<h3');
  });
});
