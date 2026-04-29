import { api } from "../../../../convex/_generated/api";
import { convexServer } from "@/lib/convex-server";
import EntityCrud from "@/components/admin/EntityCrud";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const items = await convexServer().query(api.content.listProjects, {});
  return (
    <EntityCrud
      entity="projects"
      title="Projets"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items={items as any[]}
      fields={[
        { name: "title", label: "Titre", type: "text" },
        { name: "client", label: "Client", type: "text" },
        {
          name: "category",
          label: "Catégorie",
          type: "text",
        },
        { name: "year", label: "Année", type: "text" },
        { name: "duration", label: "Durée", type: "text" },
        { name: "blurb", label: "Description", type: "textarea" },
        { name: "tag", label: "Tag", type: "text" },
        { name: "order", label: "Ordre", type: "number" },
      ]}
    />
  );
}
