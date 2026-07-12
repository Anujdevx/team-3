/**
 * Utility to parse a simple subset of Markdown (headers, bold, inline code) into HTML strings.
 */
export function parseMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  return markdown
    .replace(/### (.*)/g, "<h5 class='font-heading font-bold text-zinc-900 dark:text-white mt-4 mb-2'>$1</h5>")
    .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code class='bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs font-mono'>$1</code>");
}
