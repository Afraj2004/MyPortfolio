"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

// Points sum to 100. Section views are passive; the rest reward interaction.
export const ACHIEVEMENTS = {
  "view:about": { points: 5, label: "Read the intro" },
  "view:experience": { points: 15, label: "Scanned experience" },
  "view:casestudies": { points: 15, label: "Opened case studies" },
  "view:skills": { points: 5, label: "Checked the skill set" },
  "view:projects": { points: 5, label: "Browsed projects" },
  "case:open": { points: 20, label: "Expanded a case study" },
  "case:all": { points: 10, label: "Expanded every case study" },
  "sql:run": { points: 15, label: "Ran the SQL terminal" },
  "pipeline:click": { points: 10, label: "Explored the pipeline" },
} as const

export type AchievementId = keyof typeof ACHIEVEMENTS

const SECTION_IDS: Record<string, AchievementId> = {
  about: "view:about",
  experience: "view:experience",
  "case-studies": "view:casestudies",
  skills: "view:skills",
  projects: "view:projects",
}

type ProgressContextValue = {
  score: number
  done: ReadonlySet<AchievementId>
  award: (id: AchievementId) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<ReadonlySet<AchievementId>>(() => new Set())

  const award = useCallback((id: AchievementId) => {
    setDone((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  // Passive: award a section once it is meaningfully on screen.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = SECTION_IDS[entry.target.id]
          if (entry.isIntersecting && key) {
            award(key)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )
    Object.keys(SECTION_IDS).forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [award])

  const value = useMemo<ProgressContextValue>(() => {
    let score = 0
    done.forEach((id) => (score += ACHIEVEMENTS[id].points))
    return { score: Math.min(score, 100), done, award }
  }, [done, award])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>")
  return ctx
}
