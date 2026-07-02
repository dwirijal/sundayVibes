## 2024-03-24 - [Deferring iframe loads]
**Learning:** Loading multiple TikTok and YouTube iframes simultaneously severely degraded Time to Interactive. The `loading="lazy"` attribute is highly effective for `iframe`s that are below the fold (e.g. in a Portfolio component).
**Action:** Use `loading="lazy"` for all embedded video `iframes` unless they are explicitly above the fold.
