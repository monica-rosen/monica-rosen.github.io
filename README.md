# Publishing to My GitHub Pages Site

## Getting Started

This README is for **Future Me**.

It documents how this site is structured, how posts are published,
and the rules that must be followed so GitHub Pages renders correctly.

---

## Site Architecture

- Jekyll root: `docs/`
- Pages: `docs/*.md`
- Posts: `docs/_posts/`
- Layouts: `docs/_layouts/`
- Styles: `docs/assets/style.css`

---
## Publishing a Blog Post (IMPORTANT)
All blog posts **must** follow these rules or they will not render.
1. The file must be placed in the `docs/_posts/` directory.
2. The file name must follow the format: `YYYY-MM-DD-title.markdown` (not .md)
3. The file must include the following YAML front matter at the top:

```yaml
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0000
categories: category1 category2
---
```
## How to sanity-check locally (lightweight, optional)

If you **don’t** want to run Jekyll locally, skip this section.

If you **do** want confidence before pushing:

```bash
cd docs
bundle exec jekyll serve
```

## Then visit:
http://localhost:4000

## How to push it to GitHub
```
git add .
git commit -m "Add new blog post"
git push origin main
```
## Once pushed:
1. Wait a few minutes for GitHub Pages to build your site.
2. Visit your site at `https://monica-rosen.github.io/` to
see your new post live.

## Resources

- [GitHub Pages Documentation](https://pages.github.com/)
- [Jekyll Documentation](https://jekyllrb.com/) (if using Jekyll)
