import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await pagesGlobToRssItems(
    import.meta.glob("./posts/*.{md,mdx}")
  );

  const rssBody = await rss({
    title: "Stefan Asandei",
    // `<description>` field in output xml
    description: "My personal blog, mostly computer science stuff.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site!,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: posts,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });

  let res = new Response(rssBody.body, {
    headers: {
      "content-type": "application/xml",
    },
  });
  return res;
}
