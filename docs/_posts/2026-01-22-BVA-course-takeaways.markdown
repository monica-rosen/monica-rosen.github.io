---
layout: post
title: "The Translation Layer: Turning 'Features' into 'Revenue' (BVA)"
date: 2026-01-22
categories: [Sales Enablement, AI Strategy, ROI]
excerpt: "Founders build features. Buyers buy outcomes. The 'Connective Tissue' is the system that translates one into the other."
---

## The "So What?" Problem

Lately, I've been spending time working with a brilliant Subject Matter Expert (SME) from the technical account management team of my company. He told me that the team knows every line of code in the product. They know exactly *how* it works.

But when customers asked, *"Why would a CFO pay $100k for this?"* ... silence.

This is the **Translation Gap**. And it kills more startups than bad code ever will.

In my work building the "Connective Tissue" for technical sales teams, I’ve realized that my job isn't to teach features. It's to teach **Business Value Assessment (BVA)**. It’s the art of translating technical capabilities into financial metrics.

Luckily, the brilliant SME I worked with got it all figured out into a automated system. It started with value extraction, completed by advanced automation, and built to help technical teams run the business value assessments with their customers to justify the spending they had. 

## How It Automates the "Value Extraction" in the calculator
The spreadsheet uses a "hub and spoke" calculator which is designed to take raw customer inputs, process them against industry benchmarks, and output a polised financial and operational business case.

### The structure with different layers
1.  **Input Layer:** This is where the customer enters their specific data points (e.g., number of users, current costs, etc.).
This is the "Face" of the tool. It is the only place where data entry happens. 

**Key Components**

    - User Input Fields: Clearly labeled cells for customer data entry.
    - Instructional Text: Guidance on what data to enter and where to find it.
    - Questionnaire: Targeted questions for each use case (e.g., "How long does it take to prepare for an audit?")
Data Flow: inputs entered here are mirrored to the specific "Spoke" sheets. 

2.  **Spoke Sheets:** Each spoke sheet corresponds to a specific use case or feature set. These sheets contain the logic and calculations needed to process the input data.
These sheets hold the "Brain" of the BVA. They contain:

**Key Components**

    - Calculation Logic: Formulas that process input data against benchmarks.This is being used as the logic to calculate the "After" state. usually Current_State * (1-specific_factor)
    - Benchmark Data: Industry standards for comparison. (e.g., "30-40% of endpoints have missing agents")
    - Intermediate Results: Breakdown of calculations for transparency.This is also used to map technical wins to business outcomes. E.g., finding a missed device helped risk reduction. 
Data Flow: inputs from the Input Layer are processed here, and results are sent to the Hub sheet.

3.  **Hub Sheet:** The hub sheet aggregates results from all spoke sheets to provide a
comprehensive business case.
This is the "Storyteller" of the BVA. It compiles all the data

**Key Components**

    - Summary Tables: Consolidated results from all spokes. It sums up cost savings accross all active use cases.
    - KPI Improvements: Aggregates percentage improvements (e.g., "Reduced MTTR by X%")
    - Visualizations: Graphs and charts to illustrate key metrics.
    - Executive Summary: A narrative that ties the data together into a compelling story.

### How ROI is Calculated
The ROI calculation is performed in the Hub sheet using the aggregated data from the spoke sheets. The formula used are:
1. Soft Savings:
`ROI (%) = (Hours Spent Before - Hours Spent After) x (Staff Salary / 2000 Hours)`
Where:
- `Hours Spent Before` is the total time spent on tasks before implementing the solution.
- `Hours Spent After` is the total time spent on tasks after implementing the solution.
- `Staff Salary` is the average annual salary of the staff involved in these tasks.
2. Hard Savings:
`ROI (%) = (Unused Licenses Found) x (Avg License Cost)`
Where:
- `Unused Licenses Found` is the number of licenses identified as unused.
- `Avg License Cost` is the average cost per license.
3. Rish Reduction for Quantified Risk:
`ROI (%) = (Total Assets x % Unmanaged Benchmark) = Risk Surface Reduction`
Where:
- `Total Assets` is the total number of assets managed by the customer.
- `% Unmanaged Benchmark` is the industry benchmark percentage for unmanaged assets.

## Using AI to Build the Translation

Traditionally, building a BVA course takes weeks of interviewing experts. Today, I used a different approach to bridge the gap:

1.  **Ingestion:** I fed the raw technical documentation into **NotebookLM**.
2.  **The CFO Persona:** I used a custom **Gemini Gem** trained to act like a cynical CFO.
3.  **The Interrogation:** I asked the AI: *"Here is a feature. Tell me exactly how this reduces risk or increases revenue. If you can't, flag it as 'Fluff'."*

The result? We stripped away 40% of the training material that was just "feature noise" and focused entirely on the 3 metrics that actually drive revenue.

### The Lesson for Founders

If you are a founder running a "Company of One," you don't have a Sales Enablement team to do this for you. You are the SME, the Sales Rep, and the Trainer.

You need a **Translation Layer**. You need an AI workflow that takes your product updates and instantly converts them into a value proposition.

That is the difference between "having a product" and "closing a deal."

*Are you a founder struggling to translate features into revenue? Let's connect - I’m building the systems that turn technical specs into business wins.* 

## Follow my newsletter to learn more about building AI-powered enablement solutions for your field teams
---