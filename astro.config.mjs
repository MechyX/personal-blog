import { defineConfig } from "astro/config";

const site = process.env.SITE ?? "https://rithesh.dev";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "never"
});
