import React from 'react'

interface ProjectGridProps {
  children: React.ReactNode
}

const ProjectGrid = ({children}: ProjectGridProps) => {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>
}

export default ProjectGrid
