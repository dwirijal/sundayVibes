## 2023-10-27 - Fix Layout Thrashing in Dock
**Learning:** Interleaving DOM reads (`getBoundingClientRect`) and writes (`style.setProperty`) inside a loop causes Forced Synchronous Layout, degrading performance, especially in frequently firing events like mousemove.
**Action:** Always batch all DOM reads first, store the values, and then perform DOM writes in a separate loop.
