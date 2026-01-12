import { Layout } from "./Layout";
import { ArticleCard } from "./ArticleCard";
import { Breadcrumbs } from "./Breadcrumbs";
import { Article } from "../data/articles";
import { Translation } from "../locales/types";

interface ArticleIndexProps {
  articles: Article[];
  lang: string;
  dict: Translation;
  path: string;
  env?: string;
}

export const ArticleIndex = ({ articles, lang, dict, path, env }: ArticleIndexProps) => {
  const getLink = (p: string) => lang === 'ja' ? p : `/${lang}${p}`;
  const breadcrumbItems = [
    { label: dict.nav.home, path: getLink('/') },
    { label: dict.nav.columns, path: path }
  ];

  return (
    <Layout
      title="コラム一覧"
      description="年号マスターのコラム一覧です。西暦・和暦に関する豆知識やサイトの更新情報をお届けします。"
      lang={lang}
      dict={dict}
      path={path}
      env={env}
    >
      <div className="flex-1 w-full relative overflow-y-auto bg-slate-50">
        <div className="min-h-full flex flex-col items-center justify-start pt-8 pb-12 px-4">

          <div className="w-full max-w-3xl mb-8">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-2xl font-bold text-[#22215B] mb-2 text-center">コラム一覧</h1>
            <p className="text-center text-slate-500 text-sm">西暦・和暦に関する豆知識や更新情報</p>
          </div>

          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-12">
            <a href="/" className="text-sm font-bold text-slate-500 hover:text-[#22215B] flex items-center gap-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              ホームに戻る
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
};
