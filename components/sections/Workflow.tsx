import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";

const steps = [
  {
    number: 1,
    title: "Define Voice Identity",
    description: "Configure your AI voice to match your brand tone and personality.",
  },
  {
    number: 2,
    title: "Map Your Workflows",
    description: "Connect your systems and define conversation flows for each use case.",
  },
  {
    number: 3,
    title: "Go Live at Scale",
    description: "Launch in minutes and scale to thousands of simultaneous conversations.",
  },
];

export function Workflow() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h2" className="mb-4">
            How It Works
          </Typography>
          <Typography variant="body" className="mb-12 text-muted">
            Your streamlined journey to automated AI Voice Calls.
          </Typography>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary text-lg font-bold text-primary">
                {step.number}
              </div>
              <Typography variant="h4" className="mb-2">
                {step.title}
              </Typography>
              <Typography variant="small" className="text-muted">
                {step.description}
              </Typography>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
