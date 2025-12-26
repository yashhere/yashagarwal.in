# ExcalidrawSVG Component

A theme-aware Excalidraw diagram component for MDX files with automatic dark mode support.

## Features

- **Automatic Theme Switching**: Diagrams automatically adapt to light/dark mode
- **Responsive**: SVGs scale properly on all devices
- **Interactive Hover Effects**: Elements show subtle opacity changes on hover
- **No External Dependencies**: Works with SVG exports from Excalidraw

## Usage in MDX Files

### 1. Export your Excalidraw diagram

1. Create your diagram in Excalidraw (https://excalidraw.com)
2. Go to **File → Export Image**
3. Select **SVG** format
4. **Important**: Uncheck "Background" option
5. Save the SVG file to your MDX note directory

### 2. Import and use in MDX

```mdx
---
title: My Note with Diagrams
# ... other frontmatter
---

import ExcalidrawSVG from "../../../components/content/ExcalidrawSVG.astro"
import myDiagram from "./my-diagram.svg"

<ExcalidrawSVG
  src={myDiagram}
  alt="System architecture diagram"
  caption="High-level overview of the system"
/>
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `ImageMetadata \| string` | Yes | The SVG file (imported or path) |
| `alt` | `string` | Yes | Alternative text for accessibility |
| `caption` | `string` | No | Optional caption displayed below the diagram |
| `class` | `string` | No | Additional CSS classes |

## How It Works

The component intelligently handles colors for dark mode:

1. **Loads the SVG file** from your import
2. **Detects colored elements** - automatically identifies accent colors (non-grayscale)
3. **Smart text handling**:
   - Text inside colored boxes → keeps original color (black, readable on colored backgrounds)
   - Text outside colored boxes → makes theme-aware (uses `var(--foreground)`)
4. **Shape handling** - black/white shapes become theme-aware
5. **Makes responsive** - SVG scales to 100% width

### Theme Integration

- **Automatic color detection**: No need to specify which colors to preserve
- **Preserves colored boxes**: Any non-grayscale fill is treated as an accent color
- **Text visibility**: Text adapts based on its position relative to colored shapes
- **Uses theme variables**: `var(--foreground)` for theme-aware elements

## Example Directory Structure

```
src/content/notes/2025-01-01-my-post/
├── index.mdx
├── my-diagram.svg
└── other-assets.png
```

## Styling Customization

If you need to customize the appearance, you can:

1. Add custom classes via the `class` prop
2. Override the global styles in your CSS:

```css
/* Custom styling example */
.excalidraw-container {
  /* Your custom styles */
}
```

## Tips

- Keep diagrams simple for better readability in both themes
- Test your diagrams in both light and dark modes
- Export without background for best results
- Use descriptive alt text for accessibility

## Troubleshooting

**Diagram not showing?**
- Ensure the SVG was exported without background
- Check that the import path is correct
- Verify the SVG file exists in the correct directory

**Colors look wrong?**
- Make sure you're not using complex gradients (they may not adapt well)
- Try re-exporting the diagram with simpler colors
- Check that your theme variables are properly configured

**Hover effects not working?**
- Clear your browser cache
- Check that JavaScript is enabled
- Verify the script is loading (check browser console)
