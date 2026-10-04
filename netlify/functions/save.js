import { getStore } from "@netlify/blobs";
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json" } });

export default async (req) => {
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  const raw = await req.text();
  if (raw.length > 5.5e6) return json({ error: "Photos and song are too large together. Use fewer photos or a shorter song." }, 413);
  const d = JSON.parse(raw);
  if (d.website) return json({ error: "Rejected" }, 400); // honeypot field
  const slug = String(d.slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
  if (!slug) return json({ error: "Enter a link name using letters, numbers or dashes." }, 400);
  const store = getStore("invites");
  const old = await store.get(slug, { type: "json" });
  if (old && old.token !== d.token) return json({ error: "That link name is taken. Try another." }, 409);
  const token = old ? old.token : crypto.randomUUID();
  delete d.website;
  await store.setJSON(slug, { ...d, slug, token });
  return json({ slug, token });
};
export const config = { path: "/api/save" };
