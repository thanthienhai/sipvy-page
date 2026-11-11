const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), "g")
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), "g")

/**
 * Serialize JSON-LD for an inline <script type="application/ld+json">.
 * JSON.stringify does not escape `<`, so a value containing `</script>` would
 * break out of the tag. Replace `<` (and the JS line separators) with escapes.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029")
}
