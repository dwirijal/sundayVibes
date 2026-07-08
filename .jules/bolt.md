## 2024-07-08 - [HeroBackground Optimization]
**Learning:** Performing invariant trigonometric operations (`Math.sin`, `Math.cos`) inside high-frequency animation loops (`requestAnimationFrame`) for multiple elements (like particles) scales O(n) needlessly, causing performance drops on mobile devices due to redundant calculations.
**Action:** Always hoist variables that rely on static or frame-invariant properties (like time-based rotations) outside the `forEach` iteration loop inside `requestAnimationFrame`.
