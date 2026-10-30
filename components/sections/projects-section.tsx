import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa6"
import { portfolioContent } from "@/data/content"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/sections/section-heading"

export function ProjectsSection() {
  const { projects } = portfolioContent

  return (
    <section id="projects" className="page-section projects-section" aria-labelledby="projects-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
          id="projects-heading"
        />
        <div className="projects-grid">
          {projects.items.map((project) => (
            <Card className="project-card" key={project.title} data-reveal>
              <div className="project-image-wrap">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 50vw, 92vw"
                  className="project-image"
                />
              </div>
              <CardHeader className="project-card-header">
                <p className="project-category">{project.category}</p>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="project-card-content">
                <CardDescription>{project.description}</CardDescription>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <Badge variant="outline" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="project-actions">
                {project.links.map((link) => {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={`${link.label}: ${project.title}`}
                    >
                      {link.label}
                      {link.icon === "github" ? (
                        <FaGithub aria-hidden="true" data-icon="inline-end" />
                      ) : (
                        <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                      )}
                    </a>
                  )
                })}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
