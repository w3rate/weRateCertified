interface FeatureCardProps {
  title: string
  text: string
  iconType: 'star' | 'zap' | 'shield'
}

export const FeatureCard = ({title, text, iconType}: FeatureCardProps) => {
  const icon = {
    star: '/emptyStar.svg',
    zap: '/lightning.svg',
    shield: '/shield.svg'
  }[iconType]

  return (
    <div className="floating-card min-w-[260px] flex-1 transform rounded-xl border border-[#fff2] bg-[#223] p-5 text-left transition-all duration-300 hover:translate-y-[-3px] hover:border-[#c4f9]">
      <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#c4f3]">
        <img src={icon} alt={title} width={24} />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-werate-text">{text}</p>
    </div>
  )
}
