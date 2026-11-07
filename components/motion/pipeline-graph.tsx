"use client"

import { useState } from "react"
import { pipelineNodes } from "@/data/case-studies"
import { useProgress } from "@/components/gamification/progress-provider"

const W = 800
const STEP = W / pipelineNodes.length

export function PipelineGraph() {
  const { award } = useProgress()
  const [active, setActive] = useState(pipelineNodes[0].id)
  const current = pipelineNodes.find((n) => n.id === active)!

  return (
    <figure className="pipeline" data-reveal>
      <svg viewBox={`0 0 ${W} 140`} role="img" aria-label="Data pipeline from app events to dashboards">
        {pipelineNodes.slice(0, -1).map((_, i) => (
          <line
            key={i}
            className="pipe-edge"
            x1={STEP * i + STEP / 2 + 62}
            x2={STEP * (i + 1) + STEP / 2 - 62}
            y1={70}
            y2={70}
          />
        ))}
        {pipelineNodes.map((n, i) => (
          <g
            key={n.id}
            className="pipe-node"
            data-active={n.id === active}
            transform={`translate(${STEP * i + STEP / 2 - 62}, 42)`}
            role="button"
            tabIndex={0}
            aria-pressed={n.id === active}
            onClick={() => {
              setActive(n.id)
              award("pipeline:click")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setActive(n.id)
                award("pipeline:click")
              }
            }}
          >
            <rect width="124" height="56" rx="12" />
            <text x="62" y="33" textAnchor="middle">
              {n.label.length > 16 ? n.label.slice(0, 15) + "…" : n.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        <strong>{current.label}.</strong> {current.note}
      </figcaption>
    </figure>
  )
}
