import { PRODUCTION_URL } from "../utils/url";

type BreadcrumbItem = {
    label: string;
    path: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => {
    // Helper to get origin - ideally should be from env/context but for now consistent with Layout.tsx
    // In a real scenario, this should be passed from the request context or env vars.
    const origin = PRODUCTION_URL;

    // Generate JSON-LD
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `${origin}${item.path}`
        }))
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <nav aria-label="Breadcrumb" class="mb-4">
                <ol class="flex items-center flex-wrap text-sm text-slate-500">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;
                        return (
                            <li class="flex items-center">
                                {index > 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-1 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                                {isLast ? (
                                    <span class="font-bold text-slate-700 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                                        {item.label}
                                    </span>
                                ) : (
                                    <a href={item.path} class="hover:text-[#22215B] hover:underline transition-colors">
                                        {item.label}
                                    </a>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
};
