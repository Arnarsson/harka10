# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "H HARKA" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e7] [cursor=pointer]: H
        - generic [ref=e8] [cursor=pointer]: HARKA
      - navigation [ref=e9]:
        - link "Demo" [ref=e10] [cursor=pointer]:
          - /url: /demo/interactive-learning
        - link "Resources" [ref=e11] [cursor=pointer]:
          - /url: /toolkit
        - link "Pricing" [ref=e12] [cursor=pointer]:
          - /url: "#pricing"
      - generic [ref=e13]:
        - button "Sign In" [ref=e14] [cursor=pointer]
        - button "Get Started" [ref=e15] [cursor=pointer]
  - main [ref=e16]
  - region "Notifications (F8)":
    - list
```