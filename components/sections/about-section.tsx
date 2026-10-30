import { Award, UsersRound } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/sections/section-heading"

const achievementIcons = [Award, UsersRound]

export function AboutSection() {
  const { about, socials } = portfolioContent

  return (
    <section id="about" className="page-section about-section" aria-labelledby="about-heading">
      <div className="section-container">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} id="about-heading" />
        <div className="about-copy" data-reveal>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a href={socials.email.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
            {about.emailLabel}
          </a>
        </div>

        <div className="achievement-area" data-reveal>
          <h3 className="achievement-heading">{about.achievementsTitle}</h3>
          <div className="achievement-grid">
            {about.achievements.map((achievement, index) => {
              const Icon = achievementIcons[index]
              return (
                <Card className="achievement-card" key={achievement.title}>
                  <CardContent className="achievement-content">
                    <span className="achievement-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
