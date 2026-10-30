"use client"

import { useEffect } from "react"

export function ScrollReveal() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return
    }

    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]")
    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement

          if (entry.isIntersecting) {
            target.setAttribute("data-revealed", "true")
            target.removeAttribute("data-reveal-pending")
            observer.unobserve(target)
            return
          }

          target.setAttribute("data-reveal-pending", "true")
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    )

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      targets.forEach((target) => {
        target.removeAttribute("data-reveal-pending")
        target.removeAttribute("data-revealed")
      })
    }
  }, [])

  return null
}
