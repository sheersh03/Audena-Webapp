import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";

export function VoiceAutomation() {
  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Typography variant="h2" className="mb-4">
              Human-like AI Voices
            </Typography>
            <Typography variant="body" className="mb-6 text-muted">
              Our proprietary synthesis engine captures the nuance of human
              speech—the breaths, the pauses, and the emotional inflection that
              builds trust.
            </Typography>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <div>
                  <Typography variant="h4" className="mb-1">
                    Emotional Intelligence
                  </Typography>
                  <Typography variant="small" className="text-muted">
                    Detects caller sentiment and adjusts tone in real-time.
                  </Typography>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">✓</span>
                <div>
                  <Typography variant="h4" className="mb-1">
                    Zero Latency Response
                  </Typography>
                  <Typography variant="small" className="text-muted">
                    Industry-leading &lt; 200ms response time.
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-xl bg-muted p-8">
            <div className="aspect-video rounded-lg bg-background/50" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
