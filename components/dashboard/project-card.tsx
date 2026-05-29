'use client'

import Link from 'next/link'
import { Users, LayoutGrid } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/lib/types'
import type { Role } from '@/hooks/use-role'

interface ProjectCardProps {
  project: Project
  role: Role
}

export function ProjectCard({ project, role }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="block group"
    >
      {/* Usamos um div manual (não Card) para controle total do border-radius + overflow */}
      <div className="rounded-lg border bg-card shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 [transform:translateZ(0)] grid grid-rows-[auto_1fr]">
        {/* Banner superior — altura auto via aspect-ratio próprio */}
        <div
          className="w-full aspect-video"
          style={{ backgroundColor: project.color ?? 'hsl(var(--muted))' }}
        />

        {/* Conteúdo inferior — 2/3 */}
        <div className="flex flex-col gap-3 p-4">
          <h3 className="truncate font-semibold text-sm leading-tight">
            {project.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1 text-xs font-normal">
              <LayoutGrid className="size-3" />
              {project.assignedCards} card{project.assignedCards !== 1 ? 's' : ''}
            </Badge>
            {role === 'manager' && (
              <Badge variant="outline" className="gap-1 text-xs font-normal">
                <Users className="size-3" />
                {project.teamSize} membro{project.teamSize !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
