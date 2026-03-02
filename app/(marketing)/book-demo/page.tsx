import { AppFooter } from "@/components/layout/AppFooter";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";

const demoTopics = [
  "Live voice orchestration for inbound and outbound flows",
  "Enterprise-grade compliance, observability, and reliability",
  "CRM, helpdesk, and backend integration strategy",
];

const trustSignals = [
  { label: "SLA uptime", value: "99.9%" },
  { label: "Languages", value: "45+" },
  { label: "Deployments", value: "500+" },
];

const complianceBadges = [
  {
    name: "SOC 2 Type II",
    detail: "Verified",
    icon: "verified_user",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "GDPR",
    detail: "Certified",
    icon: "privacy_tip",
    tone: "bg-sky-50 text-sky-700",
  },
  {
    name: "HIPAA",
    detail: "Healthcare",
    icon: "health_and_safety",
    tone: "bg-violet-50 text-violet-700",
  },
  {
    name: "ISO 27001",
    detail: "Standard",
    icon: "workspace_premium",
    tone: "bg-amber-50 text-amber-700",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function BookDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background-light font-body text-graphite antialiased">
      <Header />

      <main className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(103,141,198,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(103,141,198,0.08),transparent_28%)] pt-24">
        <section className="pb-20 pt-6">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.28em] text-primary">
                Book a Demo
              </p>
              <h1 className="text-5xl font-display font-bold leading-tight text-graphite md:text-6xl">
                See how Audena fits your voice operations
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                Walk through your call flows, integrations, scale targets, and
                compliance needs with the same polished experience used across
                our marketing site.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-10">
                <div className="mb-8 flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold text-graphite">
                      Tell us about your team
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                      We&apos;ll tailor the session to your current call volume,
                      stack, and rollout plan.
                    </p>
                  </div>
                  <div className="hidden rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary sm:block">
                    30 min session
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Full Name
                      </span>
                      <input
                        type="text"
                        placeholder="Sarah Johnson"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-graphite outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Company Name
                      </span>
                      <input
                        type="text"
                        placeholder="Acme Corp"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-graphite outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Work Email
                      </span>
                      <input
                        type="email"
                        placeholder="sarah@acme.com"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-graphite outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Monthly Call Volume
                      </span>
                      <select className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-graphite outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10">
                        <option>Select volume range</option>
                        <option>10,000 - 50,000 calls</option>
                        <option>50,000 - 250,000 calls</option>
                        <option>250,000 - 1,000,000 calls</option>
                        <option>1,000,000+ calls</option>
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      What do you want to explore?
                    </span>
                    <textarea
                      rows={5}
                      placeholder="Share your use case, current tooling, and any requirements around compliance or integrations."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-graphite outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                    />
                  </label>

                  <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-md text-xs leading-5 text-slate-500">
                      By submitting this form, you agree to our terms and
                      privacy policy. We&apos;ll only use this information to
                      prepare your demo.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(103,141,198,0.28)] transition hover:opacity-90"
                    >
                      Schedule My Demo
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-8">
                <div className="rounded-[2rem] border-2 border-primary bg-slate-950 p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] md:p-10">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {trustSignals.map((item) => (
                      <div key={item.label}>
                        <p className="text-2xl font-bold text-primary">
                          {item.value}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="my-8 h-px bg-white/10" />

                  <p className="text-2xl font-semibold leading-10 text-white">
                    We&apos;ll show you how Audena can automate complex voice
                    journeys without sacrificing control, security, or
                    customer experience.
                  </p>

                  <div className="mt-8 space-y-4">
                    {demoTopics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className="mt-0.5 text-primary">
                          <CheckIcon />
                        </div>
                        <p className="text-sm leading-6 text-slate-200">
                          {topic}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-lg leading-8 text-slate-600">
                    “We built Audena to give enterprises a voice platform that
                    feels human, operates reliably at scale, and earns trust in
                    every conversation.”
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                      DM
                    </div>
                    <div>
                      <p className="font-semibold text-graphite">
                        Donato Matteucci
                      </p>
                      <p className="text-sm text-slate-500">
                        CEO, Audena
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    Trusted security and compliance
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {complianceBadges.map((badge) => (
                      <div
                        key={badge.name}
                        className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-xl">
                              {badge.icon}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-700">
                              {badge.name}
                            </p>
                            <span
                              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badge.tone}`}
                            >
                              {badge.detail}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <AppFooter />
    </div>
  );
}
