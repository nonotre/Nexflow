import { notFound } from 'next/navigation'
import { KanbanBoard } from '@/components/kanban/kanban-board'
import { MOCK_PROJECTS } from '@/lib/mock/dashboard'
import { getCardsByProject } from '@/lib/mock/kanban'

type Props = { params: Promise<{ id: string }> }

export default async function ProjectPage({ params }: Props) {
  const { id } = await params

  const project = MOCK_PROJECTS.find((p) => p.id === id)
  if (!project) notFound()

  const cards = getCardsByProject(id)

  return (
    <KanbanBoard
      initialCards={cards}
      projectColor={project.color}
      projectName={project.name}
    />
  )
}

export async function generateStaticParams() {
  return MOCK_PROJECTS.map((p) => ({ id: p.id }))
}

