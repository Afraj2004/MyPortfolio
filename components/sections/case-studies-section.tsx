"use client"

import { useState, type ReactNode } from "react"
import { caseStudies, type Metric } from "@/data/case-studies"
import { CountUp } from "@/components/motion/count-up"
import { PipelineGraph } from "@/components/motion/pipeline-graph"
import { SqlTerminal } from "@/components/motion/sql-terminal"
import { AbSandbox } from "@/components/sections/ab-sandbox"
import { useProgress } from "@/components/gamification/progress-provider"
import { SectionHeading } from "@/components/sections/section-heading"

// Renders **bold** spans from content strings.
function rich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))
}

function MetricValue({ metric }: { metric: Metric }) {
  if (metric.value === null) return <span className="metric-todo">[ add metric ]</span>
  return <CountUp value={metric.value} prefix={metric.prefix} suffix={metric.suffix} decimals={metric.decimals} />
}

export function CaseStudiesSection() {
  const { award } = useProgress()
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set())

  const toggle = (id: string, open: boolean) => {
    const next = new Set(openIds)
    if (open) next.add(id)
    else next.delete(id)
    setOpenIds(next)
    if (open) award("case:open")
    if (next.size === caseStudies.length) award("case:all")
  }

  return (
    <section id="case-studies" className="page-section" aria-labelledby="case-studies-heading">
      <div className="section-container">
        <SectionHeading
          eyebrow="Impact first"
          title="Case Studies"
          description="Context, hypothesis, metrics, statistics and business impact for each analysis."
          id="case-studies-heading"
        />

        <SqlTerminal />
        <PipelineGraph />

        <div className="case-list">
          {caseStudies.map((c) => (
            <details
              key={c.id}
              className="case-card"
              data-reveal
              open={openIds.has(c.id)}
              onToggle={(e) => toggle(c.id, e.currentTarget.open)}
            >
              <summary>
                <span className="case-tag">{c.tag}</span>
                <span className="case-title">{c.title}</span>
                <span className="case-headline">
                  <MetricValue metric={c.headline} />
                  <small>{c.headline.label}</small>
                </span>
              </summary>
              <dl className="case-body">
                <dt>1 · Context &amp; hypothesis</dt>
                <dd>
                  {rich(c.context)} {rich(c.hypothesis)}
                </dd>
                <dt>2 · Data stack &amp; pipeline</dt>
                <dd>{c.stack.map((s, i) => <span key={i} className="chip">{rich(s)}</span>)}</dd>
                <dt>3 · Metrics</dt>
                <dd>
                  <p>Primary: {rich(c.metrics.primary)}</p>
                  <p>Secondary: {c.metrics.secondary.join("; ")}</p>
                  <p>Guardrail: {c.metrics.guardrail.join("; ")}</p>
                </dd>
                <dt>4 · Statistical significance</dt>
                <dd>
                  {c.stats.test}. {c.stats.alpha}. {c.stats.power}. {c.stats.result}.
                </dd>
                <dt>5 · Business impact</dt>
                <dd>{rich(c.impact)}</dd>
              </dl>
            </details>
          ))}
        </div>

        <AbSandbox />
      </div>
    </section>
  )
}
