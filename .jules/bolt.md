## 2026-07-10 - Pause Canvas Animations Off-screen
**Learning:** `requestAnimationFrame` hooks used for continuous background canvas animations (like `SoftAurora` and `HeroBackground`) run continuously by default, causing unnecessary CPU/GPU load when scrolled out of view.
**Action:** Use an `IntersectionObserver` to wrap `requestAnimationFrame` loops on canvas animations, pausing the loop when the canvas `entry.isIntersecting` is false, and conditionally resuming it.
