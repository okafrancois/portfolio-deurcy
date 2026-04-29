import { Logo } from "./Logo";

type Props = {
  logo: { main: string; accent: string; suffix: string };
  wordmark1: string;
  wordmark2: string;
  tagline: string;
  email: string;
  phone: string;
  copy: string;
  location: string;
};

export function Footer({
  logo,
  wordmark1,
  wordmark2,
  tagline,
  email,
  phone,
  copy,
  location,
}: Props) {
  return (
    <footer style={{ padding: "80px 0 40px", position: "relative" }}>
      <div className="container-page">
        <div
          style={{
            fontFamily: "var(--font-display), serif",
            fontSize: "clamp(80px, 17vw, 280px)",
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            color: "var(--accent)",
            marginBottom: 56,
          }}
        >
          {wordmark1}
          <br />
          {wordmark2}
        </div>

        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 32,
            paddingTop: 40,
            borderTop: "1px solid var(--line)",
          }}
        >
          <div>
            <Logo size={20} {...logo} />
            <p
              style={{
                color: "var(--ink-dim)",
                fontSize: 14,
                marginTop: 16,
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              {tagline}
            </p>
          </div>
          <FooterCol title="Naviguer">
            <FooterLink href="#work">Travaux</FooterLink>
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#process">Process</FooterLink>
            <FooterLink href="#avis">Avis</FooterLink>
            <FooterLink href="#about">À propos</FooterLink>
          </FooterCol>
          <FooterCol title="Contact">
            <FooterLink href={`mailto:${email}`}>Email</FooterLink>
            <FooterLink href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">Vimeo</FooterLink>
          </FooterCol>
          <FooterCol title="Légal">
            <FooterLink href="#">Mentions légales</FooterLink>
            <FooterLink href="#">CGV</FooterLink>
            <FooterLink href="#">Confidentialité</FooterLink>
          </FooterCol>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 64,
            paddingTop: 24,
            borderTop: "1px solid var(--line)",
            fontSize: 12,
            color: "var(--ink-mute)",
            fontFamily: "var(--font-mono), monospace",
            letterSpacing: "0.1em",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>{copy}</div>
          <div>{location}</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--ink-mute)",
          letterSpacing: "0.15em",
          marginBottom: 16,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        fontSize: 14,
        color: "var(--ink-dim)",
        transition: "color 0.2s",
      }}
    >
      {children}
    </a>
  );
}
