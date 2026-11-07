// Case studies follow the Impact-First STAR layout for analytics.
// Every `value: null` is a number only Afraj can supply (from real work at Olyv).
// The UI renders null as an "[ add metric ]" chip; nothing here is invented data.

export type Metric = {
  label: string
  /** null = not filled in yet; the UI shows a placeholder instead of a number */
  value: number | null
  prefix?: string
  suffix?: string
  decimals?: number
}

export type CaseStudy = {
  id: string
  title: string
  tag: string
  headline: Metric
  context: string
  hypothesis: string
  stack: string[]
  metrics: { primary: string; secondary: string[]; guardrail: string[] }
  stats: { test: string; alpha: string; power: string; result: string }
  impact: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: "emandate",
    title: "eMandate completion funnel",
    tag: "Funnel · Root-cause analysis",
    headline: { label: "eMandate completion lift", value: null, suffix: "%", decimals: 1 },
    context:
      "Approved borrowers must register an **eMandate** (UPI Autopay, debit card or net banking) before loan disbursal. Failures here block revenue after acquisition cost is already spent.",
    hypothesis:
      "**H1:** most drop-off is attributable to a small number of causes (gateway errors, bank SLA, user abandonment), not to the product flow. Fixing the top cause by volume moves completion more than redesigning the screen.",
    stack: ["**ClickHouse**", "**SQL window functions**", "Event instrumentation", "**Grafana**"],
    metrics: {
      primary: "**eMandate completion rate** (approved → mandate registered)",
      secondary: ["Completion by method (UPI / card / net banking)", "Time-to-complete"],
      guardrail: ["Disbursal rate", "Failure-reason coverage (% of failures attributed)"],
    },
    stats: {
      test: "Two-proportion z-test on before/after or holdout cohorts",
      alpha: "α = 0.05",
      power: "Power = [add]",
      result: "p = [add], 95% CI = [add]",
    },
    impact:
      "Attributed failures to **internal, gateway, partner-SLA or user** causes and routed each to its owner. Quantify: **[X]%** lift, **[₹Y]** disbursals unblocked per month.",
  },
  {
    id: "voice-bot",
    title: "Pre-due-date calling: IVR → voice bot",
    tag: "Collections · Ops experiment",
    headline: { label: "Repayment-rate lift", value: null, suffix: " pp", decimals: 1 },
    context:
      "Reminder calls before the due date are a cheap lever on **on-time repayment**. IVR was the default channel; the root-cause analysis suggested borrowers were not engaging with it.",
    hypothesis:
      "**H1:** a conversational **voice bot** raises answer-and-engage rate over IVR, which raises on-time repayment among reminded borrowers.",
    stack: ["**SQL**", "**BigQuery / ClickHouse**", "Cohort analysis", "Power BI"],
    metrics: {
      primary: "**On-time repayment rate** within due date + grace",
      secondary: ["Call connect rate", "Engagement (call duration > N s)"],
      guardrail: ["Cost per call", "Complaint / opt-out rate"],
    },
    stats: {
      test: "Randomised split by borrower, two-proportion z-test",
      alpha: "α = 0.05",
      power: "Power = [add], MDE = [add] pp",
      result: "p = [add], 95% CI = [add]",
    },
    impact:
      "Moved the channel from IVR to voice bot. Quantify: **[X] pp** repayment lift, **[₹Y]** saved or collected per cycle.",
  },
  {
    id: "field-agent",
    title: "Field-agent app funnels & SLA views",
    tag: "Instrumentation · Data quality",
    headline: { label: "Events with schema-valid payloads", value: null, suffix: "%", decimals: 0 },
    context:
      "Field agents use a mobile app whose behaviour differs **across app versions**. Without clean events, version-level SLA and funnel views were unreliable.",
    hypothesis:
      "**H1:** a share of apparent SLA breaches come from tracking gaps in older app versions, not agent behaviour.",
    stack: ["**Event instrumentation**", "**SQL**", "**Grafana**", "Data-quality checks"],
    metrics: {
      primary: "**SLA adherence** by app version",
      secondary: ["Funnel step conversion by version", "Event volume per active agent"],
      guardrail: ["Duplicate-event rate", "Null-property rate"],
    },
    stats: {
      test: "Descriptive plus version-level proportion comparison",
      alpha: "α = 0.05",
      power: "n/a (observational)",
      result: "Report effect sizes with CIs",
    },
    impact:
      "Teams act on **accurate** SLA numbers. Quantify: **[X]** false breaches removed, **[Y] hrs/week** of manual reconciliation saved.",
  },
]

export const sqlSnippet = {
  title: "emandate_funnel.sql",
  query: `WITH steps AS (
  SELECT user_id, event_name, event_time,
         row_number() OVER (PARTITION BY user_id, event_name
                            ORDER BY event_time) AS rn
  FROM events
  WHERE event_name IN ('mandate_started','mandate_submitted','mandate_success')
)
SELECT event_name,
       uniqExact(user_id) AS users,
       round(100 * users / first_value(users) OVER (ORDER BY event_time), 1) AS pct
FROM steps WHERE rn = 1
GROUP BY event_name ORDER BY min(event_time);`,
  // Synthetic output so the demo renders; labelled as such in the UI.
  rows: [
    ["mandate_started", "10,000", "100.0"],
    ["mandate_submitted", "7,400", "74.0"],
    ["mandate_success", "6,100", "61.0"],
  ],
  columns: ["event_name", "users", "pct"],
}

export const pipelineNodes = [
  { id: "app", label: "App events", note: "Instrumented user and agent events from the consumer and field-agent apps." },
  { id: "warehouse", label: "ClickHouse / BigQuery", note: "Raw events land here; queried with SQL window functions." },
  { id: "models", label: "SQL models", note: "Funnel, cohort and SLA definitions kept as versioned queries, with data-quality checks." },
  { id: "bi", label: "Grafana / Power BI", note: "Dashboards and weekly OKR reporting for product and operations." },
]
