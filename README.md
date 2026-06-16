# Rithesh's Blog

A static personal blog built with Astro. Posts live in `src/content/posts` as
Markdown files. Static assets such as images live in `public/images`.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The static site is emitted to `dist`.

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. In GitHub, enable Pages with
the source set to GitHub Actions.

For a custom domain such as `rithesh.dev`, add a repository variable named
`SITE` with the full URL and keep `BASE_PATH` as `/`.

For a project page such as `https://username.github.io/blog`, set:

```txt
SITE=https://username.github.io
BASE_PATH=/blog
```
