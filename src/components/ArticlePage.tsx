import { Layout } from "./Layout";
import { Breadcrumbs } from "./Breadcrumbs";
import { ShareButtons } from "./ShareButtons";
import { Article } from "../data/articles";
import { Translation } from "../locales/types";
import { getBaseUrl } from "../utils/url";

interface ArticlePageProps {
  article: Article;
  lang: string;
  dict: Translation;
  path: string;
  env?: string;
}

export const ArticlePage = ({ article, lang, dict, path, env }: ArticlePageProps) => {
  const getLink = (p: string) => lang === 'ja' ? p : `/${lang}${p}`;
  const breadcrumbItems = [
    { label: dict.nav.home, path: getLink('/') },
    { label: dict.nav.columns, path: getLink('/articles') },
    { label: article.title, path: path }
  ];

  return (
    <Layout
      title={article.title}
      description={article.excerpt}
      lang={lang}
      dict={dict}
      path={path}
      env={env}
    >
      <div className="flex-1 w-full relative overflow-y-auto bg-slate-50">
        <div className="min-h-full flex flex-col items-center justify-start pt-8 pb-12 px-4">

          <div className="w-full max-w-3xl mb-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <article className="w-full max-w-3xl bg-white p-6 sm:p-10 rounded-xl border border-slate-100 shadow-sm mb-8">
            <header className="mb-8 border-b border-slate-100 pb-8">
                <div className="text-sm text-slate-400 font-bold mb-3">
                    {article.publishDate.replaceAll('-', '.')}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#22215B] leading-tight mb-4">
                    {article.title}
                </h1>
                <ShareButtons
                    title={article.title}
                    text={`${article.title} | 年号マスター`}
                    url={getBaseUrl(env, path)}
                />
            </header>

            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                {article.content}
            </div>
          </article>

          <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-center gap-6 text-sm font-bold text-slate-500">
             <a href="/articles" className="hover:text-[#22215B] flex items-center gap-2 transition-colors justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                コラム一覧に戻る
            </a>
            <a href="/" className="hover:text-[#22215B] flex items-center gap-2 transition-colors justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                トップページへ
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
};
