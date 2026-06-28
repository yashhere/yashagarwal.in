import collapse from "@alpinejs/collapse"
import tooltip from "@ryangjchandler/alpine-tooltip"
import type { Alpine } from "alpinejs"

export default (Alpine: Alpine) => {
  Alpine.plugin(collapse)
  Alpine.plugin(tooltip)
}
