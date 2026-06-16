import { defineConfig } from "astro/config";

const site = process.env.SITE ?? "https://rithesh.xyz";
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site,
  base,
  trailingSlash: "never"
});
