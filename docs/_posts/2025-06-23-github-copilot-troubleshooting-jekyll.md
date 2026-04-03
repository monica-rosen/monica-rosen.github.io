---
layout: post
title: "Troubleshooting My Jekyll GitHub Pages Site with GitHub Copilot"
date: 2025-06-23 01:55:00 +0000
categories: blog
---

Creating a personal website with Jekyll and GitHub Pages can be a rewarding experience, but it's not always smooth sailing. In this post, I’ll summarize the journey of building my GitHub Pages site, with a special focus on how I used GitHub Copilot as my troubleshooting and problem-solving partner.

## Getting Started: The Basics

The goal was to set up a Jekyll-powered blog hosted on GitHub Pages. I started by creating a new repository following the naming convention for GitHub Pages, learned about the necessary configuration (`_config.yml`), and set up the basic folder structure including `_posts` for blog entries.

## Navigating Common Pitfalls

### 1. Homepage Display Issues

One of the first challenges I faced was with the homepage not displaying as expected. After some trial and error, I realized the problem was with the front matter in my pages. Copilot quickly pointed out the correct format for front matter and how it affects page rendering.

### 2. Broken Links (404 Errors)

After fixing the homepage, I noticed internal links were leading to 404 errors. Copilot helped me understand the difference between `url` and `baseurl` in `_config.yml`, and how these settings depend on whether the site is a user/organization site or a project site. With Copilot’s guidance, I adjusted my `_config.yml` and updated my links to use Jekyll’s `relative_url` filter, ensuring they worked regardless of site location.

### 3. Repository Naming and Site URL

I was confused about why my site was appearing at a subpath instead of the main GitHub Pages domain. Copilot explained the difference between user/organization sites and project sites, emphasizing the importance of naming the repository correctly (`username.github.io` for user/org sites), and clarified the expected site URL for each scenario.

### 4. Creating and Publishing Blog Posts

I wanted to add new blog posts, but sometimes they wouldn’t appear on the site. Copilot provided a thorough checklist: verifying the `_posts` folder name, the filename convention, correct front matter, and waiting for GitHub Pages to rebuild. This step-by-step troubleshooting made it easy to spot and fix mistakes.

### 5. Enhancing the Blog

Once the basics were working, I asked Copilot how to add features like a to-do list app, images in blog posts, and even a comments section. Copilot provided ready-to-use code snippets and layout templates, making it simple to extend the site’s functionality.

## Problem Solving with GitHub Copilot

Throughout the project, GitHub Copilot was an invaluable assistant. Here’s how it helped:

- **Instant Answers:** Whenever I hit a roadblock, Copilot provided clear explanations, code samples, and configuration advice.
- **Troubleshooting Checklists:** For every issue, Copilot gave me actionable checklists to systematically diagnose and resolve problems.
- **Customization Tips:** From adding images to integrating third-party comments, Copilot offered practical examples tailored to my project.
- **Learning as I Build:** Instead of just solving problems, Copilot explained the reasoning behind each fix, helping me learn the “why” and not just the “how.”

## Conclusion

Building a Jekyll site on GitHub Pages is a fantastic way to learn about web development and static site generation. With GitHub Copilot’s help, I was able to overcome common issues quickly, understand best practices, and expand my site with new features. If you’re working on a similar project, don’t hesitate to ask Copilot for troubleshooting advice—it’s like having an expert by your side, 24/7.

---
