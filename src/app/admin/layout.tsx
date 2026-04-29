import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

const SECTIONS: [string, string][] = [
  ["/admin", "Devis reçus"],
  ["/admin/settings", "Paramètres"],
  ["/admin/marquee", "Marquee"],
  ["/admin/stats", "Stats"],
  ["/admin/services", "Services"],
  ["/admin/projects", "Projets"],
  ["/admin/testimonials", "Témoignages"],
  ["/admin/process", "Process"],
  ["/admin/faq", "FAQ"],
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <div
          className="display"
          style={{
            fontSize: 22,
            color: "var(--accent)",
            fontStyle: "italic",
            marginBottom: 24,
          }}
        >
          Admin
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {SECTIONS.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <Link href="/" style={{ color: "var(--ink-mute)" }}>
            ← Voir le site
          </Link>
        </div>
        <div style={{ marginTop: 16 }}>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
