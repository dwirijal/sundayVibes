## 2024-07-16 - [Fix Layout Thrashing in Animations]
**Learning:** [Alternating DOM reads (like `getBoundingClientRect()`) and DOM writes (like `style.setProperty()` or `gsap.to()`) inside a loop causes a critical frontend performance bottleneck known as Layout Thrashing (Forced Synchronous Layout). The browser is forced to synchronously recalculate layout on every iteration.]
**Action:** [When animating or updating multiple DOM elements based on their dimensions/positions, always batch all DOM reads first into an array or object, and then perform all DOM writes in a subsequent loop.]
