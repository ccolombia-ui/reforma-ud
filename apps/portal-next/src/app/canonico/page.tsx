import { InfografiaCanonico } from '@/components/biblioteca/infografia-canonico';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inv. Buenas Prácticas — Biblioteca reforma·ud',
  description: '12 investigaciones que sustentan la Reforma Vinculante UDFJC.',
};

/**
 * /canonico · v5.0q — index único = infografía one-pager con Kanban de papers
 * embebido. El catálogo viejo (cards CRISP-DM duplicadas) se eliminó: el
 * Kanban del componente cumple la misma función con UX más rica
 * (botones "Ir directo" + "Ventana derecha" por card).
 */
export default function CanonicoIndex() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
      <InfografiaCanonico />
    </div>
  );
}
