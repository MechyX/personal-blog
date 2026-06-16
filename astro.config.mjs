import { defineConfig } from "astro/config";

const site = process.env.SITE ?? "https://mechyx.github.io/personal-blog";
const base = process.env.BASE_PATH ?? "/personal-blog";

export default defineConfig({
  site,
  base,
  trailingSlash: "never"
});
