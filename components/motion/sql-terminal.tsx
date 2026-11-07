"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"
import { sqlSnippet } from "@/data/case-studies"
import { useProgress } from "@/components/gamification/progress-provider"

export function SqlTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const reduce = useReducedMotion()
  const { award } = useProgress()
  const [typed, setTyped] = useState(reduce ? sqlSnippet.query.length : 0)
  const [ran, setRan] = useState(false)
  const finished = typed >= sqlSnippet.query.length

  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= sqlSnippet.query.length) {
          window.clearInterval(id)
          return n
        }
        return n + 3
      })
    }, 18)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const run = () => {
    setTyped(sqlSnippet.query.length)
    setRan(true)
    award("sql:run")
  }

  return (
    <div ref={ref} className="sql-terminal" data-reveal>
      <div className="sql-bar">
        <span aria-hidden="true" className="dot" />
        <span aria-hidden="true" className="dot" />
        <span aria-hidden="true" className="dot" />
        <span className="sql-title">{sqlSnippet.title}</span>
        <button type="button" onClick={run} className="sql-run">
          ▶ Run
        </button>
      </div>
      <pre className="sql-code" aria-label="SQL query">
        <code>{sqlSnippet.query.slice(0, typed)}</code>
        {!finished ? <span className="caret" aria-hidden="true" /> : null}
      </pre>
      {ran || finished ? (
        <table className="sql-out">
          <caption>Sample output (synthetic data)</caption>
          <thead>
            <tr>
              {sqlSnippet.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sqlSnippet.rows.map((r) => (
              <tr key={r[0]}>
                {r.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}
