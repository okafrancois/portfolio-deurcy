import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const items = await convexServer().query(api.content.listTestimonials, {});
  return (
    <EntityCrud
      entity="testimonials"
      title="Témoignages"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "name", label: "Nom", type: "text" },
        { name: "role", label: "Rôle", type: "text" },
        { name: "company", label: "Société", type: "text" },
        { name: "quote", label: "Citation", type: "textarea" },
        { name: "initials", label: "Initiales", type: "text" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
