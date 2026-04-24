# Imago Documentation — Style Guide

This repo is GitHub Pages (static HTML, no build step). Every doc is a self-contained `.html` file deployed by pushing to `main`.

## Catppuccin Mocha Palette (mandatory)

All docs use Catppuccin Mocha. These are the canonical values — do not substitute.

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0b0b14` | Page background |
| `--bg-card` / `--surface` | `#11111b` | Card/section backgrounds, subgraph fills |
| `--bg-card-hover` / `--surface2` | `#181825` | Hover states, secondary surfaces |
| `--tab-active` | `#1e1e2e` | Active tab background, **node fills in diagrams** |
| `--text` | `#cdd6f4` | Primary text, **node text in diagrams** |
| `--text-muted` | `#a6adc8` | Secondary text |
| `--text-dim` | `#6c7086` | Tertiary/disabled text, dim diagram strokes |
| `--border` | `#313244` | Borders, dividers |
| `--border-light` | `#45475a` | Lighter borders |
| `--blue` | `#89b4fa` | Core/infrastructure elements |
| `--green` | `#a6e3a1` | Portable/safe/success elements |
| `--orange` | `#fab387` | Warning/bridge elements |
| `--red` | `#f38ba8` | Danger/coupling/channel elements |
| `--accent` / `--lavender` | `#b4befe` | Primary accent, headings |
| `--mauve` | `#cba6f7` | User/external actor, line color |
| `--teal` | `#94e2d5` | Gateway/lifecycle elements |
| `--yellow` | `#f9e2af` | Provider elements |
| `--discord` | `#5865F2` | Discord-specific nodes |

## Mermaid Diagram Rules

These are non-negotiable. Every diagram in every doc must follow them.

### Node styling

Every node gets an explicit style. No exceptions — unstyled nodes inherit Mermaid defaults that clash with the dark theme.

```
style NodeID fill:#1e1e2e,stroke:#COLOR,stroke-width:2px,color:#cdd6f4
```

- `fill` is always `#1e1e2e` (one shade lighter than card background)
- `stroke` uses a palette color appropriate to the node's semantic role
- `stroke-width` is always `2px`
- `color` is always `#cdd6f4` (primary text)

### Subgraph styling

Subgraphs get a darker fill than their contained nodes for visual hierarchy:

```
style SubgraphID fill:#11111b,stroke:#COLOR,stroke-width:2px,color:#cdd6f4
```

### classDef alternative

For diagrams with many nodes sharing a role, `classDef` + `class` is acceptable:

```mermaid
classDef danger stroke:#f38ba8,stroke-width:2px,fill:#1e1e2e,color:#cdd6f4
class nodeName danger
```

### Arrow rules

1. **Never target subgraph IDs with arrows.** Target a specific node inside the subgraph instead.
   - Bad: `Tools -.->|register| Runtime` (where Runtime is a subgraph)
   - Good: `Tools -.->|register| Events` (where Events is a node inside Runtime)
2. **No back-arrow cycles.** If data flows A→B→C, don't add C→A. Use dashed lines for return paths if needed: `C -.->|result| A`
3. **Top-to-bottom flow.** Use `graph TB` or `graph TD`. Avoid `graph LR` except for simple 2-3 node linear flows.

### Label rules

1. Labels must be **20 characters or fewer**
2. No `<br/>` in node labels — they cause overlapping text
3. Maximum **5-6 nodes per subgraph** for readability
4. Use short descriptive names: `"Auth"` not `"Authentication Pipeline"`

### Mermaid initialization

All docs must initialize Mermaid with these theme variables:

```js
mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1e1e2e',
    primaryTextColor: '#cdd6f4',
    primaryBorderColor: '#89b4fa',
    lineColor: '#cba6f7',
    secondaryColor: '#181825',
    tertiaryColor: '#11111b',
    noteBkgColor: '#181825',
    noteTextColor: '#cdd6f4',
    noteBorderColor: '#45475a',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif'
  },
  flowchart: { nodeSpacing: 30, rankSpacing: 50, padding: 15, useMaxWidth: true },
  sequence: { actorMargin: 80, width: 180, messageMargin: 50, useMaxWidth: true, wrap: true }
});
```

## HTML Structure Conventions

### Document skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Imago Phase N — Title</title>
  <style>/* Catppuccin variables + component styles */</style>
</head>
<body>
  <div class="page-header">...</div>
  <div class="global-toggle-bar">...</div>  <!-- if Current/Proposed tabs -->
  <div class="container">
    <!-- Section cards -->
  </div>
  <footer class="page-footer">...</footer>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
  <script>/* Mermaid init + tab logic */</script>
</body>
</html>
```

### Section card pattern (for architecture docs with tabs)

```html
<div class="section-card" id="section-id">
  <div class="section-heading">
    <h2><span class="sec-num">N.</span> Section Title</h2>
  </div>
  <div class="tab-bar">
    <button class="tab-btn active" onclick="switchTab(this, 'section-id-current')">
      <span class="tab-dot tab-dot-current"></span>Current
    </button>
    <button class="tab-btn" onclick="switchTab(this, 'section-id-proposed')">
      <span class="tab-dot tab-dot-proposed"></span>Proposed
    </button>
  </div>
  <div class="tab-panel active" id="section-id-current" data-tab="current">
    <h3>Current Title</h3>
    <p>Description</p>
    <div class="mermaid-wrap"><pre class="mermaid">
      <!-- diagram here -->
    </pre></div>
  </div>
  <div class="tab-panel" id="section-id-proposed" data-tab="proposed">
    <h3>Proposed Title</h3>
    <!-- ... -->
  </div>
</div>
```

### Info/warning callouts

```html
<div class="note">Informational note</div>
<div class="note note-warn">Warning note</div>
```

### Status tags

```html
<span class="tag tag-portable">Portable</span>
<span class="tag tag-rearch">Re-architect</span>
<span class="tag tag-delete">Delete</span>
```

## Index page

When adding a new doc, update `index.html`:
- New/active docs get the `.card` class with a `badge-new` span
- Superseded docs get `style="opacity: 0.5; border-style: dashed;"` and a red SUPERSEDED badge
- Cards are ordered newest-first
- Footer date reflects the most recent update

## Deployment

Push to `main`. GitHub Pages serves from root. No CI/CD, no build step, no Jekyll.
