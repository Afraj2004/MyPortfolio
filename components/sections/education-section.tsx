import { GraduationCap } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/sections/section-heading"

export function EducationSection() {
  const { education } = portfolioContent

  return (
    <section id="education" className="page-section education-section" aria-labelledby="education-heading">
      <div className="section-container">
        <SectionHeading eyebrow={education.eyebrow} title={education.title} id="education-heading" />
        <div className="education-grid">
          {education.items.map((item) => (
            <Card className="education-card" key={item.qualification} data-reveal>
              <CardHeader className="education-card-header">
                <span className="education-icon" aria-hidden="true">
                  <GraduationCap />
                </span>
                <Badge variant="outline" className="education-dates">
                  {item.dates}
                </Badge>
              </CardHeader>
              <CardContent className="education-card-content">
                <CardTitle>{item.qualification}</CardTitle>
                <p className="education-institution">{item.institution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
