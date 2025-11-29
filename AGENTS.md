## TypeScript

1 - Only create an abstraction if it's actually needed
2 - Prefer clear function/variable names over inline comments
3 - Avoid helper functions when a simple inline expression would suffice
4 - Use `knip` to remove unused code if making large changes
5 - The `gh` CLI is installed, use it
6 - Don't use emojis

## React

9 - Avoid massive JSX blocks and compose smaller components
10 - Colocate code that changes together
11 - Avoid `useEffect` unless absolutely needed

## Tailwind

15 - Mostly use built-in values, occasionally allow dynamic values, rarely globals
16 - Always use v4 + global CSS file format + shadcn/ui

## Next

20 - Prefer fetching data in RSC (page can still be static)
21 - Use next/font + next/script when applicable
22 - next/image should have `sync` / `eager` / use `priority` sparingly
23 - Be mindful of serialized prop size for RSC -> child components

## TypeScript

27 - Don't unnecessarily add `try`/`catch`
28 - Don't cast to `any`
