// Case studies follow the Impact-First STAR layout for analytics.
// Figures below come from an audit of Afraj's own Jira tickets. Anything the audit
// could not verify has been left out.

export type Metric = {
  label: string
  /** Count-up number; null when `text` (e.g. a range) is shown instead */
  value: number | null
  /** Pre-formatted display such as a range; takes precedence over `value` */
  text?: string
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
    title: "eMandate conversion: fixing a mis-reported metric",
    tag: "Metric definition · Reporting accuracy",
    headline: { label: "Reported new-user conversion after the logic correction", value: null, text: "+10–15 pp" },
    context:
      "Approved borrowers register an **eMandate** (UPI Autopay, debit card or net banking) before disbursal. Weekly OKR reporting showed conversion well below what operations saw on the ground.",
    hypothesis:
      "**H1:** the dashboard calculation was **under-counting successful mandates**, so the gap was a measurement problem and not a product problem.",
    stack: ["**SQL**", "**ClickHouse**", "**Tableau**", "OKR reporting"],
    metrics: {
      primary: "**eMandate conversion rate** (approved → mandate registered), new and repeat users",
      secondary: ["Conversion by mandate method"],
      guardrail: ["Reconciliation against source records"],
    },
    stats: {
      test: "Measurement correction, not an experiment",
      alpha: "No significance test applies",
      power: "n/a",
      result: "Reported conversion rose from the mid-70s to about 90% (new) and about 95% (repeat)",
    },
    impact:
      "Reported rates rose by roughly **10–15 pp** (new users) and **20–25 pp** (repeat) after the calculation was corrected. These are **reporting** changes, so leadership now sees true conversion and can target real drop-off.",
  },
  {
    id: "mcm-v3",
    title: "Risk-tiered pre-due-date messaging policy (MCM v3)",
    tag: "Collections · Policy analysis",
    headline: { label: "Scheduled messages per borrower, by risk tier", value: null, text: "−15% to −65%" },
    context:
      "Every borrower got the same pre-due-date message schedule. Product moved to a **risk-tiered policy** that sends fewer messages to lower-risk borrowers. I ran the pre-live analysis and the post-live impact readouts.",
    hypothesis:
      "**H1:** lower-risk borrowers cure just as well with fewer messages, which cuts communication cost with no loss in repayment.",
    stack: ["**SQL**", "**ClickHouse**", "**Tableau**", "Cohort analysis"],
    metrics: {
      primary: "**Final cure rate** (≤ 0 DPD), month over month, by risk tier",
      secondary: ["Scheduled messages per borrower by tier"],
      guardrail: ["Cure rate for medium- and high-risk tiers"],
    },
    stats: {
      test: "Before/after comparison by risk tier (not randomised)",
      alpha: "No significance test run",
      power: "n/a",
      result: "Confounders: rollout template issues, a legacy SMS campaign, IVR timeouts",
    },
    impact:
      "Scheduled messages fell by roughly **15–65%** depending on tier. Low-risk cure moved by **under 1 pp**. I flagged a **1–3 pp** cure decline in the medium-risk tier and **recommended adding messages from DPD −3 to −1**.",
  },
  {
    id: "ivr-timeouts",
    title: "Pre-due-date cure decline and IVR timeouts",
    tag: "Collections · Root-cause analysis",
    headline: { label: "Pre-due-date IVR calls ending in timeout", value: null, text: "40–50%" },
    context:
      "Pre-due-date cure fell in early September against August, after changes to messaging coverage and a rise in IVR call failures.",
    hypothesis:
      "**H1:** the decline came from **two overlapping causes**, reduced messaging coverage and IVR calls timing out, and not from borrower behaviour.",
    stack: ["**SQL**", "**ClickHouse**", "**Tableau**", "Call-log analysis"],
    metrics: {
      primary: "**Pre-due-date cure rate**",
      secondary: ["Final cure rate (≤ 0 DPD)", "IVR timeout share of call logs"],
      guardrail: ["Coverage of messaging by borrower tier"],
    },
    stats: {
      test: "Period comparison, early September vs August (not randomised)",
      alpha: "No significance test run",
      power: "n/a",
      result: "Pre-due-date cure fell by 1–2 pp; final cure fell by under 1 pp",
    },
    impact:
      "Traced a **1–2 pp** pre-due-date cure drop to coverage gaps and **40–50% IVR timeouts**, and gave operations a concrete failure to fix while the team moved pre-due-date calling to a **voice bot**.",
  },
  {
    id: "bot-data-quality",
    title: "Bot coverage and duplicate call-log fixes",
    tag: "Data quality · Instrumentation",
    headline: { label: "Active cases pushed to the bot after the ingestion fix (up from roughly 70%)", value: 100, suffix: "%" },
    context:
      "Bot-calling metrics looked wrong. Coverage was under-reported and call volumes were inflated, so teams were making decisions on bad numbers.",
    hypothesis:
      "**H1:** the gaps were **pipeline faults**: same-day surrendered cases were never fetched, an API cap limited pushes, and vendor logs contained duplicates.",
    stack: ["**SQL**", "**ClickHouse**", "**Tableau**", "Data-quality checks"],
    metrics: {
      primary: "**Share of active cases pushed** to the bot",
      secondary: ["Reported bot coverage", "Duplicate-log rate by user"],
      guardrail: ["Reconciliation against vendor records"],
    },
    stats: {
      test: "Reconciliation against source and vendor records",
      alpha: "n/a (data-quality audit)",
      power: "n/a",
      result: "One user showed about 4x more calls in our database than in the vendor's records; over 90% of users had duplicates on one day",
    },
    impact:
      "Fixed the ingestion gap and raised the API cap by nearly **3x**, taking pushes from roughly **70% to 100%** of active cases. Duplicate logs were reported to engineering and corrected so **call-churn metrics** stop overstating volume.",
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
  { id: "bi", label: "Tableau", note: "Dashboards and weekly OKR reporting for product and operations." },
]
