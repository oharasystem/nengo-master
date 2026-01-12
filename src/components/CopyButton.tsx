export const CopyButton = ({ text, className = "" }: { text: string; className?: string }) => {
  // Escape single quotes to prevent breaking the onclick handler
  const safeText = text.replace(/'/g, "\\'");

  return (
    <button
      type="button"
      class={`p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-[#22215B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#22215B] focus:ring-offset-1 ${className}`}
      onclick={`event.stopPropagation(); window.copyToClipboard('${safeText}', this)`}
      aria-label="Copy"
      title="Copy"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    </button>
  );
};
