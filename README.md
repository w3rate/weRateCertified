How to run the App

Install deps with `pnpm i`
Dev run with `pnpm dev`
Build `pnpm build`
Start (after build) `pnpm start`

Build while having one instance running in a dev mode will commonly crash.

Rules:
We dont use Next/Image in cases other then third-party images we cannot optimize.
We dont use inline svg and Lucide icons.
We use only highly optimized svg images (not raster wrapped in svg).
We use only one highly optimized variable font.
Srever components as much as possible.
No extra dependencies, no `import *` cases.

Use `pnpm format` then `pnpm lint` befroe you push.
