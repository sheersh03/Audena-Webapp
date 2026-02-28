import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";
import { LinkButton } from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <Section className="bg-primary text-white">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h2" className="mb-4 text-white">
            Ready to evolve your voice operations?
          </Typography>
          <Typography variant="body" className="mb-8 opacity-90">
            Join 200+ enterprises scaling their operations with Audena.
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <LinkButton
              href="/contact"
              variant="secondary"
              className="border-white bg-white text-primary hover:bg-white/90"
            >
              Start Your Trial
            </LinkButton>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
