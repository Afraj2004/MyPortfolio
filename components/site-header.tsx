"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"
import { portfolioContent } from "@/data/content"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <header className="site-header">
      <div className="section-container site-header-inner">
        <a
          href="#home"
          className="brand"
          aria-label={portfolioContent.accessibility.homeLink}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark" aria-hidden="true">
            {portfolioContent.site.mark}
          </span>
          <span className="brand-copy">
            <span>{portfolioContent.site.name}</span>
            <span>{portfolioContent.site.role}</span>
          </span>
        </a>

        <nav
          id="primary-navigation"
          className={cn("site-nav", menuOpen && "is-open")}
          aria-label={portfolioContent.accessibility.mainNavigation}
        >
          <ul>
            {portfolioContent.site.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            aria-label={isDark ? portfolioContent.accessibility.switchToLight : portfolioContent.accessibility.switchToDark}
            title={isDark ? portfolioContent.accessibility.switchToLight : portfolioContent.accessibility.switchToDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="menu-button"
            aria-label={menuOpen ? portfolioContent.accessibility.closeMenu : portfolioContent.accessibility.openMenu}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
