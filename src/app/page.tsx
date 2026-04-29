import { fetchSiteContent } from "@/lib/content";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Stats } from "@/components/site/Stats";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { About } from "@/components/site/About";
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  let data: Awaited<ReturnType<typeof fetchSiteContent>> | null = null;
  try {
    data = await fetchSiteContent();
  } catch (err) {
    return (
      <main className="container-page" style={{ padding: "120px 32px" }}>
        <h1 className="display" style={{ fontSize: 56, marginBottom: 24 }}>
          Initialisation requise
        </h1>
        <p style={{ color: "var(--ink-dim)", maxWidth: 560 }}>
          La connexion à Convex a échoué.
          <br />
          Lance <code>npx convex dev</code> dans le projet, puis fais un
          POST sur <code>/api/seed</code> avec ton <code>ADMIN_PASSWORD</code>{" "}
          pour insérer le contenu initial.
        </p>
        <pre
          style={{
            marginTop: 24,
            color: "var(--ink-mute)",
            fontSize: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          {String(err instanceof Error ? err.message : err)}
        </pre>
      </main>
    );
  }

  const {
    settings,
    marquee,
    stats,
    services,
    projects,
    testimonials,
    processSteps,
    faq,
  } = data;

  if (!settings) {
    return (
      <main className="container-page" style={{ padding: "120px 32px" }}>
        <h1 className="display" style={{ fontSize: 56, marginBottom: 24 }}>
          Contenu non initialisé
        </h1>
        <p style={{ color: "var(--ink-dim)" }}>
          Connecte-toi à <a href="/login" style={{ color: "var(--accent)" }}>/login</a>{" "}
          puis lance le seed via{" "}
          <code>POST /api/seed</code>.
        </p>
      </main>
    );
  }

  const logo = {
    main: settings.logoMain,
    accent: settings.logoAccent,
    suffix: settings.logoSuffix,
  };

  return (
    <>
      <Nav logo={logo} ctaLabel={settings.heroSecondaryCta} />
      <Hero
        eyebrow={settings.heroEyebrow}
        bgWord={settings.heroBgWord}
        titleLine1={settings.heroTitleLine1}
        titleLine2={settings.heroTitleLine2}
        titleEm={settings.heroTitleEm}
        signatureName={settings.heroSignatureName}
        description={settings.heroDescription}
        primaryCta={settings.heroPrimaryCta}
        secondaryCta={settings.heroSecondaryCta}
      />
      <Marquee items={(marquee as { text: string }[]).map((m) => m.text)} />
      <Stats
        items={(stats as { num: string; label: string }[]).map((s) => ({
          num: s.num,
          label: s.label,
        }))}
      />
      <Work
        projects={projects as Parameters<typeof Work>[0]["projects"]}
        titleLine1={settings.workTitleLine1}
        titleEm={settings.workTitleEm}
        intro={settings.workIntro}
        cta={settings.workCta}
      />
      <Services
        services={services as Parameters<typeof Services>[0]["services"]}
        titleLine1={settings.servicesTitleLine1}
        titleLine2={settings.servicesTitleLine2}
        titleEm={settings.servicesTitleEm}
      />
      <Process
        steps={processSteps as Parameters<typeof Process>[0]["steps"]}
        titleLine1={settings.processTitleLine1}
        titleEm={settings.processTitleEm}
      />
      <Testimonials
        items={testimonials as Parameters<typeof Testimonials>[0]["items"]}
        titleLine1={settings.avisTitleLine1}
        titleEm={settings.avisTitleEm}
        rating={settings.avisRating}
      />
      <About
        titleLine1={settings.aboutTitleLine1}
        titleEm={settings.aboutTitleEm}
        body1={settings.aboutBody1}
        body2={settings.aboutBody2}
        portraitLabel={settings.aboutPortraitLabel}
        miniGrid={settings.aboutMiniGrid}
      />
      <Faq
        items={faq as Parameters<typeof Faq>[0]["items"]}
        titleLine1={settings.faqTitleLine1}
        titleEm={settings.faqTitleEm}
      />
      <Contact
        titleLine1={settings.contactTitleLine1}
        titleEm={settings.contactTitleEm}
        email={settings.contactEmail}
        phone={settings.contactPhone}
        socialHandle={settings.contactSocialHandle}
        socialUrl={settings.contactSocialUrl}
        replyNotice={settings.contactReplyNotice}
        quoteTypes={settings.contactQuoteTypes}
        budgets={settings.contactBudgets}
      />
      <Footer
        logo={logo}
        wordmark1={settings.footerWordmark1}
        wordmark2={settings.footerWordmark2}
        tagline={settings.footerTagline}
        email={settings.contactEmail}
        phone={settings.contactPhone}
        copy={settings.footerCopy}
        location={settings.footerLocation}
      />
    </>
  );
}
