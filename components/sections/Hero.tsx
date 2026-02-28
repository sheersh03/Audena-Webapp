import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";

export function Hero() {
  return (
    <Section className="bg-background">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Typography variant="h1" className="mb-4">
            Automated AI Voice Calls That Sound{" "}
            <span className="text-primary">Human.</span>
          </Typography>
          <Typography variant="body" className="mb-8 text-muted">
            Audena powers human-like voice conversations at scale. Reach thousands
            of customers simultaneously without sacrificing personal touch.
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact">Start free trial</LinkButton>
            <Button variant="outline">View Demo</Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
