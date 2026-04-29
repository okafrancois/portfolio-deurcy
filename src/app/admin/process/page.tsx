import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function ProcessPage() {
  const items = await convexServer().query(api.content.listProcessSteps, {});
  return (
    <EntityCrud
      entity="processSteps"
      title="Process"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "num", label: "Étape", type: "text" },
        { name: "label", label: "Titre", type: "text" },
        { name: "body", label: "Description", type: "textarea" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
