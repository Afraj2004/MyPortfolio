import { ArrowUpRight, Mail } from "lucide-react"
import { FaGithub, FaLinkedinIn } from "react-icons/fa6"
import { portfolioContent, type SocialKey } from "@/data/content"
import { buttonVariants } from "@/components/ui/button"

function SocialIcon({ socialKey }: { socialKey: SocialKey }) {
  if (socialKey === "linkedin") return <FaLinkedinIn aria-hidden="true" />
  if (socialKey === "github") return <FaGithub aria-hidden="true" />
  return <Mail aria-hidden="true" />
}

export function HeroSocialLinks() {
  return (
    <div className="hero-socials" role="group" aria-label={portfolioContent.accessibility.heroSocials}>
      {portfolioContent.hero.socials.map((key) => {
        const link = portfolioContent.socials[key]
        return (
          <a
            key={key}
            href={link.href}
            className={buttonVariants({ variant: "outline", size: "icon" })}
            aria-label={link.label}
            title={link.label}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <SocialIcon socialKey={key} />
          </a>
        )
      })}
    </div>
  )
}

export function ContactSocialLinks() {
  return (
    <div className="contact-links" role="group" aria-label={portfolioContent.accessibility.contactSocials}>
      {portfolioContent.contact.socials.map((key) => {
        const link = portfolioContent.socials[key]
        return (
          <a
            className="contact-link"
            key={key}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
          >
            <SocialIcon socialKey={key} />
            <span>{link.label}</span>
            {link.external ? <ArrowUpRight aria-hidden="true" className="contact-link-arrow" /> : null}
          </a>
        )
      })}
    </div>
  )
}
