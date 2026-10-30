import { ContactSocialLinks } from "@/components/social-links"
import { SectionHeading } from "@/components/sections/section-heading"
import { portfolioContent } from "@/data/content"

export function ContactSection() {
  const { contact } = portfolioContent

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="contact-panel" data-reveal>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            id="contact-heading"
            className="contact-heading"
          />
          <p className="contact-invitation">{contact.invitation}</p>
          <ContactSocialLinks />
        </div>
      </div>
    </section>
  )
}
