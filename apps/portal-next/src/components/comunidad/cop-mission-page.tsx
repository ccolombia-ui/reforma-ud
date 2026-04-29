import Link from 'next/link';
import { ChevronLeft, BookOpen, Scale, Hammer, Lock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import type { MisionCoP } from './cop-mission-card';

type Paper = { id: string; title: string; description: string; href: string };
type Community = { slug: string; shortName?: string; name: string; href: string };

const TIPO_META = {
  comprension: {
    label: 'Misión de Comprensión',
    icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-500/10 text-blue-700 border-blue-200',
    description: 'Lee los documentos vinculados y demuestra tu comprensión para completar esta misión.',
  },
  deliberacion: {
    label: 'Misión de Deliberación',
    icon: <Scale className="h-5 w-5 text-orange-500" />,
    color: 'bg-orange-500/10 text-orange-700 border-orange-200',
    description: 'Revisa el documento, aporta comentarios sustantivos y registra tu participación.',
  },
  produccion: {
    label: 'Misión de Producción',
    icon: <Hammer className="h-5 w-5 text-green-500" />,
    color: 'bg-green-500/10 text-green-700 border-green-200',
    description: 'Co-crea el artefacto institucional junto con los demás miembros de la comunidad.',
  },
};

type Props = {
  mision: MisionCoP;
  comunidad: Community;
  papers: Paper[];
};

export function CoPMissionPage({ mision, comunidad, papers }: Props) {
  const tipo = TIPO_META[mision.tipo];
  const comunidadName = comunidad.shortName ?? comunidad.name;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Inicio</Link>
        <span>/</span>
        <Link href="/comunidades" className="hover:text-foreground">Comunidades</Link>
        <span>/</span>
        <Link href={comunidad.href} className="hover:text-foreground">{comunidadName}</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px]">{mision.titulo}</span>
      </nav>

      {/* Hero */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
            {mision.id}
          </span>
          <Badge variant="outline" className={`gap-1.5 ${tipo.color}`}>
            {tipo.icon}
            {tipo.label}
          </Badge>
          {mision.estatuto && (
            <Badge variant="secondary">{mision.estatuto}</Badge>
          )}
        </div>

        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {mision.titulo}
        </h1>

        {mision.descripcion && (
          <p className="text-muted-foreground leading-relaxed">{mision.descripcion}</p>
        )}

        <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg px-4 py-3 border">
          {tipo.description}
        </p>
      </header>

      <Separator />

      {/* Documentos fuente */}
      {papers.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-semibold">
            {mision.tipo === 'comprension' ? 'Lee primero estos documentos' : 'Documentos de referencia'}
          </h2>
          <div className="grid gap-3">
            {papers.map((p) => (
              <Card key={p.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="font-mono text-xs text-muted-foreground uppercase">{p.id}</span>
                    <p className="font-medium text-sm mt-0.5 truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{p.description}</p>
                  </div>
                  <Link
                    href={p.href}
                    className="shrink-0 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Leer <ArrowRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Prerequisitos */}
      {(mision.prerequisitosCanonicas.length > 0 || mision.prerequisitosMision.length > 0) && (
        <section className="space-y-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Prerequisitos
          </h2>
          {mision.prerequisitosCanonicas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Investigaciones canónicas:</span>
              {mision.prerequisitosCanonicas.map((p) => (
                <span key={p} className="font-mono text-xs bg-muted px-2 py-0.5 rounded uppercase">
                  {p}
                </span>
              ))}
            </div>
          )}
          {mision.prerequisitosMision.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Misiones previas:</span>
              {mision.prerequisitosMision.map((id) => (
                <span key={id} className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {id}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Nivel */}
      <section className="rounded-lg border p-4 flex items-center justify-between gap-4 bg-muted/30">
        <div className="text-sm text-muted-foreground">
          Nivel requerido: <strong>N{mision.nivelRequerido}</strong> en {comunidadName}
        </div>
        {mision.nivelOtorga && (
          <div className="text-sm font-medium text-primary">
            Al completar: N{mision.nivelOtorga}
          </div>
        )}
      </section>

      {/* Back */}
      <Link
        href={comunidad.href}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Volver a {comunidadName}
      </Link>
    </div>
  );
}
