import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";

const benefits = [
  {
    title: "Instant Scalability",
    description: "Handle thousands of concurrent calls without adding headcount.",
  },
  {
    title: "Flawless Retention",
    description: "Natural conversations that keep customers engaged and satisfied.",
  },
  {
    title: "CRM Integrations",
    description: "Seamlessly connect with your existing tools and workflows.",
  },
];

export function Benefits() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h2" className="mb-4">
            Built for high-Revenue & Support Teams
          </Typography>
          <Typography variant="body" className="mb-12 text-muted">
            Scale your customer operations with AI that sounds and feels human.
          </Typography>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-xl border bg-background p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                ✓
              </div>
              <Typography variant="h4" className="mb-2">
                {benefit.title}
              </Typography>
              <Typography variant="small" className="text-muted">
                {benefit.description}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
