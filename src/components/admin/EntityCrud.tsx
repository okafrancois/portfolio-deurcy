"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type FieldDef =
  | { name: string; label: string; type: "text" | "number" | "textarea" }
  | { name: string; label: string; type: "stringArray"; helper?: string }
  | { name: string; label: string; type: "image"; urlField: string };

type Item = Record<string, unknown> & { _id: string };

type Props = {
  entity: string;
  title: string;
  fields: FieldDef[];
  items: Item[];
};

export default function EntityCrud({ entity, title, fields, items }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);

  const empty = (): Item => {
    const x: Record<string, unknown> = { _id: "" };
    for (const f of fields) {
      x[f.name] =
        f.type === "number"
          ? 0
          : f.type === "stringArray"
            ? []
            : f.type === "image"
              ? null
              : "";
    }
    return x as Item;
  };

  const save = async (data: Item) => {
    const action = data._id ? "update" : "create";
    const id = data._id || undefined;
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = data[f.name];
      if (f.type === "image" && (v === null || v === undefined || v === "")) {
        // omit empty image fields so Convex validators accept the doc
        continue;
      }
      payload[f.name] = v;
    }
    const res = await fetch(`/api/admin/${entity}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, id, data: payload }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j.error ?? "Erreur.");
      return;
    }
    setEditing(null);
    setCreating(false);
    router.refresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer cette entrée ?")) return;
    await fetch(`/api/admin/${entity}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    router.refresh();
  };

  const current = editing ?? (creating ? empty() : null);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1
          className="display"
          style={{ fontSize: 48, lineHeight: 1.05 }}
        >
          {title}
        </h1>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setEditing(null);
            setCreating(true);
          }}
        >
          + Ajouter
        </button>
      </div>

      {current ? (
        <ItemForm
          item={current}
          fields={fields}
          onCancel={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={save}
        />
      ) : null}

      <table className="admin-table" style={{ marginTop: 24 }}>
        <thead>
          <tr>
            {fields.slice(0, 3).map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th>Ordre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it._id}>
              {fields.slice(0, 3).map((f) => (
                <td key={f.name}>
                  {String(
                    Array.isArray(it[f.name])
                      ? (it[f.name] as unknown[]).join(", ")
                      : (it[f.name] ?? ""),
                  ).slice(0, 80)}
                </td>
              ))}
              <td>{String(it.order ?? "")}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <button
                  onClick={() => {
                    setCreating(false);
                    setEditing(it);
                  }}
                  style={{
                    fontSize: 12,
                    color: "var(--ink-dim)",
                    marginRight: 8,
                  }}
                >
                  Éditer
                </button>
                <button
                  onClick={() => void remove(it._id)}
                  style={{ fontSize: 12, color: "var(--ink-mute)" }}
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 ? (
            <tr>
              <td colSpan={fields.slice(0, 3).length + 2}>
                <span style={{ color: "var(--ink-dim)" }}>
                  Aucune entrée.
                </span>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function ItemForm({
  item,
  fields,
  onCancel,
  onSave,
}: {
  item: Item;
  fields: FieldDef[];
  onCancel: () => void;
  onSave: (data: Item) => Promise<void>;
}) {
  const [data, setData] = useState<Item>({ ...item });
  const [busy, setBusy] = useState(false);

  const update = (name: string, value: unknown) =>
    setData((d) => ({ ...d, [name]: value }));

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await onSave(data);
        setBusy(false);
      }}
      style={{
        background: "var(--bg-elev)",
        border: "1px solid var(--line)",
        padding: 24,
        marginBottom: 24,
        display: "grid",
        gap: 16,
      }}
    >
      {fields.map((f) => (
        <div key={f.name}>
          <label className="admin-label">{f.label}</label>
          {f.type === "textarea" ? (
            <textarea
              className="admin-textarea"
              rows={4}
              value={String(data[f.name] ?? "")}
              onChange={(e) => update(f.name, e.target.value)}
            />
          ) : f.type === "number" ? (
            <input
              type="number"
              className="admin-input"
              value={Number(data[f.name] ?? 0)}
              onChange={(e) => update(f.name, Number(e.target.value))}
            />
          ) : f.type === "stringArray" ? (
            <>
              <textarea
                className="admin-textarea"
                rows={4}
                value={(data[f.name] as string[] | undefined)?.join("\n") ?? ""}
                onChange={(e) =>
                  update(
                    f.name,
                    e.target.value.split("\n").filter((s) => s.length > 0),
                  )
                }
              />
              <small style={{ color: "var(--ink-mute)", fontSize: 11 }}>
                {f.helper ?? "Une entrée par ligne."}
              </small>
            </>
          ) : f.type === "image" ? (
            <ImageUploader
              storageId={(data[f.name] as string | null | undefined) ?? null}
              previewUrl={(data[f.urlField] as string | null | undefined) ?? null}
              onChange={(storageId, url) => {
                update(f.name, storageId);
                update(f.urlField, url);
              }}
            />
          ) : (
            <input
              className="admin-input"
              value={String(data[f.name] ?? "")}
              onChange={(e) => update(f.name, e.target.value)}
            />
          )}
        </div>
      ))}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={busy}
          style={{ opacity: busy ? 0.6 : 1 }}
        >
          {busy ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button type="button" onClick={onCancel} className="btn btn-ghost">
          Annuler
        </button>
      </div>
    </form>
  );
}

function ImageUploader({
  storageId,
  previewUrl,
  onChange,
}: {
  storageId: string | null;
  previewUrl: string | null;
  onChange: (storageId: string | null, url: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFile = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const urlRes = await fetch("/api/admin/files", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "create" }),
      });
      if (!urlRes.ok) throw new Error("Impossible de créer l'URL d'upload.");
      const { result: uploadUrl } = (await urlRes.json()) as { result: string };

      const upload = await fetch(uploadUrl, {
        method: "POST",
        headers: { "content-type": file.type },
        body: file,
      });
      if (!upload.ok) throw new Error("Échec de l'upload.");
      const { storageId: newId } = (await upload.json()) as {
        storageId: string;
      };
      const objectUrl = URL.createObjectURL(file);
      onChange(newId, objectUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (storageId) {
      await fetch("/api/admin/files", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "delete", id: storageId }),
      }).catch(() => {});
    }
    onChange(null, null);
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt=""
          style={{
            width: 160,
            height: 100,
            objectFit: "cover",
            border: "1px solid var(--line)",
            borderRadius: 4,
          }}
        />
      ) : (
        <div
          style={{
            width: 160,
            height: 100,
            border: "1px dashed var(--line)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-mute)",
            fontSize: 11,
          }}
        >
          Aucune image
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label
          className="btn btn-ghost"
          style={{ padding: "8px 14px", fontSize: 12, cursor: "pointer" }}
        >
          {busy ? "Upload…" : previewUrl ? "Remplacer" : "Choisir un fichier"}
          <input
            type="file"
            accept="image/*"
            disabled={busy}
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onFile(f);
              e.target.value = "";
            }}
          />
        </label>
        {previewUrl ? (
          <button
            type="button"
            onClick={() => void remove()}
            style={{ color: "var(--ink-mute)", fontSize: 12, textAlign: "left" }}
          >
            Retirer l&apos;image
          </button>
        ) : null}
        {error ? (
          <p style={{ color: "#ff8b6b", fontSize: 12 }}>{error}</p>
        ) : null}
      </div>
    </div>
  );
}
