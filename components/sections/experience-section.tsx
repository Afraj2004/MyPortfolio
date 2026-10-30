import { Briefcase } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/sections/section-heading"

export function ExperienceSection() {
  const { experience } = portfolioContent

  return (
    <section id="experience" className="page-section experience-section" aria-labelledby="experience-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow={experience.eyebrow}
          title={experience.title}
          description={experience.description}
          id="experience-heading"
        />
        <ol className="experience-timeline">
          {experience.roles.map((role) => (
            <li className="timeline-item" key={`${role.title}-${role.company}`} data-reveal>
              <span className="timeline-marker" aria-hidden="true">
                <Briefcase />
              </span>
              <Card className="experience-card">
                <CardHeader className="experience-card-header">
                  <p className="experience-dates">{role.dates}</p>
                  <CardTitle>{role.title}</CardTitle>
                  <CardDescription className="experience-company">
                    {role.company} <span aria-hidden="true">·</span> {role.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="experience-bullets">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
