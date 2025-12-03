---
name: Bug Report
about: "Report a bug in OmniDistribute"
title: "[BUG] <Your concise bug summary>"
labels: "bug"
assignees: ""

body:
  - type: markdown
    attributes:
      value: |-
        ### 🐞 Bug Report

        Thank you for reporting a bug! Please provide as much detail as possible to help us diagnose and fix the issue.

        **Repository:** [`OmniDistribute-Content-Publishing-Automation-Engine`](https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine)

        **Apex Standards:** This project adheres to the **Apex Technical Authority** standards for Zero-Defect, High-Velocity, Future-Proof development.

---        
  - type: markdown
    attributes:
      value: |-
        ### 🚨 **Before Reporting**

        1.  **Check Existing Issues:** Please search the existing [Issues](https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/issues) to see if this bug has already been reported.
        2.  **Review Documentation:** Ensure the behavior you're encountering is not a misunderstanding of the intended functionality as described in the [README](https://github.com/chirag127/OmniDistribute-Content-Publishing-Automation-Engine/blob/main/README.md).

---        
  - type: input
    id: title
    attributes:
      label: "🚀 Issue Summary"
      description: "A brief, clear, and concise title for the bug."
      placeholder: "e.g., Content fails to publish to Dev.to with 401 error"
    validations:
      required: true
  - type: dropdown
    id: severity
    attributes:
      label: "🔥 Severity"
      description: "How severe is the bug?"
      options:
        - "Critical: Blocks core functionality"
        - "Major: Significant impact, but a workaround exists"
        - "Minor: Minor impact, UI glitch, or inconvenience"
        - "Cosmetic: Typo or visual issue"
      default: 2
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: "📝 Detailed Description"
      description: "Provide a detailed explanation of the bug. Include steps to reproduce, expected behavior, and actual behavior."
      placeholder: |
        **Steps to Reproduce:**
        1.  Go to...
        2.  Click on...
        3.  Enter...

        **Expected Behavior:**
        [Describe what you expected to happen.]

        **Actual Behavior:**
        [Describe what actually happened.]

        **Environment:**
        *   OS: [e.g., Windows 11, macOS Sonoma 14.2, Ubuntu 22.04]
        *   Node.js Version: [If applicable, e.g., v20.10.0]
        *   Browser (if applicable): [e.g., Chrome 120.0.6099.109, Firefox 115.0.2]
        *   OmniDistribute Version: [e.g., v1.0.0, or specify if running from source]

        **Screenshots/Logs (Optional):**
        [Attach any relevant screenshots or log snippets that might help diagnose the issue.]
      renderAllowsHtml: true
    validations:
      required: true
  - type: textarea
    id: additional_context
    attributes:
      label: "💡 Additional Context (Optional)"
      description: "Any other context about the problem. Platform configurations, specific article content, etc."
      placeholder: "e.g., This bug occurs only when publishing articles with embedded images."
    validations:
      required: false
