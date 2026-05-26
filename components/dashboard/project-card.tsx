'use client'

import Link from 'next/link'
import { Users, LayoutGrid, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/lib/types'
import type { Role } from '@/hooks/use-role'

interface ProjectCardProps {
  project: Project
  role: Role
}

export function ProjectCard({ project, role }: ProjectCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* borda colorida lateral */}
      <div
        className="absolute inset-y-0 left-0 w-1 rounded-l-lg"
        style={{ backgroundColor: project.color }}
      />

      <CardHeader className="pl-5 pb-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* dot de cor */}
            <span
              className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="truncate font-semibold text-sm leading-tight">
              {project.name}
            </h3>
          </div>
          <Link href={`/projects/${project.id}`} tabIndex={-1}>
            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="pl-5 pb-4 flex flex-col gap-3">
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

        <Link
          href={`/projects/${project.id}`}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Ver projeto
          <ArrowRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  )
}
