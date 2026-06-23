import { Star } from "lucide-react"

// Brand palette pulled from the source slide, applied in the clean card style
const COLORS = {
  lightBlue: "#5b9bd5",
  navy: "#2e4d7b",
  cyan: "#9cd3e0",
  slate: "#8497b0",
  orange: "#e2790f",
  green: "#7faf6b",
  olive: "#7aa845",
}

const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
const QUARTERS = [
  { label: "Q1", months: ["Apr", "May", "Jun"] },
  { label: "Q2", months: ["Jul", "Aug", "Sep"] },
  { label: "Q3", months: ["Oct", "Nov", "Dec"] },
  { label: "Q4", months: ["Jan", "Feb", "Mar"] },
]

type Bar = {
  start: number // 1-based month index
  span: number
  label: string
  bg: string
  textDark?: boolean
  icon?: "target" | "none"
  align?: "center"
}

function TimelineBar({ bar }: { bar: Bar }) {
  return (
    <div
      className="row-start-1 flex items-center rounded-lg px-2 py-2 text-[11px] font-medium leading-tight shadow-sm"
      style={{
        gridColumn: `${bar.start} / span ${bar.span}`,
        backgroundColor: bar.bg,
        color: bar.textDark ? "#1f2937" : "#ffffff",
      }}
    >
      <span className={bar.align === "center" ? "text-center w-full text-pretty" : "text-pretty"}>
        {bar.label}
      </span>
    </div>
  )
}

function Row({
  title,
  bars,
  minHeight = "min-h-[76px]",
}: {
  title?: string
  bars: Bar[]
  minHeight?: string
}) {
  return (
    <div>
      {title && (
        <div className="mb-2 flex items-center gap-2 px-1">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: COLORS.lightBlue }} />
          <h2 className="text-base font-bold tracking-tight text-foreground">{title}</h2>
        </div>
      )}
      <div className={`relative rounded-xl bg-muted/40 p-2 ${minHeight}`}>
        {/* month gridlines */}
        <div className="pointer-events-none absolute inset-2 grid grid-cols-12">
          {MONTHS.map((_, i) => (
            <div key={i} className={i === 0 ? "" : "border-l border-border/60"} />
          ))}
        </div>
        <div className="relative grid grid-cols-12 items-center gap-x-2">
          {bars.map((bar, i) => (
            <TimelineBar key={i} bar={bar} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TalentTimeline() {
  const careerBars: Bar[] = [
    { start: 1, span: 3, label: "End-of-year Career Conversations", bg: COLORS.cyan, textDark: true, icon: "none", align: "center" },
    { start: 4, span: 3, label: "Continuous Career Conversations", bg: COLORS.slate, icon: "none", align: "center" },
    { start: 7, span: 3, label: "Mid-year Career Conversations", bg: COLORS.cyan, textDark: true, icon: "none", align: "center" },
    { start: 10, span: 3, label: "Continuous Career Conversations", bg: COLORS.slate, icon: "none", align: "center" },
  ]

  const kopBars: Bar[] = [
    { start: 2, span: 2, label: "Knowing our People roll-up", bg: COLORS.cyan, textDark: true },
    { start: 4, span: 3, label: "Continuous Knowing our People sessions (functional reviews)", bg: COLORS.lightBlue },
    { start: 7, span: 6, label: "Continuous Knowing our People sessions (project reviews)", bg: COLORS.lightBlue },
  ]

  const successionBars: Bar[] = [
    { start: 3, span: 6, label: "Succession Planning & Development", bg: COLORS.slate, icon: "none", align: "center" },
    { start: 10, span: 2, label: "Succession EEC Review", bg: COLORS.navy },
    { start: 12, span: 1, label: "Succession Group Review", bg: COLORS.navy },
  ]

  const reviewBars: Bar[] = [
    { start: 2, span: 1, label: "EEC Strategic Talent Reviews – Roll-up KOP", bg: COLORS.navy },
    { start: 3, span: 1, label: "Global People Forum", bg: COLORS.orange },
    { start: 5, span: 1, label: "EEC Strategic Talent Reviews – Accelerate Talent Review", bg: COLORS.navy },
    { start: 6, span: 1, label: "Global People Forum", bg: COLORS.orange },
    { start: 8, span: 1, label: "EEC Strategic Talent Reviews", bg: COLORS.navy },
    { start: 9, span: 1, label: "Global People Forum", bg: COLORS.orange },
    { start: 11, span: 1, label: "EEC Strategic Talent Reviews – Succession", bg: COLORS.navy },
    { start: 12, span: 1, label: "Global People Forum", bg: COLORS.orange },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">Talent Timeline</h1>
        <span className="text-lg font-bold text-foreground md:text-xl">2025</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px] space-y-5">
          {/* Quarter / Month header */}
          <div className="grid grid-cols-4 gap-3">
            {QUARTERS.map((q) => (
              <div key={q.label} className="rounded-xl border border-border bg-muted/40 px-3 py-3">
                <p className="text-center text-lg font-bold text-foreground">{q.label}</p>
                <div className="mt-1 flex justify-between text-sm text-muted-foreground">
                  {q.months.map((m) => (
                    <span key={m} className="flex-1 text-center">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Snapshot stars row */}
          <div className="relative grid grid-cols-12 items-center">
            {[1, 7].map((col) => (
              <div
                key={col}
                className="flex flex-col items-center gap-1"
                style={{ gridColumn: `${col} / span 1` }}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-full shadow-sm"
                  style={{ backgroundColor: COLORS.orange }}
                >
                  <Star className="size-5 text-white" fill="currentColor" aria-hidden="true" />
                </span>
                <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">Snapshot of data</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          <Row title="Career Conversations" bars={careerBars} />
          <Row title="Knowing our People" bars={kopBars} />
          <Row title="Succession Planning & Development" bars={successionBars} />
          <Row title="Strategic Talent Reviews & Forums" bars={reviewBars} minHeight="min-h-[96px]" />
        </div>
      </div>
    </div>
  )
}
