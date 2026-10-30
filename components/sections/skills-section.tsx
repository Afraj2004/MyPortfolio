import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/sections/section-heading"
import { portfolioContent } from "@/data/content"

export function SkillsSection() {
  const { skills } = portfolioContent

  return (
    <section id="skills" className="page-section skills-section" aria-labelledby="skills-heading">
      <div className="section-container">
        <SectionHeading eyebrow={skills.eyebrow} title={skills.title} id="skills-heading" />
        <div className="skills-grid">
          {skills.groups.map((group) => (
            <Card className="skills-card" key={group.name} data-reveal>
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
              </CardHeader>
              <CardContent className="skill-chips">
                {group.skills.map((skill) => (
                  <Badge variant="secondary" key={skill}>
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
