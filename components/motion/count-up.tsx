"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

type CountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}

export function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1.4 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setShown(value)
      return
    }
    if (!inView) return
    const controls = animate(0, value, { duration, ease: "easeOut", onUpdate: setShown })
    return () => controls.stop()
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className="count-up">
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}
