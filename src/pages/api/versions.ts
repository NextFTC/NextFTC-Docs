import type { APIRoute } from "astro";

export const prerender = false;

const SOURCES = {
  nextftc:
    "https://repo1.maven.org/maven2/dev/nextftc/v2/robot/maven-metadata.xml",
  blaze:
    "https://maven.anygeneric.dev/dev/anygeneric/blazeftc/maven-metadata.xml",
} as const;

async function latest(url: string): Promise<string | null> {
  const res = await fetch(url, {
    cf: { cacheTtl: 300, cacheEverything: true },
  }).catch(() => null);
  const xml = res?.ok ? await res.text() : "";
  return xml.match(/<release>([^<]+)<\/release>/)?.[1] ?? null;
}

export const GET: APIRoute = async () => {
  const entries = await Promise.all(
    Object.entries(SOURCES).map(
      async ([name, url]) => [name, await latest(url)] as const,
    ),
  );
  return Response.json(Object.fromEntries(entries), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
};
