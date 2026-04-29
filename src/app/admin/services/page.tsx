import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const items = await convexServer().query(api.content.listServices, {});
  return (
    <EntityCrud
      entity="services"
      title="Services"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "num", label: "Numéro", type: "text" },
        { name: "title", label: "Titre", type: "text" },
        { name: "sub", label: "Sous-titre", type: "text" },
        { name: "body", label: "Description", type: "textarea" },
        {
          name: "bullets",
          label: "Points clés",
          type: "stringArray",
          helper: "Une ligne par point.",
        },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
