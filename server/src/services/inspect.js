import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = express.Router();

function detectFramework(html) {
  const source = html.toLowerCase();

  if (source.includes("__next_data__")) return "Next.js";
  if (source.includes("wp-content")) return "WordPress";
  if (source.includes("_astro")) return "Astro";
  if (source.includes("nuxt")) return "Nuxt";
  if (source.includes("gatsby")) return "Gatsby";
  if (source.includes("svelte")) return "Svelte";
  if (source.includes("vue")) return "Vue";
  if (source.includes("react")) return "React";

  return "Unknown";
}

async function detectFonts($, targetUrl) {
  const fonts = new Set();

  $("link").each((_, el) => {
    const href = $(el).attr("href");

    if (
      href &&
      href.includes("fonts.googleapis")
    ) {
      const matches = href.matchAll(
        /family=([^:&]+)/g
      );

      for (const match of matches) {
        fonts.add(
          decodeURIComponent(match[1]).replace(
            /\+/g,
            " "
          )
        );
      }
    }
  });

  const cssLinks = [];

  $("link[rel='stylesheet']").each(
    (_, el) => {
      const href = $(el).attr("href");

      if (!href) return;

      try {
        cssLinks.push(
          new URL(href, targetUrl).href
        );
      } catch {}
    }
  );

  for (const cssUrl of cssLinks.slice(0, 5)) {
    try {
      const cssResponse =
        await axios.get(cssUrl);

      const css =
        cssResponse.data || "";

      const familyMatches = [
        ...css.matchAll(
          /font-family:\s*["']?([^;"'}]+)/gi
        ),
      ];

      familyMatches.forEach((match) => {
        const font =
          match[1].trim();

        if (
          font &&
          font.length < 40 &&
          ![
            "sans-serif",
            "serif",
            "monospace",
            "system-ui",
          ].includes(
            font.toLowerCase()
          )
        ) {
          fonts.add(font);
        }
      });

      if (
        css.toLowerCase().includes(
          "geist"
        )
      ) {
        fonts.add("Geist");
      }
    } catch {}
  }

  return [...fonts];
}

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const targetUrl =
      url.startsWith("http://") ||
      url.startsWith("https://")
        ? url
        : `https://${url}`;

    const response = await axios.get(
      targetUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36",
        },
        timeout: 15000,
      }
    );

    const html = response.data;

    const $ = cheerio.load(html);

    const title =
      $("title").text().trim() ||
      "Not Found";

    const description =
      $('meta[name="description"]').attr(
        "content"
      ) || "No description found";

    const language =
      $("html").attr("lang") ||
      "Unknown";

    const canonical =
      $('link[rel="canonical"]').attr(
        "href"
      ) || "Not Found";

    const favicon =
      $('link[rel="icon"]').attr(
        "href"
      ) ||
      $('link[rel="shortcut icon"]').attr(
        "href"
      ) ||
      "";

    const framework =
      detectFramework(html);

    const fonts =
      await detectFonts(
        $,
        targetUrl
      );

    const hasOG =
      $('meta[property^="og:"]').length >
      0;

    const hasTwitter =
      $('meta[name^="twitter:"]')
        .length > 0;

    res.json({
      success: true,

      title,
      description,
      language,

      canonical,
      favicon,

      framework,

      fonts,

      seo: {
        canonical:
          canonical !== "Not Found",
        openGraph: hasOG,
        twitter: hasTwitter,
      },

      security: {
        https:
          targetUrl.startsWith(
            "https://"
          ),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Inspection failed",
    });
  }
});

export default router;