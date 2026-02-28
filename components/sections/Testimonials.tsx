import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Typography } from "@/components/ui/Typography";

export function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h2" className="mb-4">
            Trusted by fast growing enterprises
          </Typography>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-muted">
            <span className="font-semibold">POSTMAN</span>
            <span className="font-semibold">DOORDASH</span>
            <span className="font-semibold">STRIPE</span>
            <span className="font-semibold">CAPITALEONE</span>
            <span className="font-semibold">APPIEX</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
