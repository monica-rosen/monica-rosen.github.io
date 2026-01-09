---
layout: post
title: "I Broke My GitHub Pages Site (and Learned How Jekyll Actually Works)"
---

Yesterday I did something simple (or at least I thought it was simple).

I decided to “clean up” my GitHub Blog site by adding custom Jekyll layouts.

What followed was a **full-site disappearance**, several moments of self-doubt, and a crash course in how Jekyll *really* works once you remove the training wheels.

This post is a field report from the debugging trenches.

---

## The Symptom: Everything Went Blank

No errors.
No warnings.
No failed builds.

Just… white pages.

My About page?
Gone.

My blog posts?
Gone.

My immediate thought:
> “Did I just nuke my site?”

Spoiler: no.  
But I *did* remove a bunch of invisible scaffolding I didn’t realize I was relying on.

---

## Phase 1: CSS Panic (Red Herring)

My first instinct was styling.

I had just removed the default Jekyll theme and added my own layouts, so maybe I messed up CSS?

I checked:
- Text color
- Background color
- CSS loading in DevTools

I even added the nuclear test:

```css
body {
  color: red !important;
}
Still blank.

That was the clue:
👉 This was not a CSS problem.

Phase 2: Understanding Layout Chaining (The Real Culprit)

Here’s the thing no one tells you clearly:

Jekyll layouts do not auto-compose.

You must explicitly chain them.

I had:

- default.html
- page.html
- post.html

But my page.html originally looked like this:
```html
---
layout: default
---
<section>
  <h1>{{ page.title }}</h1>
  {{ content }}
</section>
```
I changed it to look like this:
```html
---
layout: default
---

<article>
  {{ content }}
</article>
```
I changed it and suddenly, 
the About page came back to life. 
However, 
my blog posts were still missing.
The reason?

This is where Jekyll gets very strict.

Posts must follow all of these rules or they fail silently:

Must live in _posts/

Must be named YYYY-MM-DD-title

Must have valid front matter

Must use a supported extension

That’s when I noticed something subtle:

Working posts: .markdown

Broken post: .md
I had renamed one post to .markdown, and that was the problem.

The .md extension is not supported by Jekyll for posts, and it silently fails to render.
Changing it back to .markdown fixed the issue immediately.

## Key Takeaways
1. Jekyll is very particular about file structure and naming conventions.
2. Layouts must be explicitly chained; they do not auto-compose.
3. Always check the file extension and front matter when debugging missing content.
4. When in doubt, check the Jekyll documentation for supported file types and structure.
5. Use DevTools to check for CSS issues, but remember that not all problems are styling-related.
6. When you break something, take a step back and methodically check each layer of your site’s architecture.
7. Don’t be afraid to experiment and learn from mistakes; that’s how you truly understand how things work.

## Final Thoughts
This experience was a humbling reminder that even tools designed to be user-friendly have their quirks and complexities.
It’s easy to assume that everything will just work, but when it doesn’t, it’s an opportunity to learn the underlying mechanics.
In the end, I’m grateful for the experience because it deepened my understanding of Jekyll and how GitHub Pages works.

If you’re a technologist writing in public:

Breaking your own site once is not a failure.

It’s the moment you stop renting abstraction
and start owning the stack.

And honestly?

That’s where the fun begins.



