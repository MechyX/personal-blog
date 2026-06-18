# Post Guidelines

## Frontmatter

Every post must include:

- `title`: concise, title case preferred
- `description`: one sentence, suitable for previews and RSS
- `pubDate`: `YYYY-MM-DD`
- `section`: `tech` for technical posts, `not-tech` for non-technical posts
- `draft`: optional, defaults to `false`

## Structure

- Do not add an `# h1` inside the post body; the layout renders the title.
- Use `## h2` for major sections.
- Keep headings short and sentence-like.
- Prefer paragraphs over deeply nested lists.

## Visual Rules

- All post titles must use the same size through the shared layout/CSS.
- Do not add per-post title styling.
- Do not add dividers, cards, badges, or row backgrounds to post lists.
- Do not add hover motion or animation.
- Dates should stay visually secondary.

## Content Rules

- Posts should be curated, not casual notes.
- A post should have a clear point or argument.
- Tech posts use `section: tech`; non-technical posts use `section: not-tech`.
- Use images only when they add meaning, not decoration.

## Assets

- Put local images under `public/images/`.
- Use descriptive filenames.
- Prefer one strong image over several decorative images.
