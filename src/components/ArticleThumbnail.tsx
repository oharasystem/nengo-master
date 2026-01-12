import { FileText, Lightbulb, Hourglass, Calculator, Sparkles } from "./Icons";
import { ArticleCategory } from "../data/types";

interface ArticleThumbnailProps {
  category: ArticleCategory;
  thumbnailUrl?: string;
  className?: string;
}

const CategoryConfig: Record<ArticleCategory, { label: string; icon: any; bg: string; text: string }> = {
  resume: {
    label: "履歴書",
    icon: FileText,
    bg: "bg-blue-100",
    text: "text-blue-600"
  },
  knowledge: {
    label: "豆知識",
    icon: Lightbulb,
    bg: "bg-yellow-100",
    text: "text-yellow-600"
  },
  history: {
    label: "歴史",
    icon: Hourglass,
    bg: "bg-orange-100",
    text: "text-orange-600"
  },
  calc: {
    label: "計算",
    icon: Calculator,
    bg: "bg-purple-100",
    text: "text-purple-600"
  },
  other: {
    label: "その他",
    icon: Sparkles,
    bg: "bg-slate-100",
    text: "text-slate-600"
  }
};

export const ArticleThumbnail = ({ category, thumbnailUrl, className = "" }: ArticleThumbnailProps) => {
  const config = CategoryConfig[category] || CategoryConfig.other;
  const Icon = config.icon;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={config.label}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${config.bg}`}>
          <Icon className={`w-12 h-12 ${config.text} opacity-80`} />
        </div>
      )}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold bg-white/90 shadow-sm ${config.text}`}>
        {config.label}
      </div>
    </div>
  );
};
