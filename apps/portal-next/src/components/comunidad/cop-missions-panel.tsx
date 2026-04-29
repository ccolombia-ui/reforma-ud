'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trophy } from 'lucide-react';
import { getReadingState } from '@/lib/reading-state';
import { calcAllMissions } from '@/lib/mission-state';
import { getCompletedCoPMissions, calcUserCoPLevel, getCoPLevelName } from '@/lib/cop-access';
import { CoPMissionCard, calcMisionCoPStatus, type MisionCoP } from './cop-mission-card';
import { Badge } from '@/components/ui/badge';

type RolDef = { nivel: number; nombre: string; emoji?: string };

type Props = {
  misionesCoP: MisionCoP[];
  comunidadSlug: string;
  comunidadHref: string;
  roles: RolDef[];
};

export function CoPMissionsPanel({ misionesCoP, comunidadSlug, comunidadHref, roles }: Props) {
  const [earnedCCAs, setEarnedCCAs] = useState<string[]>([]);
  const [completedMisionIds, setCompletedMisionIds] = useState<string[]>([]);

  // Lee estado de localStorage y actualiza en cambios
  useEffect(() => {
    function sync() {
      const rs = getReadingState();
      const missions = calcAllMissions(rs);
      setEarnedCCAs(missions.filter((m) => m.hasCCA).map((m) => m.paperId));
      setCompletedMisionIds(getCompletedCoPMissions(comunidadSlug));
    }
    sync();
    window.addEventListener('reading-state-change', sync);
    window.addEventListener('cop-mission-completed', sync);
    return () => {
      window.removeEventListener('reading-state-change', sync);
      window.removeEventListener('cop-mission-completed', sync);
    };
  }, [comunidadSlug]);

  const userLevel = useMemo(
    () => calcUserCoPLevel(roles, misionesCoP, earnedCCAs, completedMisionIds),
    [roles, misionesCoP, earnedCCAs, completedMisionIds],
  );

  const levelName = getCoPLevelName(roles, userLevel);
  const currentRole = roles.find((r) => r.nivel === userLevel);

  const sorted = useMemo(
    () => [...misionesCoP].sort((a, b) => a.orden - b.orden),
    [misionesCoP],
  );

  return (
    <section id="misiones-cop" className="scroll-mt-32">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Misiones de esta comunidad</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Completa las misiones para subir de nivel en esta CoP.
          </p>
        </div>
        {userLevel > 0 && (
          <Badge variant="outline" className="gap-1.5 text-sm py-1 px-3">
            <Trophy className="h-3.5 w-3.5 text-yellow-500" />
            {currentRole?.emoji} {levelName}
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((m) => (
          <CoPMissionCard
            key={m.id}
            mision={m}
            status={calcMisionCoPStatus({ mision: m, userLevel, earnedCCAs, completedMisionIds })}
            comunidadHref={comunidadHref}
          />
        ))}
      </div>
    </section>
  );
}
