---
layout: post
title: "How I Turned One API Lesson into a Portable AWS Learning Hub"
date: 2026-08-20 16:30:00 -0400
categories: aws learning-design tech-enablement build-in-public
permalink: /2026/08/20/building-a-portable-aws-learning-hub.html
---

I started with a fairly contained idea: build an interactive page that teaches API basics.

The first lesson needed to explain what an API is without making people feel like they had wandered into a computer science lecture. Learners would read a concept, try a simulated request, see a response, work through a payment-style success and decline scenario, answer a knowledge check, and download a completion badge.

That one lesson quickly raised a bigger question:

> If I keep creating technical learning experiences like this, where should they live—and how do I avoid rebuilding the foundation every time?

That is how a single API lesson became the beginning of a **tech enablement learning hub**.

This post walks through what I built, the design choices I made, the AWS architecture behind it, and the parts that are still in progress.

---

## The experience I wanted to create

The goal was not to make another page full of definitions.

I wanted the learner to move through a small, complete experience:

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:24px 0;">
  <div style="padding:16px;border:1px solid #d97757;border-radius:10px;"><strong>1. Learn</strong><br><small>Understand the idea in plain language</small></div>
  <div style="padding:16px;border:1px solid #6a9bcc;border-radius:10px;"><strong>2. Try</strong><br><small>Interact with a realistic API workflow</small></div>
  <div style="padding:16px;border:1px solid #d97757;border-radius:10px;"><strong>3. Test</strong><br><small>Complete a short knowledge check</small></div>
  <div style="padding:16px;border:1px solid #6a9bcc;border-radius:10px;"><strong>4. Keep</strong><br><small>Download a completion badge</small></div>
</div>

The lesson uses familiar payment test-card examples so learners can see that the same request can produce different responses:

- `4242 4242 4242 4242` demonstrates a successful payment.
- `4000 0000 0000 0002` demonstrates a declined payment.

The point is not to teach payment processing. It is to make API behavior tangible: a request goes in, a system evaluates it, and a structured response comes back.

---

## Design choice #1: Teach through interaction

My first non-negotiable was that the page should behave more like a guided lab than a blog post.

Technical concepts often become intimidating because learners are asked to absorb vocabulary before they have a mental model. I reversed that sequence wherever possible:

1. Start with a familiar metaphor.
2. Show the request and response.
3. Let the learner change something.
4. Explain what changed and why.
5. Check understanding immediately.

This is also why I added four questions at the end. A knowledge check turns passive reading into retrieval practice, while the downloadable badge gives the learner a small but concrete sense of completion.

The badge is intentionally lightweight. It is not a credential. It is a quick reward that says: *I finished this and can explain the basics.*

---

## Design choice #2: Give technical information a visual grammar

I chose a dark visual system with three tightly controlled colors:

| Function | Color | Purpose |
|---|---|---|
| Background | `#141413` | Keeps the experience focused and reduces visual noise |
| Orange | `#d97757` | Headlines, key ideas, and human-facing guidance |
| Blue | `#6a9bcc` | Code, API terms, responses, and technical details |

The important decision was not simply choosing orange and blue. It was assigning each color a job.

Orange helps learners find the narrative. Blue signals, “this is the technical object.” That distinction reduces the amount of explanation the interface has to provide.

I also avoided random decorative color, because in a learning interface, color should teach hierarchy—not compete with it.

---

## Design choice #3: Build a hub, not a one-off page

Once the API lesson worked, I decided the long-term home should be:

**learn.theconnectivetissue.co**

The blog could remain at:

**blog.theconnectivetissue.co**

This separation reflects two different user intentions:

- The **blog** is where readers follow ideas, reflections, and build notes.
- The **learning hub** is where learners complete structured, interactive experiences.

The repository was renamed to **tech-enablement-learning-hub** so it would not be permanently tied to the first API lesson. The API course can become one route inside a larger collection of technical topics.

A simplified future structure looks like this:

```text
learn.theconnectivetissue.co
│
├── /                         Learning hub home
├── /api-basics/              Interactive API foundations
├── /aws-basics/              Future AWS learning path
├── /automation-basics/       Future automation lessons
└── /subscribe/               Subscriber registration
```

That naming decision may look small, but it changes the architecture from “a page I built” to “a system I can keep extending.”

---

## Design choice #4: Keep the learning content portable

The first version was built and hosted quickly so I could validate the experience. But I did not want the long-term site to depend on one subscription, one proprietary editor, or one hosting environment.

So the hub was converted into a **portable static build**.

In practical terms, that means the source can produce ordinary HTML, CSS, and JavaScript files. Those files can be hosted in many places without requiring a continuously running server.

Why static?

- It is inexpensive to host.
- It has a smaller security surface.
- It is fast to deliver globally.
- It is easy to back up and move.
- It fits educational content that does not need a server for every page view.

Portability was not an afterthought. It became one of the product requirements.

---

## Why I chose S3 and CloudFront instead of Amplify

I wanted to learn AWS while building something useful, but I also wanted the final setup to remain understandable.

I considered AWS Amplify and decided against it. Amplify can remove setup work, but for this project I wanted to see the infrastructure pieces directly.

I chose:

- **Amazon S3** to store the built static site.
- **Amazon CloudFront** to deliver it quickly and securely.
- **AWS Certificate Manager (ACM)** for HTTPS.
- **GitHub Actions** for repeatable deployments.
- **AWS CloudFormation** to describe the infrastructure as code.

