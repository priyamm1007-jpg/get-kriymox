import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { detectFramework } from "../utils/detectFramework.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
      },
    });

    const html = response.data;

    const $ = cheerio.load(html);

    const framework =
      detectFramework(html);

    const title =
      $("title").text().trim() ||
      "Unknown";

    const description =
      $('meta[name="description"]').attr(
        "content"
      ) || "";

    const language =
      $("html").attr("lang") ||
      "Unknown";

    const canonical =
      $('link[rel="canonical"]').attr(
        "href"
      ) || "";

    const favicon =
      $('link[rel="icon"]').attr(
        "href"
      ) ||
      $('link[rel="shortcut icon"]').attr(
        "href"
      ) ||
      "";

    const fonts = new Set();

$("link").each((_, el) => {
  const href = $(el).attr("href") || "";

  if (href.includes("fonts.googleapis")) {
    const matches =
      href.matchAll(
        /family=([^:&]+)/g
      );

    for (const match of matches) {
      fonts.add(
        decodeURIComponent(
          match[1]
        ).replace(/\+/g, " ")
      );
    }
  }
});

$("style").each((_, el) => {
  const css = $(el).html() || "";

  const matches =
    css.match(
      /font-family\s*:\s*['"]?([^;'"]+)/gi
    ) || [];

  matches.forEach((font) => {
    const clean =
      font
        .replace(
          /font-family\s*:\s*/i,
          ""
        )
        .replace(/['"]/g, "")
        .trim();

    if (clean.length < 40) {
      fonts.add(clean);
    }
  });
});

    const seo = {
      openGraph:
        $(
          'meta[property^="og:"]'
        ).length > 0,

      twitter:
        $(
          'meta[name^="twitter:"]'
        ).length > 0,

      canonical:
        !!canonical,
    };

    const security = {
      https:
        url.startsWith(
          "https://"
        ),
    };

    const meta = {
      viewport:
        $('meta[name="viewport"]').attr(
          "content"
        ) || "",

      robots:
        $('meta[name="robots"]').attr(
          "content"
        ) || "",

      themeColor:
        $(
          'meta[name="theme-color"]'
        ).attr("content") || "",

      author:
        $('meta[name="author"]').attr(
          "content"
        ) || "",

      generator:
        $(
          'meta[name="generator"]'
        ).attr("content") || "",
    };

    const openGraph = {
      title:
        $(
          'meta[property="og:title"]'
        ).attr("content") || "",

      description:
        $(
          'meta[property="og:description"]'
        ).attr("content") || "",

      image:
        $(
          'meta[property="og:image"]'
        ).attr("content") || "",

      siteName:
        $(
          'meta[property="og:site_name"]'
        ).attr("content") || "",
    };

    const twitter = {
      card:
        $(
          'meta[name="twitter:card"]'
        ).attr("content") || "",

      title:
        $(
          'meta[name="twitter:title"]'
        ).attr("content") || "",

      description:
        $(
          'meta[name="twitter:description"]'
        ).attr("content") || "",

      image:
        $(
          'meta[name="twitter:image"]'
        ).attr("content") || "",
    };
console.log("FONTS:", [...fonts]);
    res.json({
  success: true,

  title,
  description,
  language,
  canonical,
  favicon,

  framework,

  fonts: [...fonts],

  seo,
  security,

  meta,
  openGraph,
  twitter,
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