export type SocialKey = "linkedin" | "github" | "email"

export const portfolioContent = {
  metadata: {
    title: "Afraj Khan — Product Analyst",
    description:
      "Afraj Khan is a Product Analyst in consumer lending, building toward Product Management in fintech and consumer technology.",
    openGraphAlt: "Afraj Khan — Product Analyst | Building toward Product Management",
  },
  accessibility: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    homeLink: "Go to Afraj Khan's home section",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    heroSocials: "Social profiles",
    contactSocials: "Contact links",
  },
  site: {
    name: "Afraj Khan",
    mark: "AK",
    role: "Product Analyst",
    navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
  },
  socials: {
    linkedin: {
      label: "LinkedIn",
      href: "https://linkedin.com/in/afraj-khan-x/",
      icon: "linkedin",
      external: true,
    },
    github: {
      label: "GitHub",
      href: "https://github.com/Afraj2004",
      icon: "github",
      external: true,
    },
    email: {
      label: "Email",
      href: "mailto:afraj12022004@gmail.com",
      icon: "mail",
      external: false,
    },
  },
  hero: {
    greeting: "Hi 👋, I'm",
    name: "Afraj Khan",
    role: "Product Analyst | Building toward Product Management",
    introduction:
      "I work on consumer funnels: finding where users drop out, tracing it to a cause, and turning the fix into a product change.",
    resumeLabel: "Resume",
    resumeHref: "#",
    projectsLabel: "Explore projects",
    profileImage: "/images/profile-placeholder.png",
    profileAlt:
      "Illustrated profile-photo placeholder, ready to replace with Afraj Khan's portrait.",
    profileBadge: "Product Analyst",
    location: "Bengaluru, India",
    socials: ["linkedin", "github"] as const,
  },
  about: {
    title: "About",
    eyebrow: "Curious about people, systems and what happens next",
    paragraphs: [
      "I'm a Product Analyst at a consumer-lending app in Bengaluru, working across product, engineering, operations and business teams. My work sits where data meets product decisions: owning funnels end to end, instrumenting user journeys, running root-cause analyses, and working with payment and lending partners to work out whether a problem is ours or theirs.",
      "Outside work, I build product prototypes to take ideas from concept to a live product. I'm now looking to move into Product Management in fintech and consumer tech.",
    ],
    emailLabel: "Drop a mail",
    achievementsTitle: "Beyond the day job",
    achievements: [
      {
        title: "Finalist, ZS Campus Beats Case Challenge",
        description: "Recognised as a finalist in a national business case competition.",
      },
      {
        title: "Overall Coordinator, LIGHT RAIPUR",
        description: "Led a student team running cross-campus outreach and technical events.",
      },
    ],
  },
  experience: {
    title: "Experience",
    eyebrow: "Working across the customer journey",
    description:
      "From onboarding and payments to collections, I turn product questions into clear next steps for the teams closest to the work.",
    roles: [
      {
        title: "Product Analyst, Product & Design",
        company: "Olyv India (UpMove Capital)",
        location: "Bengaluru",
        dates: "May 2025 to present",
        bullets: [
          "Own analytics for the eMandate step (UPI Autopay, debit card, net banking) that approved borrowers complete before loan disbursal.",
          "Attribute onboarding and payment failures to their real cause, whether internal, payment gateway, partner SLA or user, and route them to the right owner.",
          "Turn root-cause analyses into product and operations changes, such as moving pre-due-date calling from IVR to a voice bot.",
          "Build event funnels and SLA views for the field-agent mobile app across app versions.",
          "Run data-quality checks so teams act on accurate metrics.",
          "Own weekly Collections OKR reporting and support the business team on due diligence.",
        ],
      },
      {
        title: "Data Analyst Intern",
        company: "Bureau of Indian Standards (BIS)",
        location: "Raipur",
        dates: "May to July 2024",
        bullets: [
          "Analysed compliance and certification data to flag quality anomalies across regional manufacturing units, and turned field surveillance data into structured reports.",
        ],
      },
    ],
  },
  education: {
    title: "Education",
    eyebrow: "A foundation in analytical problem solving",
    items: [
      {
        qualification: "Bachelor of Technology, Chemical Engineering",
        institution: "National Institute of Technology, Raipur",
        dates: "2021 to 2025",
      },
      {
        qualification: "ISC (12th)",
        institution: "St. Dominic Savio Convent School, Lalitpur",
        dates: "2021",
      },
      {
        qualification: "ICSE (10th)",
        institution: "St. Dominic Savio Convent School, Lalitpur",
        dates: "2019",
      },
    ],
  },
  skills: {
    title: "Skills",
    eyebrow: "A toolkit for finding the story in a user journey",
    groups: [
      {
        name: "Product",
        skills: [
          "Funnel & Conversion Analysis",
          "Event Instrumentation",
          "A/B Testing",
          "SLA Tracking",
          "Root-Cause Analysis",
          "KPI Definition",
          "Metric Trees",
          "OKR Tracking",
        ],
      },
      {
        name: "Data",
        skills: ["SQL", "ClickHouse", "BigQuery", "MySQL", "Python (Basic)"],
      },
      {
        name: "Tools",
        skills: ["Tableau", "Power BI", "Grafana", "Excel", "JIRA", "Git"],
      },
    ],
  },
  projects: {
    title: "Projects",
    eyebrow: "From product questions to working prototypes",
    description: "A mix of product thinking, customer journeys and hands-on analysis.",
    items: [
      {
        title: "NipunGo",
        category: "Home-Services Marketplace · Product Prototype",
        image: "/images/nipungo-placeholder.png",
        imageAlt: "Illustrated placeholder artwork for a home-services marketplace booking experience.",
        description:
          "A two-sided marketplace connecting customers with local service workers. I owned the concept, feature scope, user flows and integrations, and built it with AI coding tools. The prototype includes customer sign-up and login, date-and-time booking, Razorpay checkout, reviews, worker onboarding with request acceptance or rejection, email notifications, an admin panel for worker verification, and a Gemini-powered chat assistant.",
        tags: ["Product Prototype", "Marketplace", "AI-assisted build"],
        links: [
          {
            label: "Live",
            href: "https://nipungo.vercel.app",
            icon: "external",
            external: true,
          },
          {
            label: "GitHub",
            href: "https://github.com/Afraj2004/NipunGo",
            icon: "github",
            external: true,
          },
        ],
      },
      {
        title: "Customer Order & Revenue Analytics",
        category: "Consumer Ordering · Analytics",
        image: "/images/order-analytics-placeholder.png",
        imageAlt: "Illustrated placeholder artwork for consumer order and revenue analytics.",
        description:
          "An end-to-end analysis of a consumer ordering business: purchase frequency, average order value, retention cohorts, and hourly and daily demand patterns, with inventory and pricing recommendations.",
        tags: ["SQL", "Power BI", "Cohort Analysis"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/Afraj2004/Pizza-Sales-Report",
            icon: "github",
            external: true,
          },
        ],
      },
    ],
  },
  contact: {
    title: "Get in Touch",
    eyebrow: "Let’s build thoughtful products",
    invitation: "Open to APM and product roles in fintech and consumer tech.",
    socials: ["linkedin", "email", "github"] as const,
  },
  footer: {
    copyright: "© 2026 Afraj Khan",
    backToTop: "Back to top",
  },
} as const
