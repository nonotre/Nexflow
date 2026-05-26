'use client'

import { useRole } from '@/hooks/use-role'
import { ProjectCard } from '@/components/dashboard/project-card'
import { Button } from '@/components/ui/button'
import { MOCK_PROJECTS } from '@/lib/mock/dashboard'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

export default function DashboardPage() {
  const role = useRole()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Projetos</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {role === 'manager'
              ? `${MOCK_PROJECTS.length} projetos ativos na sua área`
              : 'Projetos aos quais você está atribuído'}
          </p>
        </div>
        {role === 'manager' && (
          <Button
            size="sm"
            className="gap-2 shrink-0"
            onClick={() => toast.info('Em breve — criação de projetos será liberada na próxima fase.')}
          >
            <Plus className="size-4" />
            Novo Projeto
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} role={role} />
        ))}
      </div>
    </div>
  )
}