Here is the core delivery path:

```text
                    git push
Developer ─────────────────────────► GitHub
                                        │
                                        │ GitHub Actions builds the site
                                        ▼
                                   Amazon S3
                                   private files
                                        │
                                        ▼
Learner ── learn.theconnectivetissue.co ──► CloudFront
                                            │
                                            ├── HTTPS certificate from ACM
                                            └── cached global delivery
```

One detail matters here: the S3 bucket does not need to be a public website. CloudFront can be the controlled front door while the files remain private behind it.

That is both cleaner and safer than exposing the storage bucket directly.

---

## Design choice #5: Automate deployment without storing AWS passwords

A manual upload is useful for proving that the site works. It is not a good publishing workflow.

The repeatable workflow is:

```text
edit → review → merge → build → upload → refresh CloudFront
```

GitHub Actions handles the build and deployment steps. The preferred AWS connection uses **OpenID Connect (OIDC)**, which lets GitHub request short-lived AWS access when a workflow runs.

This avoids placing a permanent AWS access key inside GitHub.

The result is a workflow I can understand:

1. I update the learning hub in GitHub.
2. GitHub builds the static site.
3. The built files are synchronized to S3.
4. CloudFront is refreshed so visitors receive the new version.

That is a small CI/CD pipeline, but it teaches the same underlying concepts used in larger production systems.

---

## Adding subscriber registration without another SaaS subscription

I also wanted a custom signup experience for the learning hub.

Instead of adding another newsletter platform immediately, I chose an AWS-native direction:

- **Amazon API Gateway** receives the signup form request.
- **AWS Lambda** validates and processes it.
- **Amazon DynamoDB** stores subscriber records.
- **Amazon SES** sends confirmation or welcome email.
- **Amazon CloudWatch** records logs and operational signals.

The intended flow is:

```text
Signup form
    │
    ▼
API Gateway ──► Lambda ──► DynamoDB
                   │
                   └──────► Amazon SES ──► Confirmation email
```

This is where the project crosses from a purely static website into a small serverless application.

The static pages stay simple and inexpensive. Dynamic behavior is added only where it is needed.

---

## What is live, and what is still in progress

A useful build log should distinguish completed work from planned work.

### Completed

- The API basics learning experience was designed and built.
- The success and decline test workflows were added.
- Four knowledge-check questions and a downloadable badge were added.
- The project was converted into a portable static build.
- An S3 bucket and CloudFront distribution were created through CloudFormation.
- The CloudFront version of the learning experience was tested.
- The blog was moved to `blog.theconnectivetissue.co` and is running on GitHub Pages.
- The learning repository was renamed for the broader hub direction.
- The GitHub deployment workflow and AWS-native subscriber architecture were prepared.

### Still being finished

- Merge the broader learning-hub and subscriber changes into the main branch.
- Complete the custom-domain cutover for `learn.theconnectivetissue.co`.
- Finish Amazon SES domain verification.
- Test the subscriber flow end to end.
- Confirm monitoring, failure handling, and unsubscribe behavior before inviting real subscribers.

At the moment, SES domain verification is the visible blocker in the subscriber flow. The rest of the learning content does not need to wait for email verification, which is another advantage of keeping the static site and subscriber service loosely connected.

---

## The whole system at a glance

```text
                           THE CONNECTIVE TISSUE
                                      │
                   ┌──────────────────┴──────────────────┐
                   │                                     │
        blog.theconnectivetissue.co         learn.theconnectivetissue.co
                   │                                     │
            GitHub Pages                         Amazon CloudFront
                   │                                     │
          Jekyll + Markdown                         private S3 bucket
                                                         │
                                              static learning modules
                                                         │
                                             optional signup form
                                                         │
                                      API Gateway → Lambda → DynamoDB
                                                         │
                                                        SES
```

The blog and learning hub share a brand, but they do not share the same deployment system. That is intentional.

Each platform is doing the job it is best suited for:

- GitHub Pages publishes simple Markdown writing.
- S3 and CloudFront serve the interactive static learning hub.
- Serverless AWS services handle subscriber data and email.

---

## What I learned from the build

The biggest lesson was not how to configure a bucket or create a distribution.

It was how many product decisions are hiding inside what sounds like a hosting decision.

Choosing where a site lives also means choosing:

- who owns the source,
- how updates are reviewed,
- how a domain reaches the right service,
- where certificates come from,
- how credentials are protected,
- how failures are observed,
- how easily the whole thing can move later.

I also learned that “AWS-native” does not automatically mean “simple.” It can reduce recurring vendor subscriptions and expose useful building blocks, but it also makes me responsible for connecting those blocks correctly.

For this project, that tradeoff is worth it because learning the system is part of the goal.

---

## My guiding principle: abstraction should be a choice

I am not against managed platforms. I used one to get the first version moving quickly.

But I want to understand what sits underneath the convenience.

By moving this project into a portable build, GitHub, and visible AWS components, I can now point to each part of the system and explain its job.

That is exactly what I want the learning hub to help other people do too:

> move from “the technology worked” to “I understand why it worked.”

The first course teaches APIs.

The build behind it is teaching me infrastructure, deployment, DNS, identity, security, and product architecture.

That feels like the right foundation for a tech enablement learning hub.
