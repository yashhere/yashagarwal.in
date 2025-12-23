import type { Alpine } from "alpinejs"
import collapse from "@alpinejs/collapse"
import tooltip from "@ryangjchandler/alpine-tooltip"

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse)

  // Configure default tooltip options with Tippy.js defaults
  Alpine.plugin(tooltip, {
    theme: 'custom',
    placement: 'top',
    arrow: false,
    interactive: true, // Allow touch interaction on mobile
    touch: ['hold', 500], // Show on long press (500ms)
    hideOnClick: true,
    maxWidth: 'none', // We handle max-width in CSS
  })
}
