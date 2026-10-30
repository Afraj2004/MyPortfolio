import Image from "next/image"
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { buttonVariants } from "@/components/ui/button"
import { HeroSocialLinks } from "@/components/social-links"

export function HeroSection() {
  const { hero, site } = portfolioContent

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="section-container hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="hero-eyebrow">
            <span className="availability-dot" aria-hidden="true" />
            {site.role}
          </p>
          <h1 id="hero-title" className="hero-heading">
            <span className="hero-greeting">{hero.greeting}</span>
            <span className="hero-name">{hero.name}</span>
          </h1>
          <p className="hero-role">{hero.role}</p>
          <p className="hero-introduction">{hero.introduction}</p>
          <div className="hero-actions">
            <a href={hero.resumeHref} className={buttonVariants({ size: "lg" })}>
              {hero.resumeLabel}
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </a>
            <a href="#projects" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {hero.projectsLabel}
              <ArrowDown aria-hidden="true" data-icon="inline-end" />
            </a>
          </div>
          <HeroSocialLinks />
        </div>

        <div className="hero-visual" data-reveal>
          <div className="hero-portrait-frame">
            <Image
              src={hero.profileImage}
              alt={hero.profileAlt}
              fill
              priority
              sizes="(min-width: 1024px) 420px, (min-width: 768px) 38vw, 82vw"
              className="hero-portrait"
            />
          </div>
          <div className="hero-note hero-note--role">
            <span className="hero-note-marker" aria-hidden="true" />
            <div>
              <p>{hero.profileBadge}</p>
            </div>
          </div>
          <div className="hero-note hero-note--location">
            <MapPin aria-hidden="true" />
            <span>{hero.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
