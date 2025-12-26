#!/usr/bin/env node

/**
 * Fix Excalidraw SVG colors for dark mode compatibility
 *
 * This script replaces black/white colors with theme-aware grays that work
 * in both light and dark modes.
 *
 * Usage: node scripts/fix-excalidraw-svg-colors.js <input-svg> [output-svg]
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Color mappings
const COLOR_REPLACEMENTS = {
  // Black text -> Dark gray (visible in both themes)
  '#000000': '#404040',
  '#000': '#404040',

  // Near-black -> Dark gray
  '#1e1e1e': '#404040',

  // White -> Light gray (visible in both themes)
  '#ffffff': '#d0d0d0',
  '#fff': '#d0d0d0',
};

// Colors to preserve (Excalidraw accent colors)
const PRESERVE_COLORS = [
  '#b2f2bb', // green
  '#d0bfff', // purple
  '#e03131', // red
  '#f08c00', // orange
  '#ffd8a8', // peach
  // Add more as needed
];

function fixSvgColors(svgContent) {
  let fixed = svgContent;

  // Replace problematic colors
  for (const [oldColor, newColor] of Object.entries(COLOR_REPLACEMENTS)) {
    // Match fill and stroke attributes with these colors
    const fillRegex = new RegExp(`fill="${oldColor}"`, 'gi');
    const strokeRegex = new RegExp(`stroke="${oldColor}"`, 'gi');

    fixed = fixed.replace(fillRegex, `fill="${newColor}"`);
    fixed = fixed.replace(strokeRegex, `stroke="${newColor}"`);
  }

  return fixed;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node fix-excalidraw-svg-colors.js <input-svg> [output-svg]');
    console.error('');
    console.error('Example:');
    console.error('  node scripts/fix-excalidraw-svg-colors.js diagram.svg diagram-fixed.svg');
    process.exit(1);
  }

  const inputPath = resolve(args[0]);
  const outputPath = args[1] ? resolve(args[1]) : inputPath;

  console.log('Reading SVG:', inputPath);
  const svgContent = readFileSync(inputPath, 'utf-8');

  console.log('Fixing colors...');
  const fixed = fixSvgColors(svgContent);

  console.log('Writing fixed SVG:', outputPath);
  writeFileSync(outputPath, fixed, 'utf-8');

  console.log('✓ Done! SVG colors fixed for dark mode compatibility.');
  console.log('');
  console.log('Color replacements made:');
  for (const [oldColor, newColor] of Object.entries(COLOR_REPLACEMENTS)) {
    console.log(`  ${oldColor} → ${newColor}`);
  }
}

main();
