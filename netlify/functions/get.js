import { getStore } from "@netlify/blobs";
export default async (req) => {
  const slug = (new URL(req.url).searchParams.get("slug") || "").toLowerCase().replace(/[^a-z0-9-]/g, "");
  const d = await getStore("invites").get(slug, { type: "json" });
  if (!d) return new Response("{}", { status: 404 });
  const { token, ...pub } = d; // never expose the edit token
  return new Response(JSON.stringify(pub), { headers: { "content-type": "application/json" } });
};
export const config = { path: "/api/get" };
