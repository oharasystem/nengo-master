import { Article } from "../data/articles";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="text-xs text-slate-400 font-bold mb-2">
        {article.publishDate.replaceAll('-', '.')}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-3 leading-snug">
        <a href={`/articles/${article.slug}`} className="hover:text-[#22215B] transition-colors">
          {article.title}
        </a>
      </h3>
      <p className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed line-clamp-3">
        {article.excerpt}
      </p>
      <div className="mt-auto pt-4 border-t border-slate-50">
        <a href={`/articles/${article.slug}`} className="text-sm font-bold text-[#22215B] hover:opacity-80 flex items-center gap-1">
          続きを読む
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};
