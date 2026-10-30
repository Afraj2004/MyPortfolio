import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("section-heading", className)} data-reveal>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <span className="section-underline" aria-hidden="true" />
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  )
}
