import type { APIRoute } from "astro";

export const prerender = false;

const METADATA =
  "https://repo1.maven.org/maven2/dev/nextftc/v2/robot/maven-metadata.xml";

export const GET: APIRoute = async () => {
  const res = await fetch(METADATA, {
    cf: { cacheTtl: 300, cacheEverything: true },
  }).catch(() => null);
  const xml = res?.ok ? await res.text() : "";
  const version = xml.match(/<release>([^<]+)<\/release>/)?.[1] ?? null;
  return Response.json(
    { version },
    { headers: { "Cache-Control": "public, max-age=300" } },
  );
};
