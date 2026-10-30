import { ArrowUp } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { SiteHeader } from "@/components/site-header"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { EducationSection } from "@/components/sections/education-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
      </main>
      <footer className="site-footer">
        <ContactSection />
        <div className="footer-bottom section-container">
          <p>{portfolioContent.footer.copyright}</p>
          <a href="#home" className="back-to-top">
            {portfolioContent.footer.backToTop}
            <ArrowUp aria-hidden="true" data-icon="inline-end" />
          </a>
        </div>
      </footer>
      <ScrollReveal />
    </>
  )
}
