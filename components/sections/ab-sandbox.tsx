"use client"

import { useRef, useState } from "react"
import { CountUp } from "@/components/motion/count-up"
import { useProgress } from "@/components/gamification/progress-provider"

// Simulated experiment, not real data. Two-proportion z-test.
const A = { n: 12000, p: 0.04 }
const B = { n: 12000, p: 0.0445 }

// Acklam-free approximation: Abramowitz & Stegun 26.2.23 for upper-tail quantile.
function zForTwoSided(confidence: number) {
  const tail = (1 - confidence) / 2
  const t = Math.sqrt(-2 * Math.log(tail))
  return t - (2.515517 + 0.802853 * t + 0.010328 * t * t) / (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t ** 3)
}

export function AbSandbox() {
  const { award } = useProgress()
  const [conf, setConf] = useState(90)
  const seen = useRef(new Set<boolean>())

  const diff = B.p - A.p
  const se = Math.sqrt((A.p * (1 - A.p)) / A.n + (B.p * (1 - B.p)) / B.n)
  const z = zForTwoSided(conf / 100)
  const lo = diff - z * se
  const hi = diff + z * se
  const significant = lo > 0
  const relLift = (diff / A.p) * 100

  const onChange = (v: number) => {
    setConf(v)
    award("ab:slide")
    seen.current.add(diff - zForTwoSided(v / 100) * se > 0)
    if (seen.current.size === 2) award("ab:flip")
  }

  // Map CI (in percentage points) onto a 0-100 SVG axis spanning -0.4..1.4 pp.
  const x = (v: number) => ((v * 100 + 0.4) / 1.8) * 100

  return (
    <div className="ab-sandbox" data-reveal>
      <h3>A/B test sandbox</h3>
      <p className="ab-note">Simulated experiment: control 4.00% vs variant 4.45%, n = 12,000 each. Slide the confidence level.</p>
      <label className="ab-slider">
        Confidence level: <strong>{conf}%</strong>
        <input
          type="range"
          min={90}
          max={99}
          step={1}
          value={conf}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
      <svg viewBox="0 0 100 24" className="ab-chart" role="img" aria-label={`${conf}% confidence interval for the difference`}>
        <line x1={x(0)} x2={x(0)} y1="2" y2="22" className="ab-zero" />
        <line x1={x(lo)} x2={x(hi)} y1="12" y2="12" className="ab-ci" data-sig={significant} style={{ transition: "all .25s" }} />
        <circle cx={x(diff)} cy="12" r="1.6" className="ab-point" data-sig={significant} />
      </svg>
      <p className="ab-verdict" data-sig={significant}>
        {significant ? "Significant: CI excludes 0" : "Not significant: CI includes 0"} · CI [{(lo * 100).toFixed(2)}, {(hi * 100).toFixed(2)}] pp ·
        relative lift <CountUp value={relLift} suffix="%" decimals={1} />
      </p>
    </div>
  )
}
