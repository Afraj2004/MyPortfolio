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

    document.documentElement.dataset.motionReady = "true"

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    )

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      delete document.documentElement.dataset.motionReady
    }
  }, [])

  return null
}
