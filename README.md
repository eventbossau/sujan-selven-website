# Sujan Selven website

Next.js port of the design-system click-through kit. Design, layout, copy, and components are carried over as-is — only the runtime changed (CDN React → Next.js App Router).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Kit equivalent |
|---|---|
| `/` | `#home` |
| `/about` | `#about` |
| `/priorities` | `#priorities` |
| `/priorities/housing\|energy\|cost\|community` | `#priorities/...` |
| `/community` | `#community` |
| `/news` | `#news` |
| `/news/article` | `#news/article` |
| `/get-involved` | `#get-involved` |
| `/contact` | `#contact` |

## What’s reused from the design system

- Tokens and component CSS (`styles/`)
- React components (`components/`)
- Fonts and brand assets (`public/fonts`, `public/assets`)
- Kit content model (`lib/data.js`)

The original design-system folder is unchanged and remains the visual source of truth.
