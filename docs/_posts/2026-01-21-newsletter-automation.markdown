---
layout: post
title: "The Pivot from Substack to Ghost: An Automation Journey"
date: 2026-01-21
---

Ever since I set up the github action workflow, I've been thinking about using a newsletter tool to automate my blog post over to my audience. 

I wanted a way to write my blog posts in Markdown and have them automatically appear in my newsletter. While Substack is a great platform, its lack of a developer-friendly API makes automation feel like a "hack." I've learned that Ghost has an official API and can be used to create another worklow from markdown to html. So I've decided to give it a try.

Today, I moved from "manual vibes" to "technical enablement." 

### What I Learned
1. **API vs. Scraping:** Using a headless browser (like Playwright) to mimic a human is cool, but using an official **Admin API** (like Ghost's) is professional and stable.
2. **Data Transformation:** I learned that my Jekyll "Front Matter" (the stuff between the `---`) needs to be peeled off before a blog platform can read the story.
3. **GitHub Actions:** My GitHub repository isn't just a storage box; it's a tiny computer that can run scripts for me every time I hit 'Save'.

### The Setup
I'm now using a Node.js script with `gray-matter` and `marked` to translate my local Jekyll files into Ghost-ready HTML. 

If you see this post on my newsletter, the automation worked. 🚀
Follow me to get the most updated content and resources on AI Enablement.