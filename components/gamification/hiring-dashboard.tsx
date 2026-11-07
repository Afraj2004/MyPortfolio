"use client"

import { useState } from "react"
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion"
import { CalendarCheck, ChevronUp, Lock, Trophy } from "lucide-react"
import { ACHIEVEMENTS, useProgress, type AchievementId } from "@/components/gamification/progress-provider"
import { Button } from "@/components/ui/button"

const SCHEDULE_HREF =
  "mailto:afraj12022004@gmail.com?subject=Interview%20request%20for%20Afraj%20Khan"

export function HiringDashboard() {
  const { score, done } = useProgress()
  const [open, setOpen] = useState(false)
  const unlocked = score >= 100

  return (
    <LazyMotion features={domAnimation}>
      <aside className="hm-dashboard" aria-label="Hiring Manager Dashboard" data-unlocked={unlocked}>
        <AnimatePresence initial={false}>
          {open ? (
            <m.ul
              key="list"
              className="hm-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {(Object.keys(ACHIEVEMENTS) as AchievementId[]).map((id) => (
                <li key={id} data-done={done.has(id)}>
                  <span aria-hidden="true">{done.has(id) ? "✓" : "○"}</span>
                  {ACHIEVEMENTS[id].label}
                  <b>+{ACHIEVEMENTS[id].points}</b>
                </li>
              ))}
            </m.ul>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          className="hm-header"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <Trophy aria-hidden="true" />
          <span>Hiring Progress</span>
          <strong>{score}%</strong>
          <ChevronUp aria-hidden="true" data-open={open} />
        </button>

        <div
          className="hm-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={score}
          aria-label="Hiring progress"
        >
          <m.div className="hm-fill" animate={{ width: `${score}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </div>

        {unlocked ? (
          <m.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Button className="hm-cta" size="lg" onClick={() => (window.location.href = SCHEDULE_HREF)}>
              <CalendarCheck aria-hidden="true" data-icon="inline-start" />
              Schedule Interview
            </Button>
          </m.div>
        ) : (
          <p className="hm-hint">
            <Lock aria-hidden="true" /> Explore the portfolio to unlock “Schedule Interview”
          </p>
        )}
      </aside>
    </LazyMotion>
  )
}
