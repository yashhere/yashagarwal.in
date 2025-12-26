/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "@ryangjchandler/alpine-tooltip" {
  import type { Alpine } from "alpinejs"
  export default function (Alpine: Alpine): void
}

declare module "@alpinejs/collapse" {
  import type { Alpine } from "alpinejs"
  export default function (Alpine: Alpine): void
}

interface Window {
  Alpine: import("alpinejs").Alpine
}
