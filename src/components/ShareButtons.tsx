import { TwitterX, Line } from "./Icons";

type ShareButtonsProps = {
    title: string;
    text: string;
    url: string;
    idPrefix?: string;
    className?: string;
};

export const ShareButtons = ({ title, text, url, idPrefix = "", className = "" }: ShareButtonsProps) => {
    // Construct Share URLs
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    // X (Twitter): text + url
    const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

    // LINE: text + url (usually just text containing url)
    // Using standard line share link
    const lineUrl = `https://line.me/R/msg/text/?${encodedText}%20${encodedUrl}`;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <a
                id={`${idPrefix}share-x`}
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-black text-white hover:opacity-80 transition-opacity rounded-md px-3 py-2 text-xs font-bold gap-2 min-w-[100px]"
                aria-label="Share on X"
            >
                <TwitterX className="w-4 h-4" />
                <span>ポストする</span>
            </a>
            <a
                id={`${idPrefix}share-line`}
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#06C755] text-white hover:opacity-80 transition-opacity rounded-md px-3 py-2 text-xs font-bold gap-2 min-w-[100px]"
                aria-label="Share on LINE"
            >
                <Line className="w-4 h-4" />
                <span>LINEで送る</span>
            </a>
        </div>
    );
};
