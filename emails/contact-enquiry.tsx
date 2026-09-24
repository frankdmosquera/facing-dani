import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from "@react-email/components";

// Copied from globals.css on purpose: email clients do not support CSS variables.
const GROUND = "#261F36";
const SURFACE = "#352948";
const INK = "#F6F2FA";
const MUTED = "#B3A8C2";
const NAILS = "#FF3D8F";

export type ContactEnquiryProps = {
  name: string;
  email: string;
  service: string | null;
  source: string;
  locale: string;
  message: string;
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Row style={{ marginBottom: "10px" }}>
      <Column style={{ width: "96px", verticalAlign: "top" }}>
        <Text
          style={{
            margin: 0,
            color: MUTED,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {label}
        </Text>
      </Column>
      <Column>
        <Text style={{ margin: 0, color: INK, fontSize: "15px" }}>{value}</Text>
      </Column>
    </Row>
  );
}

export function ContactEnquiryEmail({
  name,
  email,
  service,
  source,
  locale,
  message,
}: ContactEnquiryProps) {
  return (
    <Html lang={locale}>
      <Head />
      <Preview>{`${name} - ${service ?? "not sure yet"}`}</Preview>
      <Body
        style={{
          backgroundColor: GROUND,
          margin: 0,
          padding: "24px 0",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: SURFACE,
            borderRadius: "14px",
            maxWidth: "560px",
            padding: "28px",
          }}
        >
          <Text
            style={{
              margin: "0 0 6px",
              color: NAILS,
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
            }}
          >
            New enquiry
          </Text>

          <Heading
            as="h1"
            style={{
              margin: "0 0 20px",
              color: INK,
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            {name}
          </Heading>

          <Section>
            <Field label="Email" value={email} />
            <Field label="Service" value={service ?? "Not sure yet"} />
            <Field label="Found via" value={source} />
            <Field label="Language" value={locale} />
          </Section>

          <Hr style={{ borderColor: "#514165", margin: "22px 0" }} />

          <Text
            style={{
              margin: 0,
              color: INK,
              fontSize: "15px",
              lineHeight: "1.65",
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>

          <Hr style={{ borderColor: "#514165", margin: "22px 0" }} />

          <Text style={{ margin: 0, color: MUTED, fontSize: "13px" }}>
            Reply to this email and it goes straight to {name}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
